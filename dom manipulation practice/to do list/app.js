// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const deleteBox = document.querySelector("#confirmDeleteBox");
const yesBtn = document.querySelector(".selectBox button:first-child");
// load all event listeners
loadEventListeners();
// load  event listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}
// Get Tasks from LS
function getTasks() {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes.forEach(function (note) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item cyan darken-3";
    // Create text node and append to li
    li.appendChild(document.createTextNode(note));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // add svg tag
    link.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}
// add task event
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a Task");
    // check if value is empty and remove li
    // listItem.remove(3);
  }
  // create li element
  const listItem = document.createElement("li");
  // add class
  listItem.className = "collection-item cyan darken-3";
  // add any value entered in the input box as the text of the link tag
  listItem.appendChild(document.createTextNode(taskInput.value));

  // create link(a) tag
  const link = document.createElement("a");
  // add class to link tag
  link.className = "delete-item secondary-content";
  // add svg tag
  link.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>';
  // append link to li tag
  listItem.appendChild(link);
  // append li tag to ul tag
  taskList.appendChild(listItem);
  // STORE IN lS
  storeTaskInLocalStorage(taskInput.value);
  // clear input box
  taskInput.value = "";
  e.preventDefault();
}
// store task in LS
function storeTaskInLocalStorage(note) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));
}
// // Store Task
// function storeTaskInLocalStorage(task) {
//   let tasks;
//   if(localStorage.getItem('tasks') === null){
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }

//   tasks.push(task);

//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }
const noBtn = document.querySelector(".selectBox button:nth-child(2)");
// remove task event
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes.forEach(function (note, index) {
    if (taskItem.textContent === note) {
      notes.splice(index, 1);
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
// clear all tasks
function clearTasks(e) {
  // you can also use - taskList.innerHTML ='';
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter task event
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
}
