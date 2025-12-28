const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
  createTask(task.text, task.completed);
});

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  createTask(task.text, task.completed);

  taskInput.value = "";
});

function createTask(text, completed) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  span.textContent = text;
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";

  if (completed) {
    span.classList.add("completed");
  }

  span.addEventListener("click", function () {
    span.classList.toggle("completed");
    updateTaskStatus(text);
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    removeTask(text);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(text) {
  tasks = tasks.map(task =>
    task.text === text
      ? { ...task, completed: !task.completed }
      : task
  );
  saveTasks();
}

function removeTask(text) {
  tasks = tasks.filter(task => task.text !== text);
  saveTasks();
}