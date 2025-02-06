// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.json()); // Middleware to parse JSON request body
app.use(express.static('static')); // Serve static files

// Sample student data
const students = [
  { name: 'Alice Johnson', total: 433 },
  { name: 'Bob Smith', total: 410 },
  { name: 'Charlie Brown', total: 389 },
  { name: 'David Lee', total: 370 },
  { name: 'Eva Green', total: 450 }
];

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// ✅ API: Retrieve Students Above Threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Threshold must be a number' });
  }

  // Filter students meeting the threshold criteria
  const filteredStudents = students.filter(student => student.total > threshold);

  res.json({
    count: filteredStudents.length,
    students: filteredStudents
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
