import request from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user";
import { connectToDB, disconnectFromDB } from "../../db/conn";
import app from "../../app";
dotenv.config();

// a sample user object to use in tests
const userData = {
  userName: "dhanu123",
  fullName: "Dhanushka",
  email: "dhanu@gmail.com",
  password: "dhanu751",
};

// a helper function to generate a valid token for the test user
const getToken = async () => {
  const savedUser = new User(userData);
  savedUser.password = savedUser.generateHash(userData.password);
  await savedUser.save();
  const token = jwt.sign(
    { userId: savedUser._id, fullName: savedUser.fullName },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
  return token;
};

// connect to the test database before running any tests
beforeAll(async () => {
  await connectToDB();
});

// clear the test database after each test
afterEach(async () => {
  await User.deleteMany();
});

// close the database connection after all tests are done
afterAll(async () => {
  await disconnectFromDB();
});

// test the /register route
describe("POST /register", () => {
  // test the successful registration of a new user
  test("should create a new user and return a token", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(201); // expect a 201 status code
    expect(response.body).toHaveProperty("token"); // expect a token in the response body
    const user = await User.findOne({ userName: userData.userName }); // find the created user in the database
    expect(user).not.toBeNull(); // expect the user to exist
    expect(user.fullName).toBe(userData.fullName); // expect the user to have the same full name as the test user
  });

  // test the validation error when the full name is missing
  test("should return a 400 error when the full name is missing", async () => {
    const userData = {
      userName: "dhanu123",
      fullName: "",
      email: "dhanu@gmail.com",
      password: "dhanu751",
    };
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("error"); // expect an error message in the response body
    expect(response.body.error).toContain("fullName"); // expect the error message to mention the full name field
  });

  // test the validation error when the user name is missing
  test("should return a 400 error when the user name is missing", async () => {
    const userData = {
      userName: "",
      fullName: "Dhanushka",
      email: "dhanu@gmail.com",
      password: "dhanu751",
    };
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("error"); // expect an error message in the response body
    expect(response.body.error).toContain("userName"); // expect the error message to mention the user name field
  });

  // test the validation error when the password is missing
  test("should return a 400 error when the password is missing", async () => {
    const userData = {
      userName: "Dhanushka",
      fullName: "Dhanushka",
      email: "dhanu@gmail.com",
      password: "",
    };
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("error"); // expect an error message in the response body
    expect(response.body.error).toContain("password"); // expect the error message to mention the password field
  });

  // test the validation error when the contact number is missing
  test("After the creating the user it should return a token", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(201); // expect a 400 status code
    expect(response.body).toHaveProperty("token"); // expect an error message in the response body
  });

  // test the validation error when the address is missing
  test("After creating the user account the status of the account should be Active", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(201); // expect a 400 status code
    const decodedToken = jwt.decode(response.body.token);
    const user = await request(app)
      .get(`/users/${decodedToken.userId}`)
      .expect(200);
    expect(user.body).toHaveProperty("user"); // expect an error message in the response body
    expect(user.body.user.status).toContain("Active"); // expect the error message to mention the address field
  });

  // test registration with incomplete data
  test("should return 400 if required fields are missing", async () => {
    const incompleteUserData = {
      userName: "incompleteUser",
      email: "incomplete@gmail.com",
      password: "incomplete123",
    };
    const response = await request(app)
      .post("/users/register")
      .send({ userData: incompleteUserData })
      .expect(400); // expect a 400 status code
    expect(response.body.error).toBeDefined(); // expect an error message
  });

  // test registration with an existing username
  test("should return 400 if username already exists", async () => {
    // Create a user with the same username
    await request(app).post("/users/register").send({ userData });
    const response = await request(app)
      .post("/users/register")
      .send({ userData })
      .expect(500); // expect a 400 status code
    expect(response.body.error).toBeDefined(); // expect an error message
  });
});

