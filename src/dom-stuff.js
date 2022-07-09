import { differenceInDays, hoursToMilliseconds, parse, startOfWeek, endOfWeek } from "date-fns";
import edit from './edit.png';
import trash from './trash.png';
import plus from './plus.png';
import checklist from './done.png';
import {Project, Todo, ProjectManager} from './app-logic';

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
            todo.addEventListener('click', () => {
                expandTodo(ProjectManager.projectsArray[0].todos[i]);
            });

            const left = document.createElement('div');
            left.setAttribute('class','left');

            const button = document.createElement('button');
            button.setAttribute('class', 'complete-button');
            button.classList.add(ProjectManager.projectsArray[0].todos[i].priority);
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                ProjectManager.projectsArray[0].deleteTodo(i);
                displayInboxTodos();
            });
            left.appendChild(button);

            const todoTitle = document.createElement('p');
            todoTitle.setAttribute('class', 'todo-title');
            todoTitle.textContent = ProjectManager.projectsArray[0].todos[i].title;
            left.appendChild(todoTitle);
            todo.appendChild(left);

            const right = document.createElement('div');
            right.setAttribute('class','right');
            const todoDueDate = document.createElement('p');
            todoDueDate.setAttribute('class', 'todo-duedate');
            todoDueDate.textContent = ProjectManager.projectsArray[0].todos[i].dueDate;
            right.appendChild(todoDueDate);
    
            const editIcon = new Image();
            editIcon.src = edit;
            editIcon.setAttribute('class', 'edit-icon');
            editIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                displayUpdateTaskForm(ProjectManager.projectsArray[0].todos[i]);
                //displayInboxTodos();
            });
            right.appendChild(editIcon);
    
            const deleteIcon = new Image();
            deleteIcon.src = trash;
            deleteIcon.setAttribute('class', 'delete-icon');
            deleteIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                ProjectManager.projectsArray[0].deleteTodo(i);
                displayInboxTodos();
            });
            right.appendChild(deleteIcon);
            todo.appendChild(right)
    
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
    addTaskButton.addEventListener('click', displayNewTaskForm);
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
                    todo.addEventListener('click', () => {
                        expandTodo(ProjectManager.projectsArray[i].todos[j]);
                    });

                    const left = document.createElement('div');
                    left.setAttribute('class','left');

                    const button = document.createElement('button');
                    button.setAttribute('class', 'complete-button');
                    button.classList.add(ProjectManager.projectsArray[i].todos[j].priority);
                    button.addEventListener('click', (event) => {
                        event.stopPropagation();
                        ProjectManager.projectsArray[i].deleteTodo(j);
                        displayTodayTodos();
                    });
                    left.appendChild(button);
    
                    const todoTitle = document.createElement('p');
                    todoTitle.setAttribute('class', 'todo-title');
                    todoTitle.textContent = ProjectManager.projectsArray[i].todos[j].title + ` (${ProjectManager.projectsArray[i].title})`;
                    left.appendChild(todoTitle);
                    todo.appendChild(left);
                
                    const right = document.createElement('div');
                    right.setAttribute('class','right');
                    const todoDueDate = document.createElement('p');
                    todoDueDate.setAttribute('class', 'todo-duedate');
                    todoDueDate.textContent = project.todos[i].dueDate;
                    right.appendChild(todoDueDate);
    
                    const editIcon = new Image();
                    editIcon.src = edit;
                    editIcon.setAttribute('class', 'edit-icon');
                    editIcon.addEventListener('click', (event) => {
                        event.stopPropagation();
                        displayUpdateTaskForm(ProjectManager.projectsArray[i].todos[j]);
                        //displayTodayTodos();
                    });
                    right.appendChild(editIcon);
    
                    const deleteIcon = new Image();
                    deleteIcon.src = trash;
                    deleteIcon.setAttribute('class', 'delete-icon');
                    deleteIcon.addEventListener('click', (event) => {
                        event.stopPropagation();
                        ProjectManager.projectsArray[i].deleteTodo(j);
                        displayTodayTodos();
                    });
                    right.appendChild(deleteIcon);
                    todo.appendChild(right)

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
                    todo.addEventListener('click', () => {
                        expandTodo(ProjectManager.projectsArray[i].todos[j]);
                    });

                    const left = document.createElement('div');
                    left.setAttribute('class','left');

                    const button = document.createElement('button');
                    button.setAttribute('class', 'complete-button');
                    button.classList.add(ProjectManager.projectsArray[i].todos[j].priority);
                    button.addEventListener('click', (event) => {
                        event.stopPropagation();
                        ProjectManager.projectsArray[i].deleteTodo(j);
                        displayThisWeekTodos();
                    });
                    left.appendChild(button);
    
                    const todoTitle = document.createElement('p');
                    todoTitle.setAttribute('class', 'todo-title');
                    todoTitle.textContent = ProjectManager.projectsArray[i].todos[j].title + ` (${ProjectManager.projectsArray[i].title})`;
                    left.appendChild(todoTitle);
                    todo.appendChild(left);
                
                    const right = document.createElement('div');
                    right.setAttribute('class','right');
                    const todoDueDate = document.createElement('p');
                    todoDueDate.setAttribute('class', 'todo-duedate');
                    todoDueDate.textContent = project.todos[i].dueDate;
                    right.appendChild(todoDueDate);
    
                    const editIcon = new Image();
                    editIcon.src = edit;
                    editIcon.setAttribute('class', 'edit-icon');
                    editIcon.addEventListener('click', (event) => {
                        event.stopPropagation();
                        displayUpdateTaskForm(ProjectManager.projectsArray[i].todos[j]);
                        //displayThisWeekTodos();
                    });
                    right.appendChild(editIcon);
    
                    const deleteIcon = new Image();
                    deleteIcon.src = trash;
                    deleteIcon.setAttribute('class', 'delete-icon');
                    deleteIcon.addEventListener('click', (event) => {
                        event.stopPropagation();
                        ProjectManager.projectsArray[i].deleteTodo(j);
                        displayThisWeekTodos();
                    });
                    right.appendChild(deleteIcon);
                    todo.appendChild(right);
    
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
            const currentlyActive = document.querySelector('.active');
            todo.addEventListener('click', () => {
                expandTodo(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].todos[i]);
            });
            const left = document.createElement('div');
            left.setAttribute('class','left');

            const button = document.createElement('button');
            button.setAttribute('class', 'complete-button');
            button.classList.add(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].todos[i].priority);
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].deleteTodo(i);
                displayCustomProjectTodos(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)])
            });
            left.appendChild(button);

            const todoTitle = document.createElement('p');
            todoTitle.setAttribute('class', 'todo-title');
            todoTitle.textContent = project.todos[i].title;
            left.appendChild(todoTitle);
            todo.appendChild(left);
            
            const right = document.createElement('div');
            right.setAttribute('class','right');

            const todoDueDate = document.createElement('p');
            todoDueDate.setAttribute('class', 'todo-duedate');
            todoDueDate.textContent = project.todos[i].dueDate;
            right.appendChild(todoDueDate);


            const editIcon = new Image();
            editIcon.src = edit;
            editIcon.setAttribute('class', 'edit-icon');
            editIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                displayUpdateTaskForm(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].todos[i]);
                //displayCustomProjectTodos(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)]);
            });
            right.appendChild(editIcon);

            const deleteIcon = new Image();
            deleteIcon.src = trash;
            deleteIcon.setAttribute('class', 'delete-icon');
            deleteIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].deleteTodo(i);
                displayCustomProjectTodos(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)])
            });

            right.appendChild(deleteIcon);
            todo.appendChild(right);

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
    addTaskButton.addEventListener('click', displayNewTaskForm);
    addTaskButton.append(addTaskText);

    projectPreview.appendChild(addTaskButton);
}

