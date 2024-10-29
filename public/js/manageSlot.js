// dashboard.js

// Get the modal and button elements for the slot form
const slotFormModal = document.getElementById("slotFormModal");
const openSlotFormBtn = document.getElementById("openSlotFormBtn");
const closeSlotModal = document.getElementById("closeSlotModal");

// Show the modal when the "Add New Slot" button is clicked
openSlotFormBtn.addEventListener("click", () => {
  slotFormModal.style.display = "flex";
});

// Hide the modal when the "X" (close) button is clicked
closeSlotModal.addEventListener("click", () => {
  slotFormModal.style.display = "none";
});

// Hide the modal when clicking outside the form
window.addEventListener("click", (event) => {
  if (event.target == slotFormModal) {
    slotFormModal.style.display = "none";
  }
});
