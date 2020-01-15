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
        var localKey = Object.keys(localStorage).find(key => key.includes(`${this.id}`));
        window.localStorage.removeItem(localKey);
    }

    updateToDo() {
        if (this.urgent === false) {
            this.urgent = true;
        } else {
            this.urgent = false;
        }
        this.saveToStorage();
    }

    updateTask(event) {
        var task = this.tasks.find(task => 
            task.title === event.target.parentNode.children[1].innerText);
        
        task.checked = !task.checked;
        this.saveToStorage();
    }
}