const displayProjects = () => {
    const projectContainer = document.querySelector('#projects-list');
    clearContainer(projectContainer);
    if (ProjectManager.projectsArray.length > 1) {
        for (let i=1; i<ProjectManager.projectsArray.length; i++) {
            const projectDiv = document.createElement('div');
            projectDiv.setAttribute('class', 'custom-project');
            projectDiv.dataset.projectIndex = i;
            projectDiv.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.active');
                if (currentlyActive) currentlyActive.classList.toggle('active');
                projectDiv.classList.toggle('active');
                displayCustomProjectTodos(ProjectManager.projectsArray[i]);
            });

            const left = document.createElement('div');
            left.setAttribute('class','left');
            const checkListIcon = new Image();
            checkListIcon.src = checklist;
            left.appendChild(checkListIcon);

            const projectTitle = document.createElement('p');
            projectTitle.textContent = ProjectManager.projectsArray[i].title;
            left.appendChild(projectTitle);
            projectDiv.appendChild(left);

            const deleteIcon = new Image();
            deleteIcon.src = trash;
            deleteIcon.setAttribute('class', 'project-delete');
            deleteIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                ProjectManager.deleteProject(i); 
                displayProjects();
                const projectPreview = document.querySelector('#project-preview');
                if (!document.querySelector('.active')) clearContainer(projectPreview);                  
            });

            projectDiv.appendChild(deleteIcon);
            projectContainer.appendChild(projectDiv);
        }
    } 
}

