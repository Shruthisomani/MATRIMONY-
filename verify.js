const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const govId = document.getElementById("govId");
  const selfie = document.getElementById("selfie");
  const otp = document.getElementById("otp");

  if (!govId.files.length) {
    alert("Please upload your Government ID.");
    return;
  }

  if (!selfie.files.length) {
    alert("Please upload your selfie.");
    return;
  }

  if (!otp.value.trim()) {
    alert("Please enter OTP.");
    return;
  }

  // Only UI simulation
  alert("Identity verification submitted! (Backend verification will be done later.)");

  // Example: next page can be dashboard.html later
  // window.location.href = "dashboard.html";
});

function goBackToRegister() {
  window.location.href = "register.html";
}
