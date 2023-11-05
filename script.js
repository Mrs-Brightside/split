
const dataAtual = new Date()
    document.getElementById("data").value = dataAtual.toISOString().slice(0, 10);

    let selectedMonth = dataAtual.getMonth();

    let monthSelection = document.querySelector('.js-month-selection');
    let currentMonth = dataAtual.getMonth();

    monthSelection.selectedIndex = currentMonth;

    monthSelection.addEventListener('change', function() {
        selectedMonth = this.selectedIndex;
        renderExpensesDataTania();
        renderExpensesDataSandro();
        calculateDiference();
    });

//------------------------------------------------------------------------------------------------------------------------------------------------------

function openPopUp() {
    document.getElementById("popup").style.display = "block";
  }
  function closePopUp() {
    document.getElementById("popup").style.display = "none";
  }

//------------------------------------------------------------------------------------------------------------------------------------------------------

let expensesTania = [];
const expensesSplitKeyTania = 'expensesTania';

if (localStorage.getItem(expensesSplitKeyTania)) {
    expensesTania = JSON.parse(localStorage.getItem(expensesSplitKeyTania));
}

let expensesSandro = [];
const expensesSplitKeySandro = 'expensesSandro';

if (localStorage.getItem(expensesSplitKeySandro)) {
    expensesSandro = JSON.parse(localStorage.getItem(expensesSplitKeySandro));
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function addExpense() {
  const name = document.querySelector('.js-name-selection').value;
  const expense = document.querySelector('.js-expense-input').value;
  const cashValue = document.querySelector('.js-value-cash-input').value;
  const dueDate = document.querySelector('.js-due-date-input').value;

  if (name === 'Tânia') {
    expensesTania.push({
      name,
      expense,
      cashValue,
      dueDate,
    });
    renderExpensesDataTania();
    getTaniaTotal();
    localStorage.setItem(expensesSplitKeyTania, JSON.stringify(expensesTania));
  } else if (name === 'Sandro') {
    expensesSandro.push({
      name,
      expense,
      cashValue,
      dueDate,
    });
    renderExpensesDataSandro();
    getSandroTotal();
    localStorage.setItem(expensesSplitKeySandro, JSON.stringify(expensesSandro));
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

let totalSandro = 0;
let totalTania = 0;
let totalGeralTania = 0;
let totalGeralSandro = 0;

function getTaniaTotal() {
  const expensesTania = JSON.parse(localStorage.getItem("expensesTania"));
  totalTania = 0;

  let filteredExpensesTania = expensesTania.filter((expense) => {
    const expenseDate = new Date(expense.dueDate);
    return expenseDate.getMonth() === selectedMonth;
  });

  for (let i = 0; i < filteredExpensesTania.length; i++) {
    const cashValue = parseInt(filteredExpensesTania[i].cashValue);
    totalTania += cashValue;
  }

  document.querySelector('.js-total-tania').innerHTML = totalTania + '€';
  return totalTania;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function getSandroTotal() {
  const expensesSandro = JSON.parse(localStorage.getItem("expensesSandro"));
  totalSandro = 0;

  let filteredExpensesSandro = expensesSandro.filter((expense) => {
    const expenseDate = new Date(expense.dueDate);
    return expenseDate.getMonth() === selectedMonth;
  });

  for (let i = 0; i < filteredExpensesSandro.length; i++) {
    const cashValue = parseInt(filteredExpensesSandro[i].cashValue);
    totalSandro += cashValue;
  }

  document.querySelector('.js-total-sandro').innerHTML = totalSandro + '€';
  return totalSandro;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function calculateDiference() {
  let diferenceValueTania = totalTania - totalSandro;
  let diferenceValueSandro = totalSandro - totalTania;

  if (diferenceValueSandro < 0) {
    document.querySelector('.js-diference-sandro').innerHTML = diferenceValueSandro;
    document.querySelector('.js-diference-tania').innerHTML = '';
  } else {
    document.querySelector('.js-diference-sandro').innerHTML = '';
    document.querySelector('.js-diference-tania').innerHTML = '';
  };

  if (diferenceValueTania < 0) {
    document.querySelector('.js-diference-sandro').innerHTML = '';
    document.querySelector('.js-diference-tania').innerHTML = diferenceValueTania;
  };
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function calculateTotal() {
  const expensesTania = JSON.parse(localStorage.getItem("expensesTania"));
  const expensesSandro = JSON.parse(localStorage.getItem("expensesSandro"));
  totalGeralTania = 0;
  totalGeralSandro = 0;

  for (let i = 0; i < expensesTania.length; i++) {
    const cashValue = parseInt(expensesTania[i].cashValue);
    totalGeralTania += cashValue;
  };

  for (let i = 0; i < expensesSandro.length; i++) {
    const cashValue = parseInt(expensesSandro[i].cashValue);
    totalGeralSandro += cashValue;
  };
  
  document.querySelector('.js-total-geral-tania').innerHTML = totalGeralTania + '€';
  document.querySelector('.js-total-geral-sandro').innerHTML = totalGeralSandro + '€';
  calculateDiferenceGeral();
  return totalGeralSandro;
  return totalGeralTania;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function calculateDiferenceGeral() {
    let difGeralTania = totalGeralTania - totalGeralSandro;
    let difGeralSandro = totalGeralSandro - totalGeralTania;

    if (difGeralSandro < 0) {
        document.querySelector('.js-dif-S').innerHTML = difGeralSandro;
        document.querySelector('.js-dif-T').innerHTML = '';
    } else {
        document.querySelector('.js-dif-S').innerHTML = '';
        document.querySelector('.js-dif-T').innerHTML = '';
    };

    if (difGeralTania < 0) {
        document.querySelector('.js-dif-S').innerHTML = '';
        document.querySelector('.js-dif-T').innerHTML = difGeralTania;
    };
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function renderExpensesDataTania() {
    let splitListHTMLTania = '';

    let filteredExpensesTania = expensesTania.filter((expense) => {
        const expenseDate = new Date(expense.dueDate);
        return expenseDate.getMonth() === selectedMonth;
    });

    for (let i = 0; i < filteredExpensesTania.length; i++) {
    const splitObject = filteredExpensesTania[i];
    const { name, expense, cashValue, dueDate } = splitObject;

    splitListHTMLTania += `
        <div class="expenses-line">
            
            <div class="remove-background"> 
            ${expense}
            </div>

            <div class="values-bin">
            <div class="valor-despesa"> 
            ${Math.round(cashValue)}€
            </div>

            <button onclick="
                const index = expensesTania.findIndex(e => e.expense === '${expense}' || e.cashValue === '${cashValue}' || e.dueDate === '${dueDate}');
                if (index !== -1) {
                    expensesTania.splice(index, 1);
                }
                localStorage.setItem(expensesSplitKeyTania, JSON.stringify(expensesTania));
                renderExpensesDataTania();
                calculateTotal();
                calculateDiference();
                calculateDiferenceGeral(); 
            " class="delete-split-button remove-background delete-img">
            </button>
            </div>
        </div>
        `;
    }

    document.querySelector('.js-split-list-tania').innerHTML = splitListHTMLTania;
    getTaniaTotal()
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function renderExpensesDataSandro() {
    let splitListHTMLSandro = '';

    let filteredExpensesSandro = expensesSandro.filter((expense) => {
        const expenseDate = new Date(expense.dueDate);
        return expenseDate.getMonth() === selectedMonth;
    });

    for (let i = 0; i < filteredExpensesSandro.length; i++) {
    const splitObject = filteredExpensesSandro[i];
    const { name, expense, cashValue, dueDate } = splitObject;

    splitListHTMLSandro += `
        <div class="expenses-line">
           
            <div class="remove-background"> 
            ${expense}
            </div>

            <div class="values-bin">
            <div class="valor-despesa"> 
            ${Math.round(cashValue)}€
            </div>

            <button onclick="
                const index = expensesSandro.findIndex(e => e.expense === '${expense}' && e.cashValue === '${cashValue}' && e.dueDate === '${dueDate}');
                if (index !== -1) {
                    expensesSandro.splice(index, 1);
                }
                localStorage.setItem(expensesSplitKeySandro, JSON.stringify(expensesSandro));
                renderExpensesDataSandro();
                calculateTotal();
                calculateDiference();
                calculateDiferenceGeral(); 
            " class="delete-split-button remove-background delete-img">
            </button>
            </div>
        </div>
        `;
    }

    document.querySelector('.js-split-list-sandro').innerHTML = splitListHTMLSandro;
    getSandroTotal()
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

renderExpensesDataTania();
renderExpensesDataSandro();
calculateTotal();
calculateDiference();
calculateDiferenceGeral();