const expandTodo = (todo) => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    const expandedTodo = document.createElement('form');
    expandedTodo.addEventListener('click', (event) => {
        event.stopPropagation();
    });
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
    priorityInput.disabled = true;
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
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    const form = document.createElement('form');
    form.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    form.addEventListener('submit', () => {
        overlay.remove();
        const title = form.taskName.value;
        const dueDate = form.dueDate.value;
        const priority = form.priority.value;
        const description = form.description.value;
        const newTodo = Todo(title, description, dueDate, priority);         
        const currentlyActive = document.querySelector('.active');
        if (currentlyActive.id == 'inbox-project') {
            ProjectManager.projectsArray[0].addTodo(newTodo);
            displayInboxTodos();
        }
        else {
            ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)].addTodo(newTodo);
            displayCustomProjectTodos(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)])
        }
    });

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
    submit.setAttribute('type', 'submit');
    submit.textContent = "Submit";
    form.appendChild(submit);

    overlay.appendChild(form);
    body.prepend(overlay);
}

const displayUpdateTaskForm = (todo) => {
    console.log(todo);
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    const form = document.createElement('form');
    form.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    form.addEventListener('submit', () => {
        overlay.remove();
        const newTitle = form.taskName.value;
        const newDueDate = form.dueDate.value;
        const newPriority = form.priority.value;
        const newDescription = form.description.value;
        //todo.updateTodo(newTitle, newDescription, newDueDate, newPriority);
        todo.title = newTitle;
        todo.dueDate = newDueDate;
        todo.priority = newPriority;
        todo.description = newDescription; 
        const currentlyActive = document.querySelector('.active');
        if (currentlyActive.classList.contains('default-project')) {
            if (currentlyActive.id == 'inbox-project') displayInboxTodos();
            else if (currentlyActive.id == 'today-project') displayTodayTodos();
            else displayThisWeekTodos();
        }
        else displayCustomProjectTodos(ProjectManager.projectsArray[parseInt(currentlyActive.dataset.projectIndex)]);
    });

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
    submit.setAttribute('type', 'submit');
    submit.textContent = "Update";
    form.appendChild(submit);
    
    overlay.appendChild(form);
    body.prepend(overlay);
}

const displayNewProjectForm = () => {
    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    const form = document.createElement('form');
    form.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    form.addEventListener('submit', () => {
        overlay.remove();
        const newProject = Project(form.projectName.value);
        ProjectManager.addProject(newProject);
        displayProjects();
    });

    const title = document.createElement('h2');
    title.textContent = "New Project";
    form.appendChild(title);

    const projectName = document.createElement('div');
    const projectNameLabel = document.createElement('label');
    projectNameLabel.setAttribute('for', 'projectName');
    projectNameLabel.textContent = "Project name:";
    projectName.appendChild(projectNameLabel);
    const projectNameInput = document.createElement('input');
    projectNameInput.setAttribute('id', 'projectName');
    projectNameInput.setAttribute('name', 'projectName');
    projectNameInput.setAttribute('type', 'text');
    projectNameInput.required = true;
    projectName.appendChild(projectNameInput);
    form.appendChild(projectName);

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = "Submit";
    form.appendChild(submit);
    overlay.appendChild(form);
    body.prepend(overlay);
}

export {clearContainer, displayInboxTodos, displayTodayTodos, displayThisWeekTodos, displayCustomProjectTodos, 
    displayProjects, expandTodo, displayNewTaskForm, displayUpdateTaskForm, displayNewProjectForm};
