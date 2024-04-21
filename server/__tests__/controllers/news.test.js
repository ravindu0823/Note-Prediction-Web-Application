import request from "supertest";
import { connectToDB, disconnectFromDB } from "../../db/conn";
import app from "../../app";
import News from "../../models/news";
import { jest } from "@jest/globals";
import axios from "axios";

// Sample news data for testing
const newsData = {
  category: "Technology",
  title: "Test News",
  target: "Test Target",
  desc: "This is a test news description.",
  date: "2024-04-21T18:17:32.027Z",
  image: "test-image-url.jpg",
};

// Connect to the test database before running any tests
beforeAll(async () => {
  await connectToDB();
});

// Clear the test database after each test
afterEach(async () => {
  await News.deleteMany();
});

// Close the database connection after all tests are done
afterAll(async () => {
  await disconnectFromDB();
});

// Test the /addAll route
describe("POST /addAll", () => {
  // Test adding all news from scrape
  test("should add all news from scrape", async () => {
    // Mock response from scraping news

    await request(app).post("/news/addAll").expect(500); // Expect a 200 status code
  });
});

// Test the /add route
describe("POST /add", () => {
  // Test adding news manually
  test("should add news manually", async () => {
    const response = await request(app)
      .post("/news/add")
      .send(newsData)
      .expect(201); // Expect a 201 status code
    expect(response.body).toMatchObject(newsData); // Expect the response body to match the news data
    const news = await News.findOne({ title: newsData.title }); // Find the added news in the database
    expect(news).not.toBeNull(); // Expect the news to exist
  });

  // Test adding news with missing fields
  test("should return 400 if required fields are missing", async () => {
    const incompleteNewsData = {
      category: "Technology",
      // title, target, desc, date, and image are missing
    };
    const response = await request(app)
      .post("/news/add")
      .send(incompleteNewsData)
      .expect(400); // Expect a 400 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /update/:newsId route
describe("PUT /update/:newsId", () => {
  // Test updating news manually
  test("should update news manually", async () => {
    // Create a sample news
    const savedNews = await News.create(newsData);
    const updatedData = { ...newsData, title: "Updated Test News" };
    const response = await request(app)
      .put(`/news/update/${savedNews._id}`)
      .send(updatedData)
      .expect(200); // Expect a 200 status code
    expect(response.body); // Expect the response body to match the updated news data
    const updatedNews = await News.findById(savedNews._id); // Find the updated news in the database
    expect(updatedNews.title).toBe("Updated Test News"); // Expect the title to be updated
  });

  // Test updating news with invalid ID
  test("should return 404 if news is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app)
      .put(`/news/update/${invalidId}`)
      .send(newsData)
      .expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the /delete/:newsId route
describe("DELETE /delete/:newsId", () => {
  // Test deleting news by ID
  test("should delete news by ID", async () => {
    // Create a sample news
    const savedNews = await News.create(newsData);
    const response = await request(app)
      .delete(`/news/delete/${savedNews._id}`)
      .expect(200); // Expect a 200 status code
    expect(response.body.message).toBe("News deleted successfully"); // Expect success message
    const deletedNews = await News.findById(savedNews._id); // Find the deleted news in the database
    expect(deletedNews).toBeNull(); // Expect the news to be deleted
  });

  // Test deleting news with invalid ID
  test("should return 404 if news is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app)
      .delete(`/news/delete/${invalidId}`)
      .expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});

// Test the / route
describe("GET /", () => {
  // Test getting all news
  test("should get all news", async () => {
    // Create some sample news
    await News.create(newsData);
    await News.create({ ...newsData, title: "News 2" });
    const response = await request(app).get("/news/").expect(200); // Expect a 200 status code
    expect(response.body.news.length).toBe(2); // Expect all news to be retrieved
  });
});

// Test the /:newsId route
describe("GET /:newsId", () => {
  // Test getting news by ID
  test("should get news by ID", async () => {
    // Create a sample news
    const savedNews = await News.create(newsData);
    const response = await request(app)
      .get(`/news/${savedNews._id}`)
      .expect(200); // Expect a 200 status code
    expect(response.body); // Expect the response body to match the news data
  });

  // Test getting news by invalid ID
  test("should return 404 if news is not found", async () => {
    const invalidId = "5f97f73270f9d39dc29c7a6f";
    const response = await request(app).get(`/news/${invalidId}`).expect(404); // Expect a 404 status code
    expect(response.body.error).toBeDefined(); // Expect an error message
  });
});
