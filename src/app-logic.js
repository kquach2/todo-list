function Todo(title, description, dueDate, priority, complete=false) {
    const markComplete = () => this.complete = true;

    const updateTodo = (newTitle, newDesc, newDate, newPriority) => {
        this.title = newTitle;
        this.description = newDesc;
        this.dueDate = newDate;
        if (newPriority == "High") this.priority = "high";
        else if (newPriority == "Medium") this.priority = "medium";
        else this.priority = "low";
    }

    return {title, description, dueDate, priority, complete, markComplete, updateTodo};
}

function Project(title) {
    let todos = [];

    const addTodo = (todo) => todos.push(todo); 

    const deleteTodo = (index) => {
        todos.splice(index,1);
    }

    return {todos, title, addTodo, deleteTodo};
}

const ProjectManager = (() => {
    let projectsArray = [];

    const addProject = (project) => projectsArray.push(project); 

    const deleteProject = (index) => {
        projectsArray.splice(index,1);
    }

    return {projectsArray, title, addProject, deleteProject};

})();

export default {Todo, Project, ProjectManager};