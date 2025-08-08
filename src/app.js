const express = require('express');
const {
  validateName,
  validateEmail,
  validatePhone,
} = require('./validators'); // Import validation functions

const app = express();
app.use(express.json());

let users = []; // In-memory database

//  POST - Add a new user
app.post('/user', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required (name, email, phone)" });
  }

  if (!validateName(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  const newUser = { id: users.length + 1, name, email, phone };
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

//  GET - Fetch all users
app.get('/users', (req, res) => {
  res.status(200).json({ message: "All users", users });
});

//  PUT - Fully update a user
app.put('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required for full update" });
  }

  if (!validateName(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  users[userIndex] = { id, name, email, phone };
  res.json({ message: "User fully updated", user: users[userIndex] });
});

//  PATCH - Partially update a user
app.patch('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, phone } = req.body;

  if (name && !validateName(name)) {
    return res.status(400).json({ error: "Invalid name format" });
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (phone && !validatePhone(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  res.json({ message: "User partially updated", user });
});

// DELETE - Delete a user
app.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
});

// Server start
app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
