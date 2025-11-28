const steps = document.querySelectorAll(".form-step");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const form = document.getElementById("multiStepForm");

let currentStep = 1;
const totalSteps = steps.length;

function showStep(stepNumber) {
  steps.forEach((stepDiv) => {
    const step = Number(stepDiv.getAttribute("data-step"));
    if (step === stepNumber) {
      stepDiv.classList.remove("hidden");
    } else {
      stepDiv.classList.add("hidden");
    }
  });

  progressText.textContent = `Step ${stepNumber} of ${totalSteps}`;
  const percent = (stepNumber / totalSteps) * 100;
  progressFill.style.width = percent + "%";
}

function validateStep(stepNumber) {
  // Validate only the inputs in the current step
  const stepDiv = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
  const inputs = stepDiv.querySelectorAll("input, select");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
}

function nextStep() {
  if (!validateStep(currentStep)) return;

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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateStep(currentStep)) return;

  // After step 4, go to identity verification page
  window.location.href = "verify.html";
  alert("Successfully completed Step 4!");

});


// Initial display
showStep(currentStep);
