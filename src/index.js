import {displayNewProjectForm, displayNewTaskForm, displayInboxTodos, displayTodayTodos, displayThisWeekTodos} from './dom-stuff';
import initialLoad from './initial-load';
initialLoad();

const inbox = document.querySelector('#inbox-project');
inbox.addEventListener('click', () => {
    const currentlyActive = document.querySelector('.active');
    currentlyActive.classList.toggle('active');
    inbox.classList.toggle('active');
    displayInboxTodos();
});

const today = document.querySelector('#today-project');
today.addEventListener('click', () => {
    const currentlyActive = document.querySelector('.active');
    currentlyActive.classList.toggle('active');
    today.classList.toggle('active');
    displayTodayTodos();
});

const thisWeek = document.querySelector('#this-week-project');
thisWeek.addEventListener('click', () => {
    const currentlyActive = document.querySelector('.active');
    currentlyActive.classList.toggle('active');
    thisWeek.classList.toggle('active');
    displayThisWeekTodos();
});

const addProjectButton = document.querySelector('#add-project-button');
addProjectButton.addEventListener('click', displayNewProjectForm);

const addTaskButton = document.querySelector('#add-task-button');
addTaskButton.addEventListener('click', displayNewTaskForm);