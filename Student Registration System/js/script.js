// Get DOM elements
const studentForm = document.getElementById("studentForm");
const studentTable = document
  .getElementById("studentTable")
  .getElementsByTagName("tbody")[0];

// Load existing records from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to render students
function renderStudents() {
  studentTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = studentTable.insertRow();
    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
        `;
  });
}

// Function to add a new student
function addStudent(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const studentId = document.getElementById("studentId").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;

  // Validate input
  if (!validateInput(name, studentId, email, contact)) {
    return;
  }

  students.push({ name, studentId, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  studentForm.reset();
}

// Function to validate input
function validateInput(name, studentId, email, contact) {
  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields");
    return false;
  }
  if (!/^\d+$/.test(studentId)) {
    alert("Student ID must contain only numbers");
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Name must contain only letters and spaces");
    return false;
  }
  if (!/^\d+$/.test(contact)) {
    alert("Contact number must contain only numbers");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }
  return true;
}

// Function to edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  students.splice(index, 1);
  renderStudents();
}

// Function to delete a student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }
}

// Event listeners
studentForm.addEventListener("submit", addStudent);

// Initial render
renderStudents();
