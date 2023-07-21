document.getElementById("button").addEventListener("click", loadData);
function loadData() {
  // instantiate xhr since it's an object
  const XHR = new XMLHttpRequest();
  XHR.open("GET", "data.txt", true);
  console.log("ready state", XHR.readyState);

  //   this elaborates the reason we check for readystate. DON'T USE THIS SYNTAX, JUST FOR LEARNING
  XHR.onreadystatechange = function () {
    console.log("ready state", this.readyState);

    if (this.status === 200 && this.readyState === 4) {
      document.getElementById("dataUI").textContent = this.responseText;
      document.getElementById("dataUI").style.color = "red";
    }
  };
  //   ON PROGRESS -this is used mostly for spinners and loaders
  XHR.onprogress = function () {
    console.log("ready state", this.readyState);

    if (this.status === 200 && this.readyState === 3) {
      document.getElementById("dataUI").textContent = this.responseText;
      document.getElementById("dataUI").style.color = "blue";
    }
  };
  //   ON LOAD- this delivers final results of the API call
  XHR.onload = function () {
    if (this.status === 200 && this.readyState === 4) {
      console.log(this.responseText);
      document.getElementById("dataUI").textContent = this.responseText;
      document.getElementById("dataUI").style.color = "green";
    }
    console.log("ready state", this.readyState);
  };
  //   ON error- this checks if there was error
  XHR.onerror = function () {
    if (this.status === 404) {
      console.log("error");
      console.log("ready state", this.readyState);
    }
  };
  XHR.send();
  //  popular statuses in httprequest. check devdocs for the rest
  // 200- successfull
  // 403- forbidden
  // 404-  not found

  //  popular readystates in httprequest.
  // 0:request not initialized
  // 1:server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready
}
