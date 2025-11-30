// verify.js

// Go back to registration (multi-step) page
function goBackToRegister() {
  // Change "register.html" if your main page has a different name
  window.location.href = "register.html";
}

// Handle the identity verification form
const verifyForm = document.getElementById("verifyForm");
const govIdInput = document.getElementById("govId");
const selfieInput = document.getElementById("selfie");

// Allowed file types (you can add more if needed)
const allowedIdTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
const allowedSelfieTypes = ["image/jpeg", "image/png", "image/jpg"];

// Max size: 5 MB (in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function validateFile(inputEl, allowedTypes, fieldLabel) {
  if (!inputEl || !inputEl.files || inputEl.files.length === 0) {
    alert(`Please upload your ${fieldLabel}.`);
    inputEl.focus();
    return false;
  }

  const file = inputEl.files[0];

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    alert(`Invalid file type for ${fieldLabel}. Please upload a valid file.`);
    inputEl.value = ""; // reset the file input
    inputEl.focus();
    return false;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    alert(`${fieldLabel} is too large. Maximum size is 5 MB.`);
    inputEl.value = "";
    inputEl.focus();
    return false;
  }

  return true;
}

// On form submit
verifyForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent page refresh

  // Validate Government ID
  if (!validateFile(govIdInput, allowedIdTypes, "Government ID")) {
    return;
  }

  // Validate Selfie
  if (!validateFile(selfieInput, allowedSelfieTypes, "Selfie")) {
    return;
  }

  // If everything is valid
  alert("Identity verification files uploaded successfully!");

  // Redirect after successful verification
  // Change "success.html" to whatever page you want (dashboard, home, etc.)
  window.location.href = "success.html";
});
