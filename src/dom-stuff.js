import { differenceInDays, startOfWeek } from "date-fns";
import edit from './src/edit.png';
import trash from './src/trash.png';
import plus from './src/plus.png';

const clearContainer = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
}

const displayInboxTodos = () => {
    const projectPreview = document.querySelector('#project-preview');
    clearContainer(projectPreview);

    const projectTitle = document.createElement('h1');
    projectTitle.setAttribute('id','project-title');
    projectTitle.textContent = 'Inbox';
    projectPreview.appendChild(projectTitle);

    const todoContainer = document.createElement('div');
    todoContainer.setAttribute('id','todo-container');
    if (ProjectManager.projectsArray[0].todos.length > 0) {
        for (let i=0; i<ProjectManager.projectsArray[0].todos.length; i++) {
            const todo = document.createElement('div');
            todo.dataset.todoIndex = i;
            const button = document.createElement('button');
            button.setAttribute('class', 'complete-button');
            todo.appendChild(button);
    
            const todoTitle = document.createElement('p');
            todoTitle.setAttribute('class', 'todo-title');
            todoTitle.textContent = ProjectManager.projectsArray[0].todos[i].title;
            todo.appendChild(todoTitle);
                
            const todoDueDate = document.createElement('p');
            todoDueDate.setAttribute('class', 'todo-duedate');
            todoDueDate.textContent = ProjectManager.projectsArray[0].todos[i].dueDate;
            todo.appendChild(todoDueDate);
    
            const editIcon = new Image();
            editIcon.src = edit;
            editIcon.setAttribute('class', 'edit-icon');
            todo.appendChild(editIcon);
    
            const deleteIcon = new Image();
            deleteIcon.src = trash;
            deleteIcon.setAttribute('class', 'delete-icon');
            todo.appendChild(deleteIcon);
    
            todoContainer.appendChild(todo);
        }
                    
    }
    projectPreview.appendChild(todoContainer);

    const addTaskButton = document.createElement('div');
    addTaskButton.setAttribute('id', 'add-task-button');

    const plusIcon = new Image();
    plusIcon.src = plus;
    plusIcon.setAttribute('class', 'plus-icon')
    addTaskButton.append(plusIcon);

    const addTaskText = document.createElement('p');
    addTaskText.textContent = 'Add Task';
    addTaskButton.append(addTaskText);

    projectPreview.appendChild(addTaskButton);
}

const displayTodayTodos = () => {
    const projectPreview = document.querySelector('#project-preview');
    clearContainer(projectPreview);

    const projectTitle = document.createElement('h1');
    projectTitle.setAttribute('id','project-title');
    projectTitle.textContent = 'Today';
    projectPreview.appendChild(projectTitle);

    const todoContainer = document.createElement('div');
    todoContainer.setAttribute('id','todo-container');
    for (let i=0; i<ProjectManager.projectsArray.length; i++) {
        if (ProjectManager.projectsArray[i].todos.length > 0) {
            for (let j=0; j<ProjectManager.projectsArray[i].todos.length; j++) {
                const today = new Date(new Date().setHours(0,0,0,0));
                const todoDueDate = new Date(ProjectManager.projectsArray[i].todos[j].dueDate+'T00:00:00');
                if (differenceInDays(today, todoDueDate) == 0) {
                    const todo = document.createElement('div');
                    todo.dataset.todoIndex = j;
                    todo.dataset.projectIndex = i;
                    const button = document.createElement('button');
                    button.setAttribute('class', 'complete-button');
                    todo.appendChild(button);
    
                    const todoTitle = document.createElement('p');
                    todoTitle.setAttribute('class', 'todo-title');
                    todoTitle.textContent = ProjectManager.projectsArray[i].todos[j].title + ` (${ProjectManager.projectsArray[i].title})`;
                    todo.appendChild(todoTitle);
                
                    const todoDueDate = document.createElement('p');
                    todoDueDate.setAttribute('class', 'todo-duedate');
                    todoDueDate.textContent = project.todos[i].dueDate;
                    todo.appendChild(todoDueDate);
    
                    const editIcon = new Image();
                    editIcon.src = edit;
                    editIcon.setAttribute('class', 'edit-icon');
                    todo.appendChild(editIcon);
    
                    const deleteIcon = new Image();
                    deleteIcon.src = trash;
                    deleteIcon.setAttribute('class', 'delete-icon');
                    todo.appendChild(deleteIcon);
    
                    todoContainer.appendChild(todo);
                }
            }
        }
    }

    projectPreview.appendChild(todoContainer);
}

const displayThisWeekTodos = () => {
    const projectPreview = document.querySelector('#project-preview');
    clearContainer(projectPreview);

    const projectTitle = document.createElement('h1');
    projectTitle.setAttribute('id','project-title');
    projectTitle.textContent = 'This Week';
    projectPreview.appendChild(projectTitle);

    const todoContainer = document.createElement('div');
    todoContainer.setAttribute('id','todo-container');
    for (let i=0; i<ProjectManager.projectsArray.length; i++) {
        if (ProjectManager.projectsArray[i].todos.length > 0) {
            for (let j=0; j<ProjectManager.projectsArray[i].todos.length; j++) {
                const today = new Date();
                const start = startOfWeek(today, {weekStartsOn: 1});
                const end = endOfWeek(today, {weekStartsOn: 1});
                const todoDueDate = new Date(ProjectManager.projectsArray[i].todos[j].dueDate+'T00:00:00');
                if (todoDueDate >= start && todoDueDate <= end) {
                    const todo = document.createElement('div');
                    todo.dataset.todoIndex = j;
                    todo.dataset.projectIndex = i;
                    const button = document.createElement('button');
                    button.setAttribute('class', 'complete-button');
                    todo.appendChild(button);
    
                    const todoTitle = document.createElement('p');
                    todoTitle.setAttribute('class', 'todo-title');
                    todoTitle.textContent = ProjectManager.projectsArray[i].todos[j].title + ` (${ProjectManager.projectsArray[i].title})`;
                    todo.appendChild(todoTitle);
                
                    const todoDueDate = document.createElement('p');
                    todoDueDate.setAttribute('class', 'todo-duedate');
                    todoDueDate.textContent = project.todos[i].dueDate;
                    todo.appendChild(todoDueDate);
    
                    const editIcon = new Image();
                    editIcon.src = edit;
                    editIcon.setAttribute('class', 'edit-icon');
                    todo.appendChild(editIcon);
    
                    const deleteIcon = new Image();
                    deleteIcon.src = trash;
                    deleteIcon.setAttribute('class', 'delete-icon');
                    todo.appendChild(deleteIcon);
    
                    todoContainer.appendChild(todo);
                }
                
            }
        }
    }

    projectPreview.appendChild(todoContainer);
}
const displayCustomProjectTodos = (project) => {
    const projectPreview = document.querySelector('#project-preview');
    clearContainer(projectPreview);

    const projectTitle = document.createElement('h1');
    projectTitle.setAttribute('id','project-title');
    projectTitle.textContent = project.title;
    projectPreview.appendChild(projectTitle);

    const todoContainer = document.createElement('div');
    todoContainer.setAttribute('id','todo-container');
    if (project.todos.length > 0) {
        for (let i=0; i<project.todos.length; i++) {
            const todo = document.createElement('div');
            todo.dataset.index = i;

            const button = document.createElement('button');
            button.setAttribute('class', 'complete-button');
            todo.appendChild(button);

            const todoTitle = document.createElement('p');
            todoTitle.setAttribute('class', 'todo-title');
            todoTitle.textContent = project.todos[i].title;
            todo.appendChild(todoTitle);
            
            const todoDueDate = document.createElement('p');
            todoDueDate.setAttribute('class', 'todo-duedate');
            todoDueDate.textContent = project.todos[i].dueDate;
            todo.appendChild(todoDueDate);


            const editIcon = new Image();
            editIcon.src = edit;
            editIcon.setAttribute('class', 'edit-icon');
            todo.appendChild(editIcon);

            const deleteIcon = new Image();
            deleteIcon.src = trash;
            deleteIcon.setAttribute('class', 'delete-icon');
            todo.appendChild(deleteIcon);

            todoContainer.appendChild(todo);
        }
    }
    projectPreview.appendChild(todoContainer);

    const addTaskButton = document.createElement('div');
    addTaskButton.setAttribute('id', 'add-task-button');
    
    const plusIcon = new Image();
    plusIcon.src = plus;
    plusIcon.setAttribute('class', 'plus-icon')
    addTaskButton.append(plusIcon);

    const addTaskText = document.createElement('p');
    addTaskText.textContent = 'Add Task';
    addTaskButton.append(addTaskText);

    projectPreview.appendChild(addTaskButton);
}

const displayProjects = () => {
    const projectContainer = document.querySelector('#projectContainer');
    clearContainer(projectContainer);
    if (ProjectManager.projectsArray.length > 1) {
        for (let i=1; i<ProjectManager.projectsArray.length; i++) {
            const projectDiv = document.createElement('div');
            const projectTitle = document.createElement('p');
            projectDiv.dataset.index = i;
            projectContainer.appendChild(projectDiv);
        }
    } 
}

