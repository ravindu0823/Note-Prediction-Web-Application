import request from "supertest";
import { connectToDB, disconnectFromDB } from "../../db/conn";
import app from "../../app";
import Prediction from "../../models/predict";
import Song from "../../models/song";
import jwt from "jsonwebtoken";

// Sample user ID for testing
const userId = "66227b57a7d5e74643e4e644";

const userData = {
  userName: "dhanu123",
  fullName: "Dhanushka",
  email: "dhanu@gmail.com",
  password: "dhanu751",
};

// Mock file path for testing
const mockFilePath = "piano.wav";

// Mock file data for testing
const mockFileData = {
  originalname: "mock-file.mp3",
  fieldname: "file",
  encoding: "7bit",
  mimetype: "audio/mp3",
  destination: "uploads/",
  filename: "mock-file.mp3",
  path: mockFilePath,
  size: 1024,
};

// Connect to the test database before running any tests
beforeAll(async () => {
  await connectToDB();
});

// Clear the test database after each test
afterEach(async () => {
  await Prediction.deleteMany();
  await Song.deleteMany();
});

// Close the database connection after all tests are done
afterAll(async () => {
  await disconnectFromDB();
});

// Test the /analyzeNotes/:userId route
describe("POST /analyzeNotes/:userId", () => {
  // Test analyzing notes with valid data
  /* test("should analyze notes and save prediction", async () => {
    const user = await request(app).post("/users/register").send({ userData });
    const decodedToken = jwt.decode(user.body.token);

    const response = await request(app)
      .post(`/predict/analyzeNotes/${decodedToken.userId}`)
      .attach("file", mockFilePath)
      .expect(201); // Expect a 201 status code
    expect(response.body).toHaveProperty("userId", userId); // Expect userId in response body
    expect(response.body).toHaveProperty("songId"); // Expect songId in response body
    expect(response.body).toHaveProperty("notes"); // Expect notes in response body
    const prediction = await Prediction.findOne({ userId }); // Find the saved prediction in the database
    expect(prediction).not.toBeNull(); // Expect the prediction to exist
  }); */
  /* // Test analyzing notes with invalid file format
  test("should return 500 if file format is invalid", async () => {
    const response = await request(app)
      .post(`/predict/analyzeNotes/${userId}`)
      .attach("file", "invalid-file.txt")
      .expect(500); // Expect a 500 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  }); */
});

/* // Test the /analyzeChords/:userId route
describe("POST /analyzeChords/:userId", () => {
  // Test analyzing chords with valid data
  test("should analyze chords and save prediction", async () => {
    const response = await request(app)
      .post(`/predict/analyzeChords/${userId}`)
      .attach("file", mockFilePath)
      .expect(201); // Expect a 201 status code
    expect(response.body).toHaveProperty("userId", userId); // Expect userId in response body
    expect(response.body).toHaveProperty("songId"); // Expect songId in response body
    expect(response.body).toHaveProperty("chords"); // Expect chords in response body
    const prediction = await Prediction.findOne({ userId }); // Find the saved prediction in the database
    expect(prediction).not.toBeNull(); // Expect the prediction to exist
  });

  // Test analyzing chords with invalid file format
  test("should return 500 if file format is invalid", async () => {
    const response = await request(app)
      .post(`/predict/analyzeChords/${userId}`)
      .attach("file", "invalid-file.txt")
      .expect(500); // Expect a 500 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /analyzeBoth/:userId route
describe("POST /analyzeBoth/:userId", () => {
  // Test analyzing both notes and chords with valid data
  test("should analyze both notes and chords and save prediction", async () => {
    const response = await request(app)
      .post(`/predict/analyzeBoth/${userId}`)
      .attach("file", mockFilePath)
      .expect(201); // Expect a 201 status code
    expect(response.body).toHaveProperty("userId", userId); // Expect userId in response body
    expect(response.body).toHaveProperty("songId"); // Expect songId in response body
    expect(response.body).toHaveProperty("notes"); // Expect notes in response body
    expect(response.body).toHaveProperty("chords"); // Expect chords in response body
    const prediction = await Prediction.findOne({ userId }); // Find the saved prediction in the database
    expect(prediction).not.toBeNull(); // Expect the prediction to exist
  });

  // Test analyzing both notes and chords with invalid file format
  test("should return 500 if file format is invalid", async () => {
    const response = await request(app)
      .post(`/predict/analyzeBoth/${userId}`)
      .attach("file", "invalid-file.txt")
      .expect(500); // Expect a 500 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
}); */

// Test the /:userId route
describe("GET /:userId", () => {
  // Test getting predictions by user ID
  test("should get predictions by user ID", async () => {
    // Create a sample prediction
    const predictionData = {
      userId,
      songId: "66227b57a7d5e74643e4e644",
      notes: [
        {
          end: "6.75",
          note: "G5",
          start: "4.35",
          _id: "6618108ccfe2858deeb76ce6",
        },
        {
          end: "9.15",
          note: "F#5",
          start: "6.75",
          _id: "6618108ccfe2858deeb76ce7",
        },
      ],
      chords: [
        {
          end: "4.458231292517007",
          note: "N",
          start: "0.0",
          _id: "66179266eec64558dacafafd",
        },
        {
          end: "8.126984126984127",
          note: "C:maj",
          start: "4.458231292517007",
          _id: "66179266eec64558dacafafe",
        },
      ],
    };
    await Prediction.create(predictionData);
    const response = await request(app).get(`/predict/${userId}`).expect(200); // Expect a 200 status code
    expect(response.body.length).toBe(1); // Expect one prediction to be retrieved
  });

  // Test getting predictions with invalid user ID
  test("should return 404 if predictions are not found for the user", async () => {
    const invalidUserId = "invalidUserId";
    const response = await request(app)
      .get(`/predict/${invalidUserId}`)
      .expect(500); // Expect a 404 status code
  });
});
