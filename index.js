let btnAddTransaction = document.getElementById("add-transaction");
let formRequiredFileds = document.getElementsByClassName("required-field");
let transHistory = document.getElementsByClassName("history")[0];
let totalIncome = document.querySelector(".creditdebit .income h2");
let totalExpense = document.querySelector(".creditdebit .expense h2");
let remainingBalance = document.querySelector(".balance h1");
let btnDeleteTransaction = document.querySelector(".delete");
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

document.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName != "HTML") {
    if (e.target.parentElement.className == "delete") {
      let rowToDelete = e.target.parentElement.parentElement;
      rowToDelete.remove();
      fnCalcIncomeExpenses();
    }
  }
});

function fnAddToTransactions() {
  let transType = tType == "Income" ? "item-plus" : "item-minus";
  transHistory.innerHTML += `<div class="item ${transType}">
     
     <p class="edit" style="display:none"><i class="fas fa-pen"></i></p>
     <p class="delete"><i class="fas fa-trash"></i></p>
     <p class="transName">${tName}</p>
     <p class="amount">${Number(fnNumWithDecimals(tAmount))}$</p>
     </div>`;
  fnCalcIncomeExpenses();
  fnClearFields();
}

function fnCalcIncomeExpenses() {
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

  totalIncome.innerHTML = totalAmt + "$";
  totalAmt = 0;
  for (i = 0; i < getExpenses.length; i++) {
    let income = getExpenses[i]
      .getElementsByClassName("amount")[0]
      .innerHTML.replace("$", "");

    totalAmt += Number(income);
  }
  totalExpense.innerHTML = totalAmt + "$";
  remainingBalance.innerHTML =
    Number(
      fnNumWithDecimals(totalIncome.innerHTML.replace("$", "")) -
        fnNumWithDecimals(totalExpense.innerHTML.replace("$", ""))
    ) + "$";
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
  btnAddTransaction.setAttribute("disabled", true);
}

function fnNumWithDecimals(n) {
  let num = n;
  console.log(num);

  var negative = false;
  digits = 2;
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(2);
  if (negative) {
    n = (n * -1).toFixed(2);
  }
  return n;
}
