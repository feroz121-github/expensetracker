let btnAddTransaction = document.getElementById("add-transaction");
let formRequiredFileds = document.getElementsByClassName("required-field");
let transHistory = document.getElementsByClassName("history")[0];
let totalIncome = document.querySelector(".creditdebit .income h2");
let totalExpense = document.querySelector(".creditdebit .expense h2");
let remainingBalance = document.querySelector(".balance h1");
let tName, tAmount, tType;

//On doc ready

fnToggleAddButton();
btnAddTransaction.addEventListener("click", fnAddToTransactions);
for (i = 0; i < formRequiredFileds.length; i++) {
  formRequiredFileds[i].addEventListener("change", (e) => {
    fnToggleAddButton();
  });

  formRequiredFileds[i].addEventListener("keyup", (e) => {
    fnToggleAddButton();
  });
}

function fnAddToTransactions() {
  let transType = tType == "Income" ? "item-plus" : "item-minus";
  transHistory.innerHTML += `<div class="item ${transType}">
     <p>${tName}</p>
     <p class="amount">${tAmount}$</p>
     </div>`;

  //Recalculating total income and expenses
  let getIncome = transHistory.getElementsByClassName("item-plus");
  let getExpenses = transHistory.getElementsByClassName("item-minus");
  let totalAmt = 0;

  for (i = 0; i < getIncome.length; i++) {
    let income = getIncome[i]
      .getElementsByClassName("amount")[0]
      .innerHTML.replace("$", "");

    totalAmt += Number(income);
  }
  remainingBalance.innerHTML =
    Number(remainingBalance.innerHTML.replace("$", "")) + totalAmt + "$";
  totalIncome.innerHTML = totalAmt + "$";
  totalAmt = 0;
  for (i = 0; i < getExpenses.length; i++) {
    let income = getExpenses[i]
      .getElementsByClassName("amount")[0]
      .innerHTML.replace("$", "");

    totalAmt += Number(income);
  }
  remainingBalance.innerHTML =
    Number(remainingBalance.innerHTML.replace("$", "")) - totalAmt + "$";
  totalExpense.innerHTML = totalAmt + "$";
  fnClearFields();
}

function fnToggleAddButton() {
  fnSetValues();
  if (tName && tAmount && tType) {
    btnAddTransaction.removeAttribute("disabled");
  } else {
    btnAddTransaction.setAttribute("disabled", true);
  }
}

function fnSetValues() {
  tName = document.getElementById("transaction-name").value;
  tAmount = document.getElementById("transaction-amount").value;
  tType = document.getElementById("transaction-type").value;
}

function fnClearFields() {
  document.querySelectorAll(".form-control").forEach((control) => {
    control.value = "";
  });
  let naParagraph = document.querySelector(".history p.NA");
  if (naParagraph != undefined) {
    naParagraph.remove();
  }
}
