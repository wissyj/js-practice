// getting text content
document.getElementById("button1").addEventListener("click", getTxt);
document.getElementById("button2").addEventListener("click", getJSON);
document.getElementById("button3").addEventListener("click", getExternalAPI);
function getTxt() {
  fetch("sample.txt")
    //   we call on the .then function first to get the type of response we want from the promise. in this case we want .text()
    .then((response) => {
      return response.text();
    })
    // then we call on the response which is an
    .then((data) => {
      console.log(data);
      document.getElementById("output").innerText = data;
    })
    .catch((error) => {
      console.log(error);
    });
}
// function getJSON() {
//   fetch("IP.json")
//     .then((res) => res.json())
//     .then(function (data) {
//       let output = "";
//       data.forEach((post) => {
//         output += `<li>${post.city}</li>`;
//         document.getElementById("output").innerHTML = output;
//       });
//     })
//     .catch((err) => console.log(err));
// }
function getJSON() {
  fetch("sample.json")
    .then((res) => res.json())
    .then(function (data) {
      let output = "";
      data.forEach((post) => {
        output += `<li>${post.body}</li>`;
        document.getElementById("output").innerHTML = output;
      });
    })
    .catch((err) => console.log(err));
}
function getExternalAPI() {
  fetch("https://ipapi.co/json")
    .then((res) => res.json())
    .then(function (data) {
      output = `<ul><h5>YOUR IP INFORMATION</h5><li>City: ${data.city}</li><li>IP Code: ${data.ip}</li><li>IP Network: ${data.network}</li><li>Country Name: ${data.country_name}</li><li>Country Capital: ${data.country_capital}</li><li>Country Call Code: ${data.country_calling_code}</li><li>Currency Code: ${data.currency}</li><li>Currency Name: ${data.currency_name}</li><li>Continent Code: ${data.continent_code}</li><li>Timezone: ${data.timezone}</li><li>Universal Time offset: ${data.utc_offset}</li><li>Network Provider: ${data.org}</li><li>ASN: ${data.asn}</li></ul>`;
      document.getElementById("output").innerHTML = output;
    })
    .catch((err) => console.log(err));
}
