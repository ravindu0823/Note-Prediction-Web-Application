import request from "supertest";
import { connectToDB, disconnectFromDB } from "../../db/conn";
import app from "../../app";
import Feedback from "../../models/feedback";

// Sample feedback data for testing
const feedbackData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phoneNumber: "1234567890",
  feedback: "This is a test feedback.",
};

// Connect to the test database before running any tests
beforeAll(async () => {
  await connectToDB();
});

// Clear the test database after each test
afterEach(async () => {
  await Feedback.deleteMany();
});

// Close the database connection after all tests are done
afterAll(async () => {
  await disconnectFromDB();
});

// Test the /add route
describe("POST /add", () => {
  // Test successful addition of feedback
  test("should add a new feedback", async () => {
    const response = await request(app)
      .post("/feedback/add")
      .send(feedbackData)
      .expect(201); // Expect a 201 status code
    expect(response.body).toMatchObject(feedbackData); // Expect the response body to match the feedback data
    const feedback = await Feedback.findOne({ email: feedbackData.email }); // Find the created feedback in the database
    expect(feedback).not.toBeNull(); // Expect the feedback to exist
  });

  // Test addition with missing fields
  test("should return 400 if required fields are missing", async () => {
    const incompleteFeedbackData = {
      firstName: "John",
      // lastName, email, phoneNumber, and feedback are missing
    };
    const response = await request(app)
      .post("/feedback/add")
      .send(incompleteFeedbackData)
      .expect(400); // Expect a 400 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /all route
describe("GET /all", () => {
  // Test getting all feedbacks
  test("should get all feedbacks", async () => {
    // Create some sample feedbacks
    await Feedback.create(feedbackData);
    await Feedback.create({ ...feedbackData, email: "jane@example.com" });
    const response = await request(app)
      .get("/feedback/all")
      .expect(200); // Expect a 200 status code
    expect(response.body.length).toBe(2); // Expect to get all feedbacks
  });

  // Test getting all feedbacks when no feedbacks exist
  test("should return 200 if no feedbacks exist", async () => {
    await Feedback.deleteMany(); // Delete all feedbacks
    const response = await request(app)
      .get("/feedback/all")
      .expect(200); // Expect a 404 status code
  });
});

// Test the /:id route
describe("GET /:id", () => {
  // Test getting a feedback by ID
  test("should get a feedback by ID", async () => {
    // Create a sample feedback
    const savedFeedback = await Feedback.create(feedbackData);
    const response = await request(app)
      .get(`/feedback/${savedFeedback._id}`)
      .expect(200); // Expect a 200 status code
    expect(response.body).toMatchObject(feedbackData); // Expect the response body to match the feedback data
  });

  // Test getting a feedback by invalid ID
  test("should return 404 if feedback is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app)
      .get(`/feedback/${invalidId}`)
      .expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /suspend/:id route
describe("PUT /suspend/:id", () => {
  // Test suspending a feedback by ID
  test("should suspend a feedback by ID", async () => {
    // Create a sample feedback
    const savedFeedback = await Feedback.create(feedbackData);
    const response = await request(app)
      .put(`/feedback/suspend/${savedFeedback._id}`)
      .expect(200); // Expect a 200 status code
    expect(response.body.status).toBe("Suspended"); // Expect the feedback status to be "Suspended"
  });

  // Test suspending a feedback by invalid ID
  test("should return 404 if feedback is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app)
      .put(`/feedback/suspend/${invalidId}`)
      .expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /activate/:id route
describe("PUT /activate/:id", () => {
  // Test activating a feedback by ID
  test("should activate a feedback by ID", async () => {
    // Create a sample feedback
    const savedFeedback = await Feedback.create(feedbackData);
    // Suspend the feedback first to test activation
    await Feedback.findByIdAndUpdate(savedFeedback._id, { status: "Suspended" });
    const response = await request(app)
      .put(`/feedback/activate/${savedFeedback._id}`)
      .expect(200); // Expect a 200 status code
    expect(response.body.status).toBe("Active"); // Expect the feedback status to be "Active"
  });

  // Test activating a feedback by invalid ID
  test("should return 404 if feedback is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app)
      .put(`/feedback/activate/${invalidId}`)
      .expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// More test cases for other routes can be added similarly
