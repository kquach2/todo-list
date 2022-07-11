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
        console.log(projectsArray);
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
    console.log(localStorage.getItem('projects'));
    console.log(JSON.parse(localStorage.getItem('projects')));
}

const loadFromLocalStorage = () => {
    console.log('Project Manager Array:' + ProjectManager.projectsArray);
    const projects = JSON.parse(localStorage.getItem('projects'));
    //let newProjectsArray = [];

    for (let i=0; i < projects.length; i++) {
        // projects[i] is a generic object, need to turn it into a Project
        /*let newProject = Project(projects[i].title);
        newProject.todos = projects[i].todos;
        newProjectsArray.push(newProject);*/
        const project = Project(projects[i].title);
        for (let j=0; j < projects[i].todos.length; j++) {
            project.addTodo(projects[i].todos[j]);
        }
        ProjectManager.addProject(project);
    }
    //ProjectManager.projectsArray = newProjectsArray;
}

export {Todo, Project, ProjectManager, loadFromLocalStorage};