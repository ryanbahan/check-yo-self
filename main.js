var formTaskItems = document.querySelector('.display-task-items');
var taskItemsInput = document.querySelector('.task-item-field');
var addTaskItemBtn = document.querySelector('.add-task-item');
var taskListForm = document.querySelector('.task-list-form');
var clearAllBtn = document.querySelector('.clear-all');
var taskListTitleInput = document.querySelector('.task-title-field');
var cardColumnOne = document.querySelector('.card-column-one');
var cardColumnTwo = document.querySelector('.card-column-two');
var submitBtn = document.querySelector('.make-task-list');
var toDoCards = [];

addTaskItemBtn.addEventListener('click', addTaskItem);
formTaskItems.addEventListener('click', removeTaskItems);
clearAllBtn.addEventListener('click', clearForm);
taskListForm.addEventListener('submit', submitForm);
taskListForm.addEventListener('input', checkFormValidity);

gettoDoCards();
loadToDoCards();

function addTaskItem() {
    if (taskItemsInput.value.length > 0) {
        insertTaskItemHTML(taskItemsInput.value);
        taskItemsInput.value = "";
        checkFormValidity();
    }
};

function insertTaskItemHTML(text) {
    formTaskItems.insertAdjacentHTML('beforeend', `
    <div class="task-item-row-form">
    <img src="./assets/delete-black.svg" alt="" class="delete-black">
    <p>${text}</p>
</div>`)
};

function removeTaskItems() {
    if (event.target.className === 'delete-black') {
        var el = event.target.parentNode;
        el.remove(1);
        checkFormValidity();
    }
};

function clearForm() {
    event.preventDefault();
    taskListForm.reset();
    formTaskItems.innerHTML = "";
    checkFormValidity();
};

function submitForm() {
    if (taskListTitleInput.value.length > 0 && 
        formTaskItems.children.length > 0) {
        event.preventDefault();
        var newToDo = new ToDoList(Date.now(), taskListTitleInput.value);
        getTaskItems(newToDo);
        displayToDoCard(newToDo);
        newToDo.saveToStorage();
        clearForm();
    }
}

function getTaskItems(toDoList) {
    var taskItems = document.querySelectorAll('.task-item-row-form');
    taskItems.forEach(item => 
        {var newTask = new Task(item.children[1].innerHTML);
        toDoList.tasks.push(newTask)});
}

function displayToDoCard(toDoList) {
    if (cardColumnOne.children.length > cardColumnTwo.children.length) {
        cardColumnTwo.insertAdjacentHTML('afterbegin', 
            `<section class="task-list">
            <div class="task-title">${toDoList.title}</div>
            <div class="task-items-list" id="${toDoList.id}">
            </div>
            <div class="task-footer">
                <div class="card-footer-img-wrapper">
                    <img src="./assets/urgent.svg" alt="" class="urgent-img">
                    <p>URGENT</p>
                </div>
                <div class="card-footer-img-wrapper">
                    <img src="./assets/delete.svg" alt="" class="delete-img">
                    <p>DELETE</p>
                </div>
            </div>
        </section>`);
        var taskItems = document.getElementById(`${toDoList.id}`);
        toDoList.tasks.forEach(task => 
            {taskItems.insertAdjacentHTML('beforeend', `
                <div class="task-item-row">
                <img src="./assets/checkbox.svg" alt="" class="checkbox">
                <p>${task.title}</p>
                </div>
            `)});
    } else {
        cardColumnOne.insertAdjacentHTML('afterbegin', 
            `<section class="task-list">
            <div class="task-title">${toDoList.title}</div>
            <div class="task-items-list" id="${toDoList.id}">
            </div>
            <div class="task-footer">
                <div class="card-footer-img-wrapper">
                    <img src="./assets/urgent.svg" alt="" class="urgent-img">
                    <p>URGENT</p>
                </div>
                <div class="card-footer-img-wrapper">
                    <img src="./assets/delete.svg" alt="" class="delete-img">
                    <p>DELETE</p>
                </div>
            </div>
        </section>`);
        var taskItems = document.getElementById(`${toDoList.id}`);
        toDoList.tasks.forEach(task => 
            {taskItems.insertAdjacentHTML('beforeend', `
                <div class="task-item-row">
                <img src="./assets/checkbox.svg" alt="" class="checkbox">
                <p>${task.title}</p>
                </div>
            `)});
    }
}

function gettoDoCards() {
    for (var i = 0; i < localStorage.length; i++) {
        var toDoCardKey = localStorage.key([i]);
        if (toDoCardKey.includes('toDoList')) {
            var toDoCard = JSON.parse(window.localStorage.getItem(toDoCardKey));
            toDoCards.push(toDoCard);
        }
    }
    toDoCards.sort(function(a, b){return a.id-b.id});
  };

function loadToDoCards() {
for (var i = 0; i < toDoCards.length; i++) {
    displayToDoCard(toDoCards[i]);
    }
};

function checkFormValidity() {
    if (taskListTitleInput.value.length > 0 &&
        formTaskItems.children.length > 0) {
            submitBtn.removeAttribute('disabled');
            clearAllBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', "");
        clearAllBtn.setAttribute('disabled', "");
    }
};