const Todo = (title, description, dueDate, priority) => {
    return {title, description, dueDate, priority};
}

function Project(title) {
    let todos = [];

    const addTodo = (todo) => {
        todos.push(todo); 
        saveToLocalStorage();
    }

    const deleteTodo = (index) => {
        todos.splice(index,1);
        saveToLocalStorage();
    }

    const updateTodo = (index, newTitle, newDesc, newDate, newPriority) => {
        todos[index].title = newTitle;
        todos[index].description = newDesc;
        todos[index].dueDate = newDate;
        if (newPriority == "high") todos[index].priority = "high";
        else if (newPriority == "medium") todos[index].priority = "medium";
        else todos[index].priority = "low";
        saveToLocalStorage();
    }

    return {todos, title, addTodo, deleteTodo, updateTodo};
}

const ProjectManager = (() => {
    let projectsArray = [];

    const addProject = (project) => {
        projectsArray.push(project); 
        saveToLocalStorage();
    }

    const deleteProject = (index) => {
        projectsArray.splice(index,1);
        saveToLocalStorage();
    }

    return {projectsArray, addProject, deleteProject};

})();

const saveToLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(ProjectManager.projectsArray));
}

const loadFromLocalStorage = () => {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const addTodo = (todo) => {
        todos.push(todo); 
        saveToLocalStorage();
    }

    const deleteTodo = (index) => {
        todos.splice(index,1);
        saveToLocalStorage();
    }

    const updateTodo = (index, newTitle, newDesc, newDate, newPriority) => {
        todos[index].title = newTitle;
        todos[index].description = newDesc;
        todos[index].dueDate = newDate;
        if (newPriority == "high") todos[index].priority = "high";
        else if (newPriority == "medium") todos[index].priority = "medium";
        else todos[index].priority = "low";
        saveToLocalStorage();
    }

    console.log(projects);
    console.log(ProjectManager.projectsArray);
    for (let i=0; i < projects.length; i++) {
        projects[i].addTodo = addTodo;
        projects[i].deleteTodo = deleteTodo;
        projects[i].updateTodo = updateTodo;
    }
    ProjectManager.projectsArray = projects;
}

export {Todo, Project, ProjectManager, loadFromLocalStorage};