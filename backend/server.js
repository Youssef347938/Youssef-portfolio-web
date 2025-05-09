const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 4000;
const PROJECTS_FILE = './projects.json';

app.use(cors());
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get all projects
app.get('/projects', (req, res) => {
  const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

// Add a new project
app.post('/projects', authenticateToken, (req, res) => {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  const newProject = { ...req.body, id: Date.now().toString() };
  projects.push(newProject);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  res.json(newProject);
});

// Edit a project
app.put('/projects/:id', authenticateToken, (req, res) => {
  let projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  projects = projects.map(p => p.id === req.params.id ? { ...p, ...req.body } : p);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  res.json({ success: true });
});

// Delete a project
app.delete('/projects/:id', authenticateToken, (req, res) => {
  let projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  projects = projects.filter(p => p.id !== req.params.id);
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});