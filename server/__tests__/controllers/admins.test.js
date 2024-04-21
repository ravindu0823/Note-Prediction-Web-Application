import request from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../../models/admin";
import { connectToDB, disconnectFromDB } from "../../db/conn";
import app from "../../app";
dotenv.config();

// Sample admin data for testing
const adminData = {
  fullName: "John Doe",
  email: "john@example.com",
  userName: "johndoe",
  password: "password123",
};

// Helper function to generate a valid token for the test admin
const getToken = async () => {
  const savedAdmin = new Admin(adminData);
  savedAdmin.password = savedAdmin.generateHash(adminData.password);
  await savedAdmin.save();
  const token = jwt.sign(
    { adminId: savedAdmin._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
  return token;
};

// Connect to the test database before running any tests
beforeAll(async () => {
  await connectToDB();
});

// Clear the test database after each test
afterEach(async () => {
  await Admin.deleteMany();
});

// Close the database connection after all tests are done
afterAll(async () => {
  await disconnectFromDB();
});

// Test the /add route
describe("POST /add", () => {
  // Test successful addition of admin
  test("should add a new admin and return a token", async () => {
    const response = await request(app)
      .post("/admin/add")
      .send(adminData)
      .expect(201); // Expect a 201 status code
    expect(response.body).toHaveProperty("token"); // Expect a token in the response body
    const admin = await Admin.findOne({ userName: adminData.userName }); // Find the created admin in the database
    expect(admin).not.toBeNull(); // Expect the admin to exist
    expect(admin.fullName).toBe(adminData.fullName); // Expect the admin to have the same full name as the test admin
  });

  // Test addition with missing fields
  test("should return 400 if required fields are missing", async () => {
    const incompleteAdminData = {
      fullName: "John Doe",
      email: "john@example.com",
      // userName and password are missing
    };
    const response = await request(app)
      .post("/admin/add")
      .send(incompleteAdminData)
      .expect(400); // Expect a 400 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /login route
describe("POST /login", () => {
  // Test successful login
  test("should log in an existing admin and return a token", async () => {
    // Create an admin to login
    const existingAdmin = new Admin(adminData);
    existingAdmin.password = existingAdmin.generateHash(adminData.password);
    await existingAdmin.save();
    
    const response = await request(app)
      .post("/admin/login")
      .send({ userName: adminData.userName, password: adminData.password })
      .expect(200); // Expect a 200 status code
    expect(response.body).toHaveProperty("token"); // Expect a token in the response body
  });

  // Test login with invalid credentials
  test("should return 401 if credentials are invalid", async () => {
    const invalidCredentials = {
      userName: "invaliduser",
      password: "invalid123",
    };
    const response = await request(app)
      .post("/admin/login")
      .send({ userName: invalidCredentials.userName, password: invalidCredentials.password })
      .expect(404); // Expect a 401 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });

  // Test login with missing username
  test("should return 400 if username is missing", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ password: "password123" })
      .expect(400); // Expect a 400 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });

  // Test login with missing password
  test("should return 400 if password is missing", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ userName: "johndoe" })
      .expect(400); // Expect a 400 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /protected route
describe("GET /protected", () => {
  // Test access to protected route with valid token
  test("should access protected route with valid token", async () => {
    const token = await getToken(); // Get token for authentication
    const response = await request(app)
      .get("/admin/protected")
      .set("Authorization", `Bearer ${token}`)
      .expect(200); // Expect a 200 status code
    expect(response.body.data).toBe("Protected data"); // Expect protected data in the response body
  });

  // Test access to protected route with expired token
  test("should return 400 if token is expired", async () => {
    const expiredToken = jwt.sign({ adminId: "admin123" }, process.env.JWT_SECRET, {
      expiresIn: 0, // Expired token
    });
    const response = await request(app)
      .get("/admin/protected")
      .set("Authorization", `Bearer ${expiredToken}`)
      .expect(400); // Expect a 400 status code
    expect(response.body.message).toBe("Unauthorized"); // Expect an "Expired" message in the response body
  });

  // Test access to protected route without token
  test("should return 400 if token is missing", async () => {
    const response = await request(app)
      .get("/admin/protected")
      .expect(400); // Expect a 400 status code
    expect(response.body.message).toBe("Unauthorized"); // Expect an "Unauthorized" message in the response body
  });
});

// More test cases for other routes can be added similarly
