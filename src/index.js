const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

/**
 * @typedef Customer
 * @property {string} cpf;
 * @property {string} name;
 * @property {uuid} id;
 * @property {[]}statements
 */

/**
 * @type Customer[]
 */
const customers = [];

function customerAlreadyExists(cpf) {
  return customers.some((customer) => customer.cpf === cpf);
}

/* Middlewares */
function verifyIfAccountExists(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);
  req.customer = customer;

  if (customer) return next();

  return res.status(400).json({
    error: "Customer not found",
  });
}

app.post("/accounts", (req, res) => {
  const { cpf, name } = req.body;

  if (customerAlreadyExists(cpf)) {
    return res.status(409).json({
      error: "Customer already exists",
    });
  }

  const newCustomer = {
    cpf,
    name,
    id: uuidV4(),
    statement: [],
  };

  customers.push(newCustomer);
  return res.status(201).send();
});

app.use(verifyIfAccountExists);

app.get("/statement", (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    statements: customer?.statement,
  });
});

app.post("/deposit", (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.listen(3333);
