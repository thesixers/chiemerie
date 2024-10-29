// dashboard.js

// Get the modal and button elements
const userFormModal = document.getElementById("userFormModal");
const openFormBtn = document.getElementById("openFormBtn");
const closeModal = document.getElementById("closeModal");

// Show the modal when the "Register New User" button is clicked
openFormBtn.addEventListener("click", () => {
  userFormModal.style.display = "flex";
});

// Hide the modal when the "X" (close) button is clicked
closeModal.addEventListener("click", () => {
  userFormModal.style.display = "none";
});

// Hide the modal when clicking outside the form
window.addEventListener("click", (event) => {
  if (event.target == userFormModal) {
    userFormModal.style.display = "none";
  }
});
