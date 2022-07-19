const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

/**
 * @typedef Customer
 * @property cpf;
 * @property name;
 * @property id;
 * @property statements
 */

/**
 * @type Customer[]
 */
const customers = [];

function customerAlreadyExists(cpf) {
  return customers.some((customer) => customer.cpf === cpf);
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

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.params;

  const findedCustomer = customers.find((customer) => customer.cpf === cpf);

  if (!findedCustomer) {
    return res.status(400).json({
      error: "Customer not found",
    });
  }

  return res.status(200).json({
    statements: findedCustomer?.statement,
  });
});

app.listen(3333);
