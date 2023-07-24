// Get the current time
// Function to update the greeting based on the current time
function updateGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  const greetingElement = document.querySelector("#greeting");
  greetingElement.textContent = `${greeting}, Wissy!`;
}

// Initial call to update the greeting
updateGreeting();

// Update the greeting every 5 seconds
setInterval(updateGreeting, 5000);

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
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
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
    li.className = "collection-item cyan";

    // Create textarea element
    const task_input_el = document.createElement("textarea");
    task_input_el.classList.add("text");
    task_input_el.setAttribute("readonly", "readonly");
    task_input_el.appendChild(document.createTextNode(note));

    // Create edit button
    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    // Create delete button
    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    // Append elements to li tag
    li.appendChild(task_input_el);
    li.appendChild(task_edit_el);
    li.appendChild(task_delete_el);

    // Append li to ul
    taskList.appendChild(li);

    // Edit button event listener
    task_edit_el.addEventListener("click", function (e) {
      if (task_edit_el.innerText.toLowerCase() === "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
        const newContent = task_input_el.value;
        const taskIndex = Array.from(taskList.children).indexOf(li);
        updateTaskInLocalStorage(taskIndex, newContent);
      }
      e.preventDefault();
    });
    // Delete button event listener
    task_delete_el.addEventListener("click", function (e) {
      removeTaskFromLocalStorage(li);
      taskList.removeChild(li);
      e.preventDefault();
    });
    const listItems = document.querySelectorAll("li");

    editModal(listItems);
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
  task_edit_el.addEventListener("click", function (e) {
    if (this.innerText.toLowerCase() == "edit") {
      this.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      this.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
      const listItem = this.parentElement;
      const newContent = task_input_el.value;
      const taskIndex = Array.from(taskList.children).indexOf(listItem);
      updateTaskInLocalStorage(taskIndex, newContent);
    }
    e.preventDefault();
  });

  // Delete button event listener
  task_delete_el.addEventListener("click", function (e) {
    removeTaskFromLocalStorage(li);
    taskList.removeChild(li);
    e.preventDefault();
  });
  const listItems = document.querySelectorAll("li");

  editModal(listItems);
}
function editModal(listItems) {
  listItems.forEach(function (listItem) {
    listItem.addEventListener("click", function () {
      // Clone the value of the textarea
      const listItemTextarea = this.querySelector("textarea.text");
      const textareaValue = listItemTextarea.value;
      const modalTextarea = document.querySelector("#modal-textarea");
      modalTextarea.value = textareaValue;

      // Show the modal
      const modal = document.querySelector("#modal");
      const modalContent = document.querySelector(".modal-content");
      modal.style.display = "flex";
    });
    // Select the close button of the modal
    const closeButton = document.querySelector(".close");
    // Add click event listener to the close button
    closeButton.addEventListener("click", function () {
      // Hide the modal
      const modal = document.querySelector("#modal");
      modal.style.display = "none";
    });
  });
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
    // if (confirm("Are you sure you want to delete all permanently?")) {
    taskList.removeChild(taskList.firstChild);
    // }
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
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
}
// Select all listItem elements
const listItems = document.querySelectorAll(".collection-item");

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
