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
  greetingElement.textContent = `${greeting}, User!`;
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
    const task_input_el = document.createElement("div");
    task_input_el.classList.add("text");
    task_input_el.setAttribute("readonly", "readonly");
    // extract only the note variable in each object in the array represented with the parameter - note as seen above
    task_input_el.appendChild(document.createTextNode(note.note));

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
        const newContent = task_input_el.textContent;
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
    const listItems = document.querySelectorAll(
      "#task-form .collection .collection-item"
    );

    editModal(listItems);
  });
}

// Function to load the saved to-do list from LocalStorage
function loadTodoList() {
  const savedTasks = JSON.parse(localStorage.getItem("todoList"));
  if (savedTasks) {
    const todoList = document.getElementById("todo-list");
    savedTasks.forEach((savedTask) => {
      const listItem = document.createElement("li");
      listItem.className = "collection-item todo-item";
      const { task, dueTime } = savedTask;
      const dueDateTime = new Date(dueTime);
      const currentTime = new Date();
      const timeDifference = dueDateTime.getTime() - currentTime.getTime();
      const remainingSeconds = Math.floor(timeDifference / 1000);
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingDays = Math.floor(remainingHours / 24);

      if (timeDifference < 0) {
        listItem.innerHTML = `
        <span class="title grey-text">${task}</span>
        <p class="dueTime ">${dueDateTime.toLocaleString()}</p>
        <span class="remaining">Event Ended!!!</span><br>
        <button class="delete">Delete</button>
      `;
        const deleteBtn = listItem.querySelector(".delete");
        deleteBtn.addEventListener("click", function (e) {
          console.log("right!!");
          removeTodoFromLS(listItem);
          todoList.removeChild(listItem);
          e.preventDefault();
        });
        todoList.appendChild(listItem);
      } else {
        listItem.innerHTML = `
        <label>
        <input type="checkbox" class="filled-in" />
        <div class="title  ">${task}</div>
      </label>
      <p class="dueTime mx-1">${dueDateTime.toLocaleString()}</p>
      <span class="remaining">Remaining: ${remainingDays} days, ${
          remainingHours % 60
        } hours, ${remainingMinutes % 60} minutes, ${
          remainingSeconds % 60
        } seconds
        </span><br>
      <button class="delete">Delete</button>
      `;
        todoList.appendChild(listItem);
        // Delete button event listener
        const deleteBtn = listItem.querySelector(".delete");
        deleteBtn.addEventListener("click", function (e) {
          console.log("right!!");
          removeTodoFromLS(listItem);
          todoList.removeChild(listItem);
          e.preventDefault();
        });
      }
    });
  }
}

