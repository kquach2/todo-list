const clearContainer = (query) => {
    const container = document.querySelector(query);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
}

const displayTodos = (project) => {
    // this function is run anytime there is a change made to the list of todos for the currently displayed project
    // loop over each todo in the todo list of project, make a div based on it and then append that div to the DOM
    clearContainer('#todoContainer');
    const todoContainer = document.querySelector('#todoContainer');
    if (project.todos.length > 0) {
        for (let i=0; i<project.todos.length; i++) {
            const todoDiv = document.createElement('div');
            todoDiv.dataset.index = i;
            todoContainer.appendChild(todoDiv);
        }
    }
}

const displayProjects = () => {
    clearContainer('#projectContainer');
    const projectContainer = document.querySelector('#projectContainer');
    if (ProjectManager.projectsArray.length > 3) {
        for (let i=3; i<project.todos.length; i++) {
            const projectDiv = document.createElement('div');
            const projectTitle = document.createElement('p');
            projectDiv.dataset.index = i;
            projectContainer.appendChild(projectDiv);
        }
    } 
}


const expandTodo = (todo) => {

}

/*const updateIndex = (e) => {
    e.dataset.index = parseInt(e.dataset.index)-1;
}*/

// need to clear all the todos first in the container that holds them

export default {clearContent, displayProjects, displayTodos};
