const chai = require("chai");
const expect = chai.expect;
const request = require("request");

describe("User Registration API", function () {
  const baseUrl = "http://localhost:3000";

  const testUser = {
    firstName: "John",
    lastName: "Doe",
    email: `john${Date.now()}@example.com`, 
    password: "secure123"
  };

  it("should register a user successfully with valid data", function (done) {
    const options = {
      url: `${baseUrl}/api/register`,
      method: 'POST',
      json: testUser
    };

    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(200); 
      expect(body).to.have.property("message");
      expect(body.message).to.include("success");
      done();
    });
  });

  it("should return error for missing fields", function (done) {
    const options = {
      url: `${baseUrl}/api/register`,
      method: 'POST',
      json: {
        email: "missing@fields.com"
      }
    };

    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(400);  
      expect(body).to.have.property("message");
      done();
    });
  });

  it("should return error for invalid email format", function (done) {
    const options = {
      url: `${baseUrl}/api/register`,
      method: 'POST',
      json: {
        firstName: "Test",
        lastName: "User",
        email: "invalid-email",
        password: "123456"
      }
    };

    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(400); 
      expect(body).to.have.property("message");
      done();
    });
  });

  it("should return 409 if email already exists", function (done) {
    const options = {
      url: `${baseUrl}/api/register`,
      method: 'POST',
      json: testUser  
    };

    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal(409);  
      expect(body).to.have.property("message").that.includes("exists");
      done();
    });
  });
});
