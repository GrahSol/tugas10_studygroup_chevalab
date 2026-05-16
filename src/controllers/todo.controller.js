let todos = [
  {
    id: 1,
    title: "Belajar Express",
    done: false
  },
  {
    id: 2,
    title: "Pisah routes & controller",
    done: false
  }
];

let nextId = 3;

// get all
function getAll(req, res) {
  res.json(todos);
}

// gwt one
function getOne(req, res) {
  const id = Number(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
}

// create
function create(req, res) {
  const { title, done } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "title is required (string)"
    });
  }

  const newTodo = {
    id: nextId++,
    title,
    done: typeof done === "boolean" ? done : false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
}

// update
function update(req, res) {
  const id = Number(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({
        error: "title must be a string"
      });
    }

    todo.title = title;
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "done must be a boolean"
      });
    }

    todo.done = done;
  }

  res.json(todo);
}

// delete
function remove(req, res) {
  const id = Number(req.params.id);

  const before = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === before) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json({
    message: "deleted success"
  });
}
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};