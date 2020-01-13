var formTaskItems = document.querySelector('.display-task-items');
var taskItemsInput = document.querySelector('.task-item-field');
var addTaskItemBtn = document.querySelector('.add-task-item');
var taskListForm = document.querySelector('.task-list-form');
var clearAllBtn = document.querySelector('.clear-all');

addTaskItemBtn.addEventListener('click', addTaskItem);
formTaskItems.addEventListener('click', removeTaskItems);
clearAllBtn.addEventListener('click', clearForm)

function addTaskItem() {
    if (taskItemsInput.value.length > 0) {
        insertTaskItemHTML(taskItemsInput.value);
        taskItemsInput.value = "";
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
    }
};

function clearForm() {
    event.preventDefault();
    taskListForm.reset();
    formTaskItems.innerHTML = "";
};