// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();
// load  event listeners
function loadEventListeners() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
}

// add task event
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a Task");
  }
  // create li element
  const listItem = document.createElement("li");
  // add class
  listItem.className = "collection-item";
  // add any value entered in the input box as the text of the link tag
  listItem.appendChild(document.createTextNode(taskInput.value));
  // create link(a) tag
  const link = document.createElement("a");
  // add class to link tag
  link.className = "delete-item secondary-content";
  // add i tag
  link.innerHTML =
    '<i class="fa-solid fa-xmark fa-lg" style="color:#000;""></i>';
  // append link to li tag
  listItem.appendChild(link);
  // append li tag to ul tag
  taskList.appendChild(listItem);
  // clear input box
  taskInput.value = "";
  e.preventDefault();
}
// remove task event
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
// clear all tasks
function clearTasks(e) {
  while (taskList.firstChild) {}
  taskList.removeChild(taskList.firstChild);
}
