const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isValidNumber = (num) => {
    return typeof num === 'number' && !isNaN(num);
};

const isWithinRange = (num) => {
    return num >= -1000000 && num <= 1000000;
};

app.get("/", async (req, res) => {
    res.send("Hello world!")
})

app.post("/:operation", async (req, res) => {
    const operation = req.params.operation;
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({
            "status": "error",
            "message": "Invalid data types",
            "result": null
        });
    }

    if (!isWithinRange(num1) || !isWithinRange(num2)) {
        return res.status(400).json({
            "status": "error",
            "message": "Overflow or Underflow",
            "result": null
        });
    }

    let result;
    let message;
    switch (operation) {
        case "add":
            result = num1 + num2;
            message = "The sum of the given two numbers";
            break;
        case "sub":
            result = num1 - num2;
            message = "The difference of the given two numbers";
            break;
        case "multiply":
            result = num1 * num2;
            message = "The product of the given two numbers";
            break;
        case "divide":
            if (num2 === 0) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Cannot divide by zero",
                    "result": null
                });
            }
            result = num1 / num2;
            message = "The division of the given two numbers";
            break;
        default:
            return res.status(400).json({
                "status": "error",
                "message": "Invalid operation",
                "result": null
            });
    }

    if (!isWithinRange(result)) {
        return res.status(400).json({
            "status": "error",
            "message": "Overflow or Underflow",
            "result": null
        });
    }

    return res.status(200).json({
        "status": "success",
        "message": message,
        "result": result
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
