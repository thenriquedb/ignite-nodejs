const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

/**
 * @typedef Statement
 * @property {string} description
 * @property {number} amount
 * @property {string} created_at
 * @property {"credit" | "debit"} type
 *
 * @typedef Customer
 * @property {string} cpf;
 * @property {string} name;
 * @property {uuid} id;
 * @property {Statement[]}statement
 */

/**
 * @type Customer[]
 */
const customers = [];

function customerAlreadyExists(cpf) {
  return customers.some((customer) => customer.cpf === cpf);
}

/**
 * Calculate customer balance
 * @param {Statement[]} statement
 */
function getBalance(statement) {
  return statement.reduce((acc, operation) => acc + operation.amount, 0);
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

app.post("/account", (req, res) => {
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

app.put("/account", (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
});

app.get("/account", (req, res) => {
  const { customer } = req;
  return res.status(201).json({ customer });
});

app.delete("/account", (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(204).send();
});

app.get("/statement", (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    statement: customer?.statement,
  });
});

app.get("/statement/date", (req, res) => {
  const { date } = req.query;
  const { customer } = req;

  const dateFormat = new Date(`${date} 00:00`);

  const statement = customer.statement.filter(
    (operation) =>
      operation.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return res.status(200).json({
    statement,
  });
});

app.post("/deposit", (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    amount,
    created_at: new Date(),
    description,
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.post("/withdraw", (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({
      error: "Insufficient funds",
    });
  }

  const statementOperation = {
    amount: -amount,
    created_at: new Date(),
    description: "withdraw",
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send();
});

app.listen(3333);
