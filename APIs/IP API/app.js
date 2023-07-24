document.getElementById("button").addEventListener("click", getIPapi);
function getIPapi() {
  fetch("https://ipapi.co/json")
    .then((res) => res.json())
    .then(function (data) {
      output = `<ul><h5>YOUR IP INFORMATION</h5><li>City: ${data.city}</li><li>IP Code: ${data.ip}</li><li>IP Network: ${data.network}</li><li>Country Name: ${data.country_name}</li><li>Country Capital: ${data.country_capital}</li><li>Country Call Code: ${data.country_calling_code}</li><li>Country Longitude: ${data.longitude}</li><li>Country Latitude: ${data.latitude}</li><li>Currency Code: ${data.currency}</li><li>Currency Name: ${data.currency_name}</li><li>Continent Code: ${data.continent_code}</li><li>Timezone: ${data.timezone}</li><li>Universal Time Offset: ${data.utc_offset}</li><li>Network Provider: ${data.org}</li><li>ASN: ${data.asn}</li></ul>`;
      document.getElementById("output").innerHTML = output;
    })
    .catch((err) => console.log(err));
}
