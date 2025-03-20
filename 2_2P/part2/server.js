
/**
 * @fileoverview A simple Express server providing basic arithmetic operations.
 */

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on.
 * @callback
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/**
 * Adds two numbers provided as query parameters.
 * @name /add
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.num1 - The first number.
 * @param {string} req.query.num2 - The second number.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with the result of the addition.
 */
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    const result = num1 + num2;
    res.json({ operation: "addition", result });
});

/**
 * Subtracts the second number from the first number provided as query parameters.
 * @name /subtract
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.num1 - The first number.
 * @param {string} req.query.num2 - The second number.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with the result of the subtraction.
 */
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    const result = num1 - num2;
    res.json({ operation: "subtraction", result });
});

/**
 * Multiplies two numbers provided as query parameters.
 * @name /multiply
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.num1 - The first number.
 * @param {string} req.query.num2 - The second number.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with the result of the multiplication.
 */
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    const result = num1 * num2;
    res.json({ operation: "multiplication", result });
});

/**
 * Divides the first number by the second number provided as query parameters.
 * @name /divide
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.num1 - The first number.
 * @param {string} req.query.num2 - The second number.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with the result of the division.
 */
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }
    if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero' });
    }

    const result = num1 / num2;
    res.json({ operation: "division", result });
});

/**
 * Performs a specified arithmetic operation on two numbers provided in the request body.
 * @name /calculate
 * @function
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {number} req.body.num1 - The first number.
 * @param {number} req.body.num2 - The second number.
 * @param {string} req.body.operation - The operation to perform (add, subtract, multiply, divide).
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with the result of the specified operation.
 */
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 === 0) return res.status(400).json({ error: "Cannot divide by zero" });
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ operation, result });
});