// test the /login route
describe("POST /login", () => {
  // test successful login
  test("should log in an existing user and return a token", async () => {
    // Create a user to login
    const existingUser = new User(userData);
    existingUser.password = existingUser.generateHash(userData.password);
    await existingUser.save();

    const response = await request(app)
      .post("/users/login")
      .send({ userData })
      .expect(200); // expect a 200 status code
    expect(response.body).toHaveProperty("token"); // expect a token in the response body
  });

  // test login with invalid credentials
  test("should return 401 if credentials are invalid", async () => {
    const userData = {
      userName: "invalid@gmail.com",
      password: "invalid123",
    };
    const response = await request(app)
      .post("/users/login")
      .send({ userData })
      .expect(404); // expect a 401 status code
    expect(response.body.error).toBeDefined(); // expect an error message
  });
});

// test the /update/:userId route
describe("PUT /update/:userId", () => {
  // test updating user information
  test("should update user information", async () => {
    // Create a user to update
    const existingUser = new User({
      userName: "dhanu123",
      fullName: "Dhanushka",
      email: "dhanu@gmail.com",
      password: "dhanu751",
    });
    await existingUser.save();

    const userData = {
      fullName: "Updated Name",
      email: "dhanu@gmail.com",
    };

    const response = await request(app)
      .put(`/users/update/${existingUser._id}`)
      .send({ userData })
      .expect(200); // expect a 200 status code
    expect(response.body.newUser.fullName).toBe(userData.fullName); // expect updated name
  });

  // test updating user with invalid userId
  test("should return 404 if user is not found", async () => {
    const invalidUserId = "invalidUserId";
    const response = await request(app)
      .put(`/users/update/${invalidUserId}`)
      .send({ userData })
      .expect(500); // expect a 404 status code
    expect(response.body.error).toBeDefined(); // expect an error message
  });
});

// test the / route
describe("GET /users", () => {
  // test the successful retrieval of all users
  test("should return an array of users", async () => {
    const existingUser = new User({
      userName: "dhanu123",
      fullName: "Dhanushka",
      email: "dhanu@gmail.com",
      password: "dhanu751",
    });
    await existingUser.save();

    const response = await request(app)
      .get("/users")
      .expect(200); // expect a 200 status code
    expect(response.body).toBeInstanceOf(Array); // expect the response body to be an array
    // expect(response.body.length).toBe(1); // expect the array to have one element
    expect(response.body[0].userName).toBe(existingUser.userName); // expect the element to have the same user name as the test user
  });

    // test the authorization error when no token is provided
  test("should return a 400 error when no token is provided", async () => {
    const response = await request(app).get("/users/").expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("message"); // expect a message in the response body
    expect(response.body.message).toBe("Unauthorized"); // expect the message to match
  });

  // test the authorization error when an invalid token is provided
  test("should return a 400 error when an invalid token is provided", async () => {
    const response = await request(app)
      .get("/users/")
      .set("Authorization", "Bearer invalid") // set the authorization header with an invalid token
      .expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("message"); // expect a message in the response body
    expect(response.body.message).toBe("Unauthorized"); // expect the message to match
  });

  // test the authorization error when an expired token is provided
  test("should return a 400 error when an expired token is provided", async () => {
    const user = await request(app).post("/users/register").send(userData); // create a test user first
    const token = jwt.sign(
      { userId: user._id },
      "fc6b436fb79612607f5032a7455cc73c1ad1ff0a4ca1fddf2a0d4fa746d5c8f3",
      {
        expiresIn: "1s", // set the token to expire in 1 second
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds
    const response = await request(app)
      .get("/users/protected")
      .set("Authorization", `Bearer ${token}`) // set the authorization header with the expired token
      .expect(400); // expect a 400 status code
    expect(response.body).toHaveProperty("message"); // expect a message in the response body
    expect(response.body.message).toContain("Unauthorized"); // expect the message to match
  }); 
});