// Load the saved to-do list every time page loads
// store task in LS
loadTodoList();
// add task event
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a Task");
    form.removeEventListener(addTask);
  }
  // create UI elements
  const listItem = document.createElement("li");
  // input in li tag
  const task_input_el = document.createElement("div");
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
  // edit button event listener
  task_edit_el.addEventListener("click", function (e) {
    if (this.innerText.toLowerCase() == "edit") {
      this.innerText = "Save";
      task_input_el.removeAttribute("readonly");
      task_input_el.focus();
    } else {
      // try removing the click button event and use an event that listeners for addition of a character, just like google notes and vs code
      this.innerText = "Edit";
      task_input_el.setAttribute("readonly", "readonly");
      const listItem = this.parentElement;
      const newContent = task_input_el.textContent;
      const taskIndex = Array.from(taskList.children).indexOf(listItem);
      updateTaskInLocalStorage(taskIndex, newContent);
    }
    e.preventDefault();
  });

  // Delete button event listener
  task_delete_el.addEventListener("click", function (e) {
    removeTaskFromLocalStorage(listItem);
    taskList.removeChild(listItem);
    e.preventDefault();
  });
}
function editModal(listItems) {
  listItems.forEach(function (listItem) {
    listItem.addEventListener("dblclick", function () {
      // Clone the value of the textarea
      const listItemTextarea = this.querySelector("div.text");

      const textareaValue = listItemTextarea.textContent;

      const modalTextarea = document.querySelector("#modal-textarea");
      modalTextarea.value = textareaValue;

      // Show the modal
      const modal = document.querySelector("#modal");
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

// Function to add a task to the to-do list
document.getElementById("add-todo-btn").addEventListener("click", () => {
  const todoInput = document.getElementById("todo-input");
  const dueTimeInput = document.getElementById("due-time-input");
  const task = todoInput.value.trim(); // Trim any leading/trailing whitespaces
  const dueTime = dueTimeInput.value;
  const dueDateTime = new Date(dueTime);
  const currentTime = new Date();
  const timeDifference = dueDateTime.getTime() - currentTime.getTime();
  const remainingSeconds = Math.floor(timeDifference / 1000);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingDays = Math.floor(remainingHours / 24);
  if (task !== "" && dueTime !== "") {
    if (timeDifference < 0) {
      error("Time has passed!!!");
      todoInput.value = "";
      dueTimeInput.value = "";
    } else {
      const todoList = document.getElementById("todo-list");
      const listItem = document.createElement("li");
      listItem.className = "collection-item todo-item";
      listItem.innerHTML = `
      <label>
      <input type="checkbox" class="filled-in" />
      <span class="title">${task}</span>
    </label>
    <p class="dueTime mx-1">${dueDateTime.toLocaleString()}</p>
    <span class="remaining ">Remaining: ${remainingDays} days, ${
        remainingHours % 60
      } hours, ${remainingMinutes % 60} minutes, ${
        remainingSeconds % 60
      } seconds</span><br>
  <button class="delete">Delete</button>
      `;
      todoList.appendChild(listItem);
      // Delete button event listener
      todoList.appendChild(listItem);
      todoInput.value = "";
      dueTimeInput.value = "";
      const deleteBtn = listItem.querySelector(".delete");
      deleteBtn.addEventListener("click", function (e) {
        console.log("right!!!");
        removeTodoFromLS(listItem);
        todoList.removeChild(listItem);
        e.preventDefault();
      });
    }
    // Save the updated to-do list to LocalStorage
    saveTodoList();
  } else {
    error("Please add a task!!!");
  }
});

// save notes in LS
function storeTaskInLocalStorage(note) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  const currentTime = new Date().toISOString(); // Get the current timestamp
  const noteWithTimestamp = { note: note.trim(), timestamp: currentTime }; // Trim any leading/trailing whitespaces in the note
  notes.push(noteWithTimestamp);

  localStorage.setItem("notes", JSON.stringify(notes));
}
// Function to save the to-do list to LocalStorage
function saveTodoList() {
  const todoListItems = document.querySelectorAll("#todo-list li");
  if (todoListItems !== "") {
    const tasks = Array.from(todoListItems).map((item) => {
      const task = item.querySelector(".title").textContent;
      const dueTime = new Date(item.querySelector(".dueTime").textContent);
      // if (
      //   document
      //     .querySelector(".title")
      //     .nextElementSibling.classList.contains("filled-in")
      // ) {
      //   return { task, dueTime, isCompleted };
      // } else {
      //   return { task, dueTime };
      // }
      return { task, dueTime };
    });
    localStorage.setItem("todoList", JSON.stringify(tasks));
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
  notes[taskIndex].note = newContent;
  console.log(newContent);
  console.log(notes[taskIndex].note);
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
  const taskContent = taskItem.querySelector("div.text").textContent;
  const taskIndex = notes.indexOf(taskContent);
  console.log(taskIndex);
  if (taskIndex !== -1) {
    notes.splice(taskIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}
function removeTodoFromLS(todoItem) {
  let todos;
  if (localStorage.getItem("todoList") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todoList"));
  }

  const task = todoItem.querySelector(".title").textContent;
  const dueTime = new Date(todoItem.querySelector(".dueTime").textContent);

  // Find the index of the task in the todos array
  const todoIndex = todos.findIndex((todo) => {
    return (
      todo.task === task &&
      new Date(todo.dueTime).getTime() === dueTime.getTime()
    );
  });

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todos));
  }
}
// clear all tasks
function clearTasks(e) {
  // you can also use - taskList.innerHTML ='' but the one used below has been proved to be faster;
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
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
}
// error box
function error(message) {
  const errorBox = document.createElement("div");
  errorBox.classList = "error red ";
  errorBox.textContent = message;
  const container = document.querySelector(".container");
  const row = document.querySelector(".row");
  container.insertBefore(errorBox, row);
  function clearErrorBox() {
    errorBox.remove();
  }
  setTimeout(clearErrorBox, 3000);
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

// switch tabs in notes page
const notePage = document.getElementById("notes");
const todosPage = document.getElementById("todos");
todosPage.addEventListener("click", function (e) {
  document.querySelector(".card-content").style.display = "none";
  document.querySelector(".card-action .card-title").style.display = "none";
  document.querySelector(".card-action .row").style.display = "none";
  todosPage.classList.add("active");
});
notePage.addEventListener("click", function (e) {
  document.querySelector(".card-action .second").style.display = "none";
  document.getElementById("todo-list").style.display = "none";
  notePage.classList.add("active");
});
// todosPage.addEventListener("click", openTodos);

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
