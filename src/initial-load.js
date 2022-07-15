import working from './working.png';
import today from './google-calendar.png';
import week from './7-days.png';
import ibox from './inbox.png';
import plus from './plus.png';
import { displayInboxTodos, displayProjects } from './dom-stuff';
import { ProjectManager, Project, loadFromLocalStorage } from './app-logic';
import './styles.css';

const initialLoad = () => {
  if (localStorage.getItem('projects')) {
    loadFromLocalStorage();
  } else {
    const inbox = Project('inbox');
    ProjectManager.addProject(inbox);
  }
  const body = document.querySelector('body');

  const header = document.createElement('header');
  const logoBox = document.createElement('div');
  logoBox.setAttribute('id', 'logo-box');
  const logo = new Image();
  logo.src = working;
  logo.setAttribute('id', 'logo');
  logoBox.appendChild(logo);
  const pageTitle = document.createElement('h1');
  pageTitle.setAttribute('id', 'page-title');
  pageTitle.textContent = 'Todo List';
  logoBox.appendChild(pageTitle);
  header.appendChild(logoBox);
  body.appendChild(header);

  const main = document.createElement('main');

  const nav = document.createElement('nav');
  const defaultProjects = document.createElement('div');

  const inboxProject = document.createElement('div');
  inboxProject.setAttribute('class', 'default-project');
  inboxProject.classList.toggle('active');
  inboxProject.setAttribute('id', 'inbox-project');
  inboxProject.dataset.projectIndex = 0;
  const inboxIcon = new Image();
  inboxIcon.src = ibox;
  inboxProject.appendChild(inboxIcon);
  const inboxText = document.createElement('p');
  inboxText.textContent = 'Inbox';
  inboxProject.appendChild(inboxText);
  defaultProjects.appendChild(inboxProject);

  const todayProject = document.createElement('div');
  todayProject.setAttribute('class', 'default-project');
  todayProject.setAttribute('id', 'today-project');
  const todayIcon = new Image();
  todayIcon.src = today;
  todayProject.appendChild(todayIcon);
  const todayText = document.createElement('p');
  todayText.textContent = 'Today';
  todayProject.appendChild(todayText);
  defaultProjects.appendChild(todayProject);

  const thisWeekProject = document.createElement('div');
  thisWeekProject.setAttribute('class', 'default-project');
  thisWeekProject.setAttribute('id', 'this-week-project');
  const weekIcon = new Image();
  weekIcon.src = week;
  thisWeekProject.appendChild(weekIcon);
  const weekText = document.createElement('p');
  weekText.textContent = 'This Week';
  thisWeekProject.appendChild(weekText);
  defaultProjects.appendChild(thisWeekProject);
  nav.appendChild(defaultProjects);

  const projects = document.createElement('h1');
  projects.setAttribute('id', 'projects-heading');
  projects.textContent = 'Projects';
  nav.appendChild(projects);

  const projectsList = document.createElement('div');
  projectsList.setAttribute('id', 'projects-list');
  nav.appendChild(projectsList);

  const addProjectButton = document.createElement('div');
  addProjectButton.setAttribute('id', 'add-project-button');

  const plusIcon = new Image();
  plusIcon.src = plus;
  plusIcon.setAttribute('class', 'plus-icon');
  addProjectButton.append(plusIcon);

  const addProjectText = document.createElement('p');
  addProjectText.textContent = 'Add Project';
  addProjectButton.append(addProjectText);

  nav.appendChild(addProjectButton);
  main.appendChild(nav);

  const projectPreview = document.createElement('div');
  projectPreview.setAttribute('id', 'project-preview');
  main.appendChild(projectPreview);

  body.appendChild(main);
  displayInboxTodos();
  displayProjects();
};

export default initialLoad;
