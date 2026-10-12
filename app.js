const express = require('express');
const app = express();
app.use(express.json());
let students = [
 { id: 1, name: "Pratik", age: 20 },
 { id: 2, name: "Nitin", age: 21 }
];
// Home route
app.get('/', (req, res) => {
 res.send("Student Management API is Running");
});
// Get all students
app.get('/students', (req, res) => {
 res.json(students);
});
// Get student by ID
app.get('/students/:id', (req, res) => {
 const student = students.find(
 s => s.id === parseInt(req.params.id)
 );
 if (!student) {
 return res.status(404).json({
 message: "Student not found"
 });
 }
 res.json(student);
});
// Add a student
app.post('/students', (req, res) => {
 const { name, age } = req.body;
 if (!name || !age) {
 return res.status(400).json({
 message: "Name and age are required"
 });
 }
 const student = {
 id: students.length
 ? Math.max(...students.map(s => s.id)) + 1
 : 1,
 name,
 age
 };
 students.push(student);
 res.status(201).json(student);
});
// Delete a student
app.delete('/students/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const index = students.findIndex(s => s.id === id);
 if (index === -1) {
 return res.status(404).json({
 message: "Student not found"
 });
 }
 students.splice(index, 1);
 res.json({
 message: "Student deleted successfully"
 });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});