let currentStep = 1;
const totalSteps = 5;

const stepImages = {
  1: "./images/profile1.png",
  2: "./images/profile2.png",
  3: "./images/profile.png",
  4: "./images/email.png",
  5: "./images/email.png",
};

function showStep(step) {
  // Hide all steps
  document.querySelectorAll(".form-step").forEach((formStep) => {
    formStep.classList.add("hidden");
  });

  // Show current step
  const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
  if (currentFormStep) {
    currentFormStep.classList.remove("hidden");
  }

  // Update progress text: "1 of 5", "2 of 5", ...
  const progressText = document.getElementById("progressText");
  if (progressText) {
    progressText.textContent = `${step} of ${totalSteps}`;
  }

  // Update progress bar (0%, 25%, 50%, 75%, 100%)
  const progressFill = document.getElementById("progressFill");
  if (progressFill) {
    progressFill.style.width = ((step - 1) / (totalSteps - 1)) * 100 + "%";
  }

  // Update profile image
  const img = document.getElementById("stepImage");
  if (img && stepImages[step]) {
    img.src = stepImages[step];
  }

  // When we reach Step 5, show the mobile number text
  if (step === 5) {
    const mobileSpan = document.getElementById("mobileDisplay");
    const mobileInput = document.getElementById("mobile");
    if (mobileSpan && mobileInput) {
      mobileSpan.textContent = mobileInput.value || "your number";
    }
  }
}

// ✅ Validate only the current step fields
function validateCurrentStep() {
  const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  if (!currentFormStep) return true;

  const fields = currentFormStep.querySelectorAll("input, select, textarea");

  for (let field of fields) {
    // Uses HTML5 validation: required, type="email", etc.
    if (!field.checkValidity()) {
      field.reportValidity();  // shows browser error popup
      field.focus();
      return false;
    }
  }
  return true;
}

function nextStep() {
  // Don't go next if current step has invalid/empty required fields
  if (!validateCurrentStep()) {
    return;
  }

  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// OTP verify (Step 5)
function verifyOtp() {
  const otpInput = document.getElementById("otp");
  const otp = otpInput ? otpInput.value.trim() : "";

  if (otp === "") {
    alert("Please enter OTP");
    if (otpInput) otpInput.focus();
    return;
  }

  // For now accept any OTP (you can add real check if needed)
  alert("OTP verified successfully!\nRegistration complete.");
  // Example redirect:
  // window.location.href = "success.html";
}

// Stop full form submit / page refresh
document.getElementById("multiStepForm").addEventListener("submit", function (event) {
  event.preventDefault();
});

// Show first step on load
showStep(currentStep);


// Allow Enter key to trigger Next step
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();  // stop form default submit behavior

    if (currentStep < totalSteps) {
      nextStep();
    } else if (currentStep === totalSteps) {
      verifyOtp(); // On Step 5: Enter = Verify OTP
    }
  }
});
function verifyOtp() {
  alert("OTP verified successfully!");
  window.location.href = "verify.html";
}

