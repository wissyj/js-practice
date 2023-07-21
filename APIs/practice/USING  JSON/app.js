// loads single customer
document.getElementById("button1").addEventListener("click", loadCustomerData);
// loads customers
document.getElementById("button2").addEventListener("click", loadCustomersData);
function loadCustomerData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "customer.json", true);
  xhr.onload = function () {
    if (this.status === 200) {
      // you must use JSON.parse to pass the JSON(which is an object) as a string to the ouput
      const customer = JSON.parse(this.responseText);
      const output = `
     <h5> <ul>
      <li>ID: ${customer.id}</li>
      <li>NAME: ${customer.name}</li>
      <li>PHONE NO.: ${customer.phoneNumber}</li>
      <li>COMPANY: ${customer.company}</li>
      </ul></h5>
      `;
      document.getElementById("button1-text").innerHTML = output;
      console.log(this.responseText);
    }
    console.log("readystate", this.readyState);
  };
  xhr.send();
}

function loadCustomersData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "customers.json", true);
  xhr.onload = function () {
    if (this.status === 200) {
      // you must use JSON.parse to pass the JSON string (which is supposed to be an object) as a object to the ouput
      const customers = JSON.parse(this.responseText);
      //   we use let since we will call on output again
      // we also use let to first call an empty output so that on each iteration below, we append the value of the variable - output below
      let output = "";
      customers.forEach(function (myCustomer) {
        output += `
      <h6> <ul>
       <li>ID: ${myCustomer.id}</li>
      <li>NAME: ${myCustomer.name}</li>
      <li>PHONE NO.: ${myCustomer.phoneNumber}</li>
      <li>COMPANY: ${myCustomer.company}</li>
      </ul></h6>
      `;
        document.getElementById("button2-text").innerHTML = output;
      });
    }
    console.log("readystate", this.readyState);
  };
  xhr.send();
}
