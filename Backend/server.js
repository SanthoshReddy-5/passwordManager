const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // Import UUID

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "Your MySQL Username", // Replace with your MySQL username
  password: "Your MySQL Password", // Replace with your MySQL password
  database: "Your Database Name", // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Get all passwords
app.get("/passwords", (req, res) => {
  const sql = "SELECT * FROM passwords";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Add a password
app.post("/passwords", (req, res) => {
  const { website, username, password } = req.body;
  const id = uuidv4(); // Generate a unique ID
  const sql = "INSERT INTO passwords (id, website, username, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [id, website, username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Password added successfully!", id });
  });
});

// Update a password
app.put("/passwords/:id", (req, res) => {
  const { website, username, password } = req.body;
  const { id } = req.params;
  const sql = "UPDATE passwords SET website = ?, username = ?, password = ? WHERE id = ?";
  db.query(sql, [website, username, password, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Password updated successfully!" });
  });
});

// Delete a password
app.delete("/passwords/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM passwords WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Password deleted successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
