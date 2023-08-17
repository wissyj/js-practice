// we create two ui classes here. One for the dark theme and one for the light theme. Then, we create an event listener that calls on either of them on click

// also create a home screen as the index.html page using the inspiration beside the screen and weather section as in the dark themed pic as a different page
class wissyUI {
  constructor() {
    function getFormattedTimeInWords() {
      const now = new Date();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hour = now.getHours();
      const minute = now.getMinutes();

      let timeInWords = "";

      if (hour === 0) {
        timeInWords += "12";
      } else if (hour <= 12) {
        timeInWords += hour;
      } else {
        timeInWords += hour - 12;
      }

      timeInWords += ":" + String(minute).padStart(2, "0");
      timeInWords += " " + (hour < 12 ? "AM" : "PM");

      const dateInWords = `${days[now.getDay()]}, ${month} ${day}, ${year}`;
      return { date: dateInWords, time: timeInWords };
    }

    function updateClock() {
      const { date, time } = getFormattedTimeInWords();
      const timeText = document.getElementById("time");
      const dateText = document.getElementById("date");
      timeText.innerText = time;
      timeText.style.fontSize = "3rem";
      dateText.innerText = date;
    }

    // Call updateClock() initially to display the current time.
    updateClock();

    // Call updateClock() every one second to update the time.
    setInterval(updateClock, 1000);
    // show and hide nav event listener
    const navMenu = document.getElementById("nav-menu");
    const menu = document.getElementById("menu-toggler");
    const close = document.getElementById("close");
    const appDrawer = document.getElementById("app-drawer");
    menu.addEventListener("click", show_nav);
    close.addEventListener("click", hide_nav);

    // show and hide nav function
    function show_nav() {
      if ((navMenu.style.display = "none")) {
        navMenu.style.display = "flex";
        menu.style.display = "none";
        close.style.display = "block";
        appDrawer.classList.add("open");
      }
    }
    function hide_nav() {
      if ((navMenu.style.display = "block")) {
        navMenu.style.display = "none";
        menu.style.display = "";
        close.style.display = "none";
      }
    }
    // button toggler
    const buttonToogler = document.querySelector(".adl-toggle");
    buttonToogler.addEventListener("click", function (e) {
      document.getElementById("dropdown").classList.add("open");
      buttonToogler.innerHTML = `<svg id='closeDropdown' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`;
      if (
        buttonToogler.innerHTML ==
        `<svg id='closeDropdown' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`
      ) {
        // document.getElementById("dropdown").classList.remove("open");
        console.log("heyyy");
      }
    });
    // Function to display due time and to-do list from LocalStorage
    function displayTodoList() {
      const todoListElement = document.getElementById("todo-list");

      const savedTasks = JSON.parse(localStorage.getItem("todoList"));

      if (savedTasks && Array.isArray(savedTasks) && savedTasks.length > 0) {
        const savedTasks = JSON.parse(localStorage.getItem("todoList"));
        if (savedTasks) {
          savedTasks.forEach((savedTask) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item list";
            const { task, dueTime } = savedTask;
            const dueDateTime = new Date(dueTime);
            const currentTime = new Date();
            const timeDifference =
              dueDateTime.getTime() - currentTime.getTime();
            if (timeDifference < 0) {
              listItem.innerHTML = `
                <span id="due-time" class="badge badge-secondary text-warning bg-dark px-1 mx-2">Time has elapsed!!!</span>${task}
            `;
              todoListElement.appendChild(listItem);
            } else {
              listItem.innerHTML = `
            <span id="due-time" class="badge badge-secondary text-white bg-dark px-1 mx-2">${dueDateTime.toLocaleString()}</span>${task}
          `;
              todoListElement.appendChild(listItem);
            }
          });
          if (savedTasks.length > 3) {
            const listItem_last = document.createElement("li");
            listItem_last.className = "list-group-item";
            listItem_last.innerHTML = `<a href="./notes.html">+ ${
              savedTasks.length - 3
            } more tasks</a> `;
            todoListElement.appendChild(listItem_last);
          }
        }
      } else {
        todoListElement.innerHTML = `<li class="list-group-item"> No tasks in the to-do list.</li>`;
      }
    }
    // setInterval(displayTodoList, 5000);
    // Call the displayTodoList function on DOM load
    document.addEventListener("DOMContentLoaded", displayTodoList);

    this.city = document.getElementById("city");
    this.country = document.getElementById("country");
    this.weatherImg = document.querySelector(".weather-img");
    this.weatherDescription = document.querySelector(".weather-description");
    this.weatherTemp = document.querySelector(".weather-degree");
  }
  displayUI(data) {
    this.weatherImg.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;
    this.weatherDescription.textContent = ` ${data.weather[0].description}
    `;
    this.weatherTemp.innerHTML = `${data.main.temp} <sup>o</sup>C
    `;
    this.city.innerHTML = `${data.name}
    `;
    this.country.innerHTML = `${data.sys.country}
    `;
  }
}
