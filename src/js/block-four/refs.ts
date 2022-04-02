export default function getRefs() {
  return {
    form: document.querySelector(".form") as HTMLFormElement,
    debitForm: document.querySelector(".debitForm") as HTMLFormElement,
    creditForm: document.querySelector(".creditForm") as HTMLFormElement,
    totalFundsBtn: document.querySelector("#totalFunds"),
    totalFunds: document.querySelector(".totalFunds"),
    bankContainer: document.querySelector(".bankContainer"),
  };
}
