// initiate/instantiate/call the github class from githubapi.js
const github = new githubFinder();
// assign input box to a variable and event listener
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keyup", (e) => {
  const userText = e.target.value;
  if (userText !== "") {
    // call on http request made on githubapi.js
    console.log(userText);
    // pass in the value of the input box so that it will represent the pareameter- user in githubapi.js
    github.get(userText).then((data) => console.log(data));
  } else {
    console.log("Go and do your duty");
  }
});
