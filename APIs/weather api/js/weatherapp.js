class getWeather {
  constructor(city, countryCode) {
    this.apiKey = "31a6f23dbd207b2e6d2c61803b365e98";
    this.city = city;
    this.countryCode = countryCode;
  }
  async weatherApi() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&exclude=current,hourly,minutely,alerts&units=metric&appid=${this.apiKey}`
    );
    const responseData = await response.json();
    return responseData;
  }
  changeLocation(city, countryCode) {
    // we don't want to hard code city in this place cos we will change it often through the input by the user. Therefore, we pass in the parameter- city and countryCode
    this.city = city;
    this.countryCode = countryCode;
  }
}
