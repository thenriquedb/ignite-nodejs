const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

function customerAlreadyExists(cpf) {
  return customers.some((customer) => customer.cpf === cpf);
}

/**
 * cpf: string;
 * name: string;
 * id: uuid;
 * statement: [];
 */
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

app.listen(3333);
