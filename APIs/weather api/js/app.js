const ui = new wissyUI();
const weather = new getWeather("california", +1);
weather.changeLocation("uyo", +234);
// event listener that loads this function below immediately the window loads. This helps even when the LS alreasy has the location
document.addEventListener("DOMContentLoaded", getWeatherData);
function getWeatherData() {
  weather
    .weatherApi()
    .then((weatherData) => {
      console.log(weatherData);
      // console.log(weatherData.main);
      if (weatherData.message === "city not found") {
        const errorBox = document.createElement("div");
        errorBox.className =
          "alert block fs-5 text-center d-flex justify-content-sm-between";
        errorBox.style.background = "red";
        errorBox.style.color = "white";
        errorBox.style.width = "25rem";
        errorBox.textContent = "Please enter a valid city!";
        const container = document.querySelector(".container");
        const header = document.querySelector("#header");
        container.insertBefore(errorBox, header);
      } else {
        ui.displayUI(weatherData);
      }
    })
    .catch((error) => console.log(error));
}
