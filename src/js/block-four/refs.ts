export default function getRefs() {
  return {
    form: document.querySelector(".form"),
    debitForm: document.querySelector(".debitForm"),
    creditForm: document.querySelector(".creditForm"),
    totalFundsBtn: document.querySelector("#totalFunds"),
    totalFunds: document.querySelector(".totalFunds"),
    bankContainer: document.querySelector(".bankContainer"),
  };
}
