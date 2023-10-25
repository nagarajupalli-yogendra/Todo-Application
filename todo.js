let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
    checkbox.className = 'checkbox-button';
    taskItem.appendChild(checkbox);
    
    // Display task text
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.className = 'task-text';
    taskText.style.textDecoration = task.completed ? 'line-through' : 'none';
    taskItem.appendChild(taskText);
    
    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = () => editTask(index);
    taskItem.appendChild(editButton);
    
    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => deleteTask(index);
    taskItem.appendChild(deleteButton);
    
    // Add checkbox for task completion status
   

    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTask = {
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
}

function editTask(index) {
  const updatedText = prompt('Edit task:', tasks[index].text);
  if (updatedText !== null) {
    tasks[index].text = updatedText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  const isConfirmed = confirm('Are you sure you want to delete this task?');
  if (isConfirmed) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Initial rendering of tasks
renderTasks();