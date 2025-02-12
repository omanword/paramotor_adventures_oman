document.getElementById('bookingForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const captain = document.getElementById('captain').value;
  const paymentConfirmation = document.getElementById('paymentConfirmation').value;

  // Validate inputs
  if (!fullName || !email || !phone || !date || !location || !captain || !paymentConfirmation) {
    alert('Please fill in all fields and provide the payment transaction ID.');
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Phone number validation
  const phonePattern = /^\d{10}$/; // Example: 10 digits
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  // Date validation
  const selectedDate = new Date(date);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    alert('Please select a future date.');
    return;
  }

  // Display confirmation message
  const confirmationDetails = `
    <strong>Name:</strong> ${fullName}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Phone:</strong> ${phone}<br>
    <strong>Date:</strong> ${date}<br>
    <strong>Location:</strong> ${location}<br>
    <strong>Captain:</strong> ${captain}<br>
    <strong>Transaction ID:</strong> ${paymentConfirmation}
  `;

  document.getElementById('confirmationDetails').innerHTML = confirmationDetails;
  document.getElementById('confirmationMessage').classList.remove('hidden');

  // Clear form after submission
  document.getElementById('bookingForm').reset();
});