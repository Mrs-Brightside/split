// Obtém a data actual
const dataAtual = new Date();
// Define a data pré-definida
document.getElementById("data").value = dataAtual.toISOString().slice(0, 10);

const name = document.querySelector('.js-name-selection').value;
const expense = document.querySelector('.js-expense-input').value;
const cashValue = document.querySelector('.js-value-cash-input').value;
const dueDate = document.querySelector('.js-due-date-input').value;

const expensesSplit = [];

function renderExpensesData() {
    let splitListHTML = '';

    for (let i = 0; i < expensesSplit.length; i++) {
        const splitObject = expensesSplit[i];
        const {name, expense, cashValue, dueDate} = splitObject;
        const html = `
        <div>
            ${name}
        </div>
        
        <div> 
            ${expense}
        </div>
        <div>
            ${cashValue}
        </div>

        <div>
            ${dueDate}
        </div>
         
        <button onclick="
            expensesSplit.splice(${i}, 1);
            renderExpensesData();
        " class="delete-split-button">Delete</button>
        
        `;
        splitListHTML += html;
    }
    
        document.querySelector('.js-split-list')
            .innerHTML = splitListHTML;
}

function addExpense () {
    const name = document.querySelector('.js-name-selection').value;
    const expense = document.querySelector('.js-expense-input').value;
    const cashValue = document.querySelector('.js-value-cash-input').value;
    const dueDate = document.querySelector('.js-due-date-input').value;

    expensesSplit.push({
        name,
        expense,
        cashValue,
        dueDate,
    });
    //limpar valores dos inputs
    expense.value ='';
    cashValue.value='';
    dueDate.value=dataAtual.toISOString().slice(0, 10);

    renderExpensesData();
}



