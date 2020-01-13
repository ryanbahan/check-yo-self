class ToDoList {
    constructor(id, title, tasks, urgent) {
        this.id = id;
        this.title = title;
        this.urgent = urgent || false;
        this.tasks = tasks || [];
    }
    saveToStorage() {
        window.localStorage.setItem(`toDoList ${this.title} ${this.id}`, JSON.stringify(this));
    }
    deleteFromStorage() {

    }
    updateToDo() {
        if (this.urgent === false) {
            this.urgent = true;
        } else {
            this.urgent = false;
        }
        this.saveToStorage();
    }
    updateTask() {
        
    }
}