class httplib {
  // we will make a http get request - get here is the constructor
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        callback(null, xhr.responseText);
      } else {
        // we will return Error and status of the response if error occurs. E.g Error: 404
        callback("Error:" + xhr.status);
      }
    };
    xhr.send();
  } // we will make a http post request
  //   we pass in the data parameter below cos every HTTP POST REQUEST REQUIRES DATA
  post(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "app/json; charset= UTF-8");
    xhr.onload = function () {
      callback(null, xhr.responseText);
    };
    // we have to pass the data from post through JSON.stringify(as the name implies JSON.stringify passes a JSON object as a string to the output)
    xhr.send(JSON.stringify(data));
  }
  // we will make a http put request
  put(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.send();
  }
  // we will make a http delete request
  delete(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.send();
  }
}
