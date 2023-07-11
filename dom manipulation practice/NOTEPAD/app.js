// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const task_delete_el = document.createElement("button");

// load all event listeners
loadEventListeners();
// load  event listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  // update local storage value as user edits his input
  taskList.addEventListener("click", updateTask);
  task_delete_el.addEventListener("click", deleteTask);
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
    // Create li and svg element
    const li = document.createElement("li");

    // Add class
    li.className = "collection-item cyan ";
    const task_input_el = document.createElement("textarea");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = note;
    task_input_el.setAttribute("readonly", "readonly");
    // Create text node and append to input
    task_input_el.appendChild(document.createTextNode(note));
    // input in li tag
    li.appendChild(task_input_el);
    // edit button
    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";
    // delete button
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";
    // add any value entered in the input box as the text of the input_el tag
    task_input_el.appendChild(document.createTextNode(taskInput.value));
    // append elements to li tag
    li.appendChild(task_input_el);
    li.appendChild(task_edit_el);
    li.appendChild(task_delete_el);
    // edit item
    task_edit_el.addEventListener("click", (e) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
      }
    });
    // delete item
    task_delete_el.addEventListener("click", deleteTask);
    // Append li to ul
    taskList.appendChild(li);
  });
}
// add task event
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a Task");
    form.removeEventListener(addTask);
  }
  // create UI elements
  const listItem = document.createElement("li");
  // input in li tag
  const task_input_el = document.createElement("textarea");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = taskInput.value;
  task_input_el.setAttribute("readonly", "readonly");

  // edit button
  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "Edit";
  // delete button
  const task_delete_el = document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerText = "Delete";
  // add classes
  listItem.className = "collection-item cyan";
  // add any value entered in the input box as the text of the input_el tag
  task_input_el.appendChild(document.createTextNode(taskInput.value));
  // append elements to li tag
  listItem.appendChild(task_input_el);
  listItem.appendChild(task_edit_el);
  listItem.appendChild(task_delete_el);

  // append li  tag to ul tag
  taskList.appendChild(listItem);
  // STORE IN lS
  storeTaskInLocalStorage(taskInput.value);
  // clear input box
  taskInput.value = "";
  e.preventDefault();
  // edit el
  task_edit_el.addEventListener("click", (e) => {
    if (task_edit_el.innerText.toLowerCase() == "edit") {
      task_edit_el.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      task_edit_el.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
    }
  });
}
task_delete_el.addEventListener("click", deleteTask);

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
// update task event
function updateTask(e) {
  if (e.target.classList.contains("edit")) {
    const listItem = e.target.parentElement;
    const task_input_el = listItem.querySelector("textarea.text");
    const newContent = task_input_el.value;
    const taskIndex = Array.from(taskList.children).indexOf(listItem);
    updateTaskInLocalStorage(taskIndex, newContent);
  }
}
// update task in LS
function updateTaskInLocalStorage(taskIndex, newContent) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes[taskIndex] = newContent;

  localStorage.setItem("notes", JSON.stringify(notes));
}
// delete task event
function deleteTask(e) {
  if (e.target.classList.contains("delete")) {
    const li = e.target.parentElement;
    removeTaskFromLocalStorage(li);
    taskList.removeChild(li);
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

  const taskContent = taskItem.querySelector("textarea.text").value;
  const taskIndex = notes.indexOf(taskContent);
  if (taskIndex !== -1) {
    notes.splice(taskIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

// clear all tasks
function clearTasks(e) {
  // you can also use - taskList.innerHTML ='' but the one used below has been proved to be faster;
  while (taskList.firstChild) {
    if (confirm("Are you sure you want to delete all permanently?")) {
      taskList.removeChild(taskList.firstChild);
    }
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
// reveal tips body to show tips to user
const plusSign = document.querySelector("#plusSign");
const tipsBody = document.querySelector("#tipsBody");
plusSign.addEventListener("click", function (e) {
  if (tipsBody.classList.contains("hideTips")) {
    tipsBody.classList.add("showTips");
    tipsBody.classList.remove("hideTips");
    plusSign.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>';
  } else if (tipsBody.classList.contains("showTips")) {
    tipsBody.classList.add("hideTips");
    tipsBody.classList.remove("showTips");
    plusSign.innerHTML =
      '<svg id="plusSign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>';
  }
});
// edit text in li after creation

// // practice
// const shot = document.querySelector(".collection");
// shot.onmouseover = function () {
//   console.log("Mouse action started!");
// };

// shot.onmouseleave = function () {
//   console.log("Mouse action terminated!");
// };

// shot.ontouchstart = function () {
//   console.log("Touch action started!");
// };

// shot.ontouchend = function () {
//   console.log("Touch action terminated!");
// };
