const loanCalculator = document.getElementById("loan-form");
loanCalculator.addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});
// calculate results event
function calculateResults() {
  // variables of UI ELEMENTS
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  //    results in UI
  // parseFloat passes the numbers as a decimal, principal = amount
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  // calculation for monthly payment
  const unknown = Math.pow(1 + calculatedInterest, calculatedPayments);
  // the brackets are used when calculating to show preference as it is done in BODMAS, the ones in brackets are calculated first before any other expression
  const monthly = (principal * unknown * calculatedInterest) / (unknown - 1);
  if (isFinite(monthly)) {
    // toFixed rounds up any decimal to 2d.p or any other value in the bracket
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show results
    document.getElementById("results").style.display = "block";
    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showErrorBox();
  }
  // show error box
  function showErrorBox() {
    document.getElementById("error-box").style.display = "block";
    // hide results
    document.getElementById("results").style.display = "none";
    // hide loader
    document.getElementById("loading").style.display = "none";
    setTimeout(clearError, 3000);
  } // Clear error
  function clearError() {
    document.getElementById("error-box").style.display = "none";
  }
}
