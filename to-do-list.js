class ToDoList {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.urgent = false;
        this.tasks = [];
    }
    saveToStorage() {
        window.localStorage.setItem(`toDoList ${this.title} ${this.id}`, JSON.stringify(this));
    }
    deleteFromStorage() {

    }
    updateToDo() {

    }
    updateTask() {
        
    }
}