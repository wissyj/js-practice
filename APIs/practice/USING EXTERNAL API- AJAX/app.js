document.getElementById("jokesBtn").addEventListener("click", loadJokes);
// const number = document.getElementById("jokesBox").value;
function loadJokes(e) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.chucknorris.io/jokes/random`, true);
  xhr.onload = function () {
    if (this.status === 200) {
      const customers = JSON.parse(this.responseText);

      const output = `<li> ${customers.value}</li>`;
      console.log(output);
      document.getElementById("jokes").innerHTML = output;
    }
  };
  xhr.send();
  e.preventDefault();
}