const expandTodo = (todo) => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');

    const expandedTodo = document.createElement('form');

    const taskName = document.createElement('div');
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'taskName');
    taskNameLabel.textContent = "Task name:";
    taskName.appendChild(taskNameLabel);
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('id', 'taskName');
    taskNameInput.setAttribute('name', 'taskName');
    taskNameInput.value = todo.title;
    taskNameInput.readOnly = true;
    taskName.appendChild(taskNameInput);
    expandedTodo.appendChild(taskName);

    const dueDate = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due date:';
    dueDate.appendChild(dueDateLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('id', 'dueDate');
    dueDateInput.setAttribute('name', 'dueDate');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.value = todo.dueDate;
    dueDateInput.readOnly = true;
    dueDate.appendChild(dueDateInput);
    expandedTodo.appendChild(dueDate);

    const priority = document.createElement('div');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority:';
    priority.appendChild(priorityLabel);
    const priorityInput = document.createElement('select');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');
    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low';        
    priorityInput.appendChild(lowPriority);
    const mediumPriority = document.createElement('option');
    mediumPriority.value = 'medium';
    mediumPriority.textContent = 'Medium';
    priorityInput.appendChild(mediumPriority);
    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High';
    priorityInput.appendChild(highPriority);
    if (todo.priority == 'low') priorityInput.selectedIndex = '0';
    else if (todo.priority == 'medium') priorityInput.selectedIndex = '1';
    else priorityInput.selectedIndex = '2';
    priorityInput.readOnly = true;
    priority.appendChild(priorityInput);
    expandedTodo.appendChild(priority);

    const description = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    description.appendChild(descriptionLabel);
    const descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('id', 'description');
    descriptionInput.setAttribute('name', 'description');
    descriptionInput.value = todo.description;
    descriptionInput.readOnly = true;
    description.appendChild(descriptionInput);
    expandedTodo.appendChild(description);

    overlay.appendChild(expandedTodo);
    body.prepend(overlay);
}

const displayNewTaskForm = () => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    title.textContent = "New Task";
    form.appendChild(title);

    const taskName = document.createElement('div');
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'taskName');
    taskNameLabel.textContent = "Task name:";
    taskName.appendChild(taskNameLabel);
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('id', 'taskName');
    taskNameInput.setAttribute('name', 'taskName');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.placeholder = "Task name";
    taskNameInput.required = true;
    taskName.appendChild(taskNameInput);
    form.appendChild(taskName);

    const dueDate = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due date:';
    dueDate.appendChild(dueDateLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('id', 'dueDate');
    dueDateInput.setAttribute('name', 'dueDate');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.required = true;
    dueDate.appendChild(dueDateInput);
    form.appendChild(dueDate);

    const priority = document.createElement('div');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority:';
    priority.appendChild(priorityLabel);
    const priorityInput = document.createElement('select');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');
    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low';
    priorityInput.appendChild(lowPriority);
    const mediumPriority = document.createElement('option');
    mediumPriority.value = 'medium';        
    mediumPriority.textContent = 'Medium';
    priorityInput.appendChild(mediumPriority);
    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High';
    priorityInput.appendChild(highPriority);
    priority.appendChild(priorityInput);
    form.appendChild(priority);

    const description = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    description.appendChild(descriptionLabel);
    const descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('id', 'description');
    descriptionInput.setAttribute('name', 'description');
    description.appendChild(descriptionInput);
    form.appendChild(description);

    const submit = document.createElement('button');
    submit.value = "Submit";
    form.appendChild(submit);

    overlay.appendChild(form);
    body.prepend(overlay);
}

const displayUpdateTaskForm = (todo) => {
    if (document.querySelector('#overlay')) document.querySelector('#overlay').remove();

    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    title.textContent = "Update Task";
    form.appendChild(title);

    const taskName = document.createElement('div');
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'taskName');
    taskNameLabel.textContent = "Task name:";
    taskName.appendChild(taskNameLabel);
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('id', 'taskName');
    taskNameInput.setAttribute('name', 'taskName');
    taskNameInput.value = todo.title;
    taskName.appendChild(taskNameInput);
    form.appendChild(taskName);

    const dueDate = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due date:';
    dueDate.appendChild(dueDateLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('id', 'dueDate');
    dueDateInput.setAttribute('name', 'dueDate');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.value = todo.dueDate;
    dueDate.appendChild(dueDateInput);
    form.appendChild(dueDate);

    const priority = document.createElement('div');
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = 'Priority:';
    priority.appendChild(priorityLabel);
    const priorityInput = document.createElement('select');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');
    const lowPriority = document.createElement('option');
    lowPriority.value = 'low';
    lowPriority.textContent = 'Low';        
    priorityInput.appendChild(lowPriority);
    const mediumPriority = document.createElement('option');
    mediumPriority.value = 'medium';
    mediumPriority.textContent = 'Medium';
    priorityInput.appendChild(mediumPriority);
    const highPriority = document.createElement('option');
    highPriority.value = 'high';
    highPriority.textContent = 'High';
    priorityInput.appendChild(highPriority);
    if (todo.priority == 'low') priorityInput.selectedIndex = '0';
    else if (todo.priority == 'medium') priorityInput.selectedIndex = '1';
    else priorityInput.selectedIndex = '2';
    priority.appendChild(priorityInput);
    form.appendChild(priority);

    const description = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    description.appendChild(descriptionLabel);
    const descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('id', 'description');
    descriptionInput.setAttribute('name', 'description');
    descriptionInput.value = todo.description;
    description.appendChild(descriptionInput);
    form.appendChild(description);

    const submit = document.createElement('button');
    submit.value = "Update";
    form.appendChild(submit);
    
    overlay.appendChild(form);
    body.prepend(overlay);
}


export default {clearContainer, displayInboxTodos, displayTodayTodos, displayThisWeekTodos, displayCustomProjectTodos, 
    displayProjects, expandTodo, displayNewTaskForm, displayUpdateTaskForm};
