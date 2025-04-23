const chai = require("chai");
const expect = chai.expect;
const request = require("request");

describe("Basic API Endpoints", function () {
  const baseUrl = "http://localhost:3000";

  it("should return the home page", function (done) {
    request.get(`${baseUrl}/`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should return MongoDB connection test message", function (done) {
    request.get(`${baseUrl}/testCon`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal("MongoDB is connected!");
      done();
    });
  });
});
