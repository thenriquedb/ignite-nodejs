const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

/**
 * cpf: string;
 * name: string;
 * id: uuid;
 * statement: [];
 */
app.post("/accounts", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidV4();

  const customer = {
    cpf,
    name,
    id,
    statement: [],
  };

  customers.push(customer);

  return res.status(201).send();
});

app.listen(3333);
