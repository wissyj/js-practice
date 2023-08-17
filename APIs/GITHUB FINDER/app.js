// initiate/instantiate/call the github class from githubapi.js
const github = new githubFinder();
// instantiate githubUi class from the other JS file
const ui = new githubUI();
// assign input box to a variable and event listener
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keyup", (e) => {
  const userText = e.target.value;
  if (userText !== "") {
    // call on http request made on githubapi.js
    // pass in the value of the input box so that it will represent the pareameter- user in githubapi.js
    github.get(userText).then((profileData) => {
      if (profileData.profile.message === "Not Found") {
        const errorBox = document.createElement("div");
        errorBox.className = "alert text-center m-3 ";
        errorBox.innerHTML = ` <div id="error-box" class="mx-auto px-2 py-1 my-2 bg-danger">
        <div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
            </svg></div>
        <p class=""> Error. Please enter a valid username!</p>
    </div>`;
        const container = document.querySelector(".container");
        const box = document.querySelector(".box");
        container.insertBefore(errorBox, box);

        setTimeout(() => {
          document.querySelector(".alert").remove();
        }, 2000);
      } else {
        // show profile from ui.js
        ui.displayProfile(profileData.profile);
        ui.displayRepos(profileData.repos);
      }
    });
  } else {
    document.getElementById("profile").style.display = "none";
  }
});
