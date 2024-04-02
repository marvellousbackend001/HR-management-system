const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "CHIDERA001?.1",
  database: "management_system",
  port: "3306",
});
//craeting an endpoint for adding a new employee
app.post('/employees', bodyParser.json(), function (req, res) {
  const { first_name, last_name, email, hire_date } = req.body;
  const query = 'INSERT INTO employees (first_name, last_name, email, hire_date) VALUES (?, ?, ?, ?)';
  con.query(query, [first_name, last_name, email, hire_date], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//creating an endpoint to create a job posting
app.post("/job_postings", bodyParser.json(), function (req, res) {
  const { title, description, location } = req.body;
  const query = `INSERT INTO job_postings (title, description, location) VALUES (?, ?, ?)`;
  con.query(query, [title, description, location], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//creating an endpoint to update a job posting 
app.put("/job-postings/:id", bodyParser.json(), function (req, res) {
  const id = req.params.id;
  const { title, description, location, status } = req.body;
  const sql = `UPDATE job_postings SET title = ?, description = ?, location = ?, status = ? WHERE id = ?`;
  con.query(sql, [title, description, location, status, id], function (err, result) {
    if (err) throw err
    res.send(result);
  });
})
//creating an endpoint for deleting jobs posted by ID
app.delete("/job_postings/:id", bodyParser.json(), function (req, res) {
  const id = req.params.id;
  const sql = `DELETE from job_postings WHERE id = ?`;
  con.query(sql, [id], function (err, result) {
    if (err) throw err
    res.send(result);
  });
})
// creating an endpoint for Creating a New Applicant
app.post("/applicants", bodyParser.json(), function (req, res) {
  const { first_name, last_name, email, phone, resume } = req.body;
  const sql = `INSERT INTO applicants (first_name, last_name, email, phone, resume) VALUES (?,?,?,?,?)`;
  con.query(sql, [first_name, last_name, email, phone, resume], function (err, result) {
    if (err) throw err
    res.send(result);
  });
})
// Create a new application
app.post("/applications", bodyParser.json(), function (req, res) {
  const { applicant_id, job_posting_id, application_date, status } = req.body;
  const sql = `INSERT INTO applications (applicant_id, job_posting_id, application_date, status) VALUES (?, ?, ?, ?)`;
  con.query(sql, [applicant_id, job_posting_id, application_date, status], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})
// creating an endpoint for schelduling interviews
app.post('/interviews', bodyParser.json(), function (req, res) {
  const { application_id, date, time } = req.body;
  const query = 'INSERT INTO interviews (application_id, date, time) VALUES (?, ?, ?)';
  con.query(query, [application_id, date, time], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
//creating an endpoint for tracking candidate status
app.get("/applications/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM applications WHERE id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})
// creating an endpoint for managing onboarding documents
app.post('/onboarding_documents', bodyParser.json(), function (req, res) {
  const { employee_id, documentName, documentUrl } = req.body;
  const query = `INSERT INTO onboarding_documents (employee_id, document_name, document_url) VALUES (?, ?, ?)`;
  con.query(query, [employee_id, documentName, documentUrl], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//creating an endpoint for Scheduling  Orientation Session
app.post('/orientation_sessions', bodyParser.json(), function (req, res) {
  const { employee_id, date, location } = req.body;
  const query = `INSERT INTO orientation_sessions (employee_id, date, location) VALUES (?, ?, ?)`;
  con.query(query, [employee_id, date, location], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//creating an endpoint for tracking unboarding progress
app.get('/onboarding-progress/:employee_id',bodyParser.json(), function (req, res) {
  const employee_id = req.params.employee_id
  const query = 'SELECT * FROM onboarding_documents WHERE employee_id = ?';
  con.query(query, [employee_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.listen(3000),
  console.log("server is running at port 3000")


