const Todo = (title, description, dueDate, priority) => {
    const updateTodo = (newTitle, newDesc, newDate, newPriority) => {
        this.title = newTitle;
        this.description = newDesc;
        this.dueDate = newDate;
        if (newPriority == "high") this.priority = "high";
        else if (newPriority == "medium") this.priority = "medium";
        else this.priority = "low";
    }

    return {title, description, dueDate, priority, updateTodo};
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

    return {projectsArray, addProject, deleteProject};

})();

export {Todo, Project, ProjectManager};