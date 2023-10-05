// Obtém a data actual
const dataAtual = new Date();
// Define a data pré-definida
document.getElementById("data").value = dataAtual.toISOString().slice(0, 10);


const nameSelection = document.querySelector('.js-name-selection');
const name = nameSelection.value

const inputElement = document.querySelector('.js-expense-input');
const expense = inputElement.value

const cashValueInput = document.querySelector('.js-value-cash-input');
const cashValue = cashValueInput.value

const dateInputElement = document.querySelector('.js-due-date-input');
const dueDate = dateInputElement.value;

const expensesSplit = [{
    name,
    expense,
    cashValue,
    dueDate,
}];



function renderExpensesData() {
    let splitListHTML = '';

    for (let i = 1; i < expensesSplit.length; i++) {
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
            splitList.splice(${i}, 1);
            renderExpensesData();
        " class="delete-split-button">Delete</button>
        
        `;
        splitListHTML += html;
    }
    
        document.querySelector('.js-split-list')
            .innerHTML = splitListHTML;
}

function addExpense () {
    const nameSelection = document.querySelector('.js-name-selection');
    const name = nameSelection.value

    const inputElement = document.querySelector('.js-expense-input');
    const expense = inputElement.value

    const cashValueInput = document.querySelector('.js-value-cash-input');
    const cashValue = cashValueInput.value
    
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    expensesSplit.push({
        name,
        expense,
        cashValue,
        dueDate,
    });

    inputElement.value ='';
    cashValueInput.value='';
    dateInputElement.value=dataAtual.toISOString().slice(0, 10);

    renderExpensesData();
}



