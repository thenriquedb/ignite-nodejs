const express = require("express");
const cors = require("cors");
const { v4: uuidv4, validate } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const findedUser = users.find((user) => user.username === username);

  if (!findedUser) {
    return response.status(404).json({
      error: "User not found",
    });
  }

  request.user = findedUser;

  next();
}

function checksTodoExists(request, response, next) {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({
      error: "Todo not found",
    });
  }

  request.todo = todo;

  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  const usernameAlreadyExists = users.some((u) => u.username === username);

  if (usernameAlreadyExists) {
    return response.status(400).json({
      error: "Username already exists",
    });
  }

  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    title,
    deadline,
    done: false,
    id: uuidv4(),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put(
  "/todos/:id",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { title, deadline } = request.body;
    const { todo } = request;

    todo.title = title;
    todo.deadline = deadline;

    return response.json(todo);
  }
);

app.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { todo } = request;
    todo.done = true;

    return response.json(todo);
  }
);

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  checksTodoExists,
  (request, response) => {
    const { user, todo } = request;

    user.todos.splice(todo, 1);

    return response.status(204).send();
  }
);

module.exports = app;
