const saveToLocalStorage = () => {
  localStorage.setItem('projects', JSON.stringify(ProjectManager.projectsArray));
};

const Todo = (title, description, dueDate, priority) => ({
  title, description, dueDate, priority,
});

function Project(title) {
  const todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
    saveToLocalStorage();
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
    saveToLocalStorage();
  };

  const updateTodo = (index, newTitle, newDesc, newDate, newPriority) => {
    todos[index].title = newTitle;
    todos[index].description = newDesc;
    todos[index].dueDate = newDate;
    if (newPriority === 'high') todos[index].priority = 'high';
    else if (newPriority === 'medium') todos[index].priority = 'medium';
    else todos[index].priority = 'low';
    saveToLocalStorage();
  };

  return {
    todos, title, addTodo, deleteTodo, updateTodo,
  };
}

const ProjectManager = (() => {
  const projectsArray = [];

  const addProject = (project) => {
    projectsArray.push(project);
    saveToLocalStorage();
  };

  const deleteProject = (index) => {
    projectsArray.splice(index, 1);
    saveToLocalStorage();
  };

  return { projectsArray, addProject, deleteProject };
})();

const loadFromLocalStorage = () => {
  const projects = JSON.parse(localStorage.getItem('projects'));

  for (let i = 0; i < projects.length; i += 1) {
    const project = Project(projects[i].title);
    for (let j = 0; j < projects[i].todos.length; j += 1) {
      project.addTodo(projects[i].todos[j]);
    }
    ProjectManager.addProject(project);
  }
};

export {
  Todo, Project, ProjectManager, loadFromLocalStorage,
};
