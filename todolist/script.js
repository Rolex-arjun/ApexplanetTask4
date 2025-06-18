const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

function addTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (isCompleted) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = taskText;
  span.onclick = () => {
    li.classList.toggle('completed');
    toggleTask(taskText);
  };

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '✖';
  delBtn.onclick = () => {
    li.remove();
    removeTask(taskText);
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
