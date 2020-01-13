var formTaskItems = document.querySelector('.display-task-items');
var taskItemsInput = document.querySelector('.task-item-field');
var addTaskItemBtn = document.querySelector('.add-task-item');
var taskListForm = document.querySelector('.task-list-form');
var clearAllBtn = document.querySelector('.clear-all');
var taskListTitleInput = document.querySelector('.task-title-field');
var cardColumnOne = document.querySelector('.card-column-one');
var cardColumnTwo = document.querySelector('.card-column-two');
var submitBtn = document.querySelector('.make-task-list');
var mainCardsDisplay = document.querySelector('.cards-display-container');
var toDoCards = [];

addTaskItemBtn.addEventListener('click', addTaskItem);
formTaskItems.addEventListener('click', removeTaskItems);
clearAllBtn.addEventListener('click', clearForm);
taskListForm.addEventListener('submit', submitForm);
taskListForm.addEventListener('input', checkFormValidity);
mainCardsDisplay.addEventListener('click', toggleUrgent)

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
            `<section class="task-list" data-id="${toDoList.id}">
            <div class="task-title">${toDoList.title}</div>
            <div class="task-items-list" id="${toDoList.id}">
            </div>
            <div class="task-footer">
                <div class="card-footer-img-wrapper urgent-btn">
                    <img src="./assets/urgent.svg" alt="" class="urgent-img" data-id="${toDoList.id}">
                    <p>URGENT</p>
                </div>
                <div class="card-footer-img-wrapper delete-btn">
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
        displayUrgentCard(toDoList);
    } else {
        cardColumnOne.insertAdjacentHTML('afterbegin', 
            `<section class="task-list" data-id="${toDoList.id}">
            <div class="task-title">${toDoList.title}</div>
            <div class="task-items-list" id="${toDoList.id}">
            </div>
            <div class="task-footer">
                <div class="card-footer-img-wrapper urgent-btn">
                    <img src="./assets/urgent.svg" alt="" class="urgent-img" data-id="${toDoList.id}">
                    <p>URGENT</p>
                </div>
                <div class="card-footer-img-wrapper delete-btn">
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
        displayUrgentCard(toDoList);
    }
}

function displayUrgentCard(toDoList) {
    if (toDoList.urgent === true) {
        var id = toDoList.id.toString();
        var card = document.querySelector(`section[data-id="${id}"]`)
        card.classList.add('urgent');
        toggleActiveImg(toDoList, 'urgent');
    }
}

function gettoDoCards() {
    for (var i = 0; i < localStorage.length; i++) {
        var toDoCardKey = localStorage.key([i]);
        if (toDoCardKey.includes('toDoList')) {
            var toDoCard = JSON.parse(window.localStorage.getItem(toDoCardKey));
            toDoCard = new ToDoList(toDoCard.id, toDoCard.title, toDoCard.tasks, toDoCard.urgent);
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

function toggleUrgent() {
    if (event.target.parentNode.classList.contains('urgent-btn')) {
        var displayCard = event.target.parentNode.parentNode.parentNode;
        var savedToDo = toDoCards.find(card => card.id == displayCard.dataset.id);
        toggleActiveImg(savedToDo, 'urgent');
        // var urgentImg = document.querySelector(`img[data-id="${savedToDo.id}"]`);
        // urgentImg.src = "./assets/urgent-active.svg";
        savedToDo.updateToDo();
        displayCard.classList.toggle('urgent');
    }
}

function toggleActiveImg(card, type) {
    var displayImg = document.querySelector(`img[data-id="${card.id}"]`);
    if (displayImg.src.includes('active')) {
        displayImg.src = `./assets/${type}.svg`;
    } else {
        displayImg.src = `./assets/${type}-active.svg`;
    }
}