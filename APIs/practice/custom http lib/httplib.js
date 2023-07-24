// USING HTTPREQUEST
// class httplib {
//   // we will make a http get request - get here is the constructor
//   get(url, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onload = function () {
//       if (this.status === 200) {
//         callback(null, xhr.responseText);
//       } else {
//         // we will return Error and status of the response if error occurs. E.g Error: 404
//         callback("Error:" + xhr.status);
//       }
//     };
//     xhr.send();
//   } // we will make a http post request
//   //   we pass in the data parameter below cos every HTTP POST REQUEST REQUIRES DATA
//   post(url, data, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-type", "application/json; charset= UTF-8");
//     xhr.onload = function () {
//       callback(null, xhr.responseText);
//     };
//     // we have to pass the data from post through JSON.stringify(as the name implies JSON.stringify passes a JSON object as a string to the output)
//     xhr.send(JSON.stringify(data));
//   }
//   // we will make a http put request
//   put(url, data, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("PUT", url, true);
//     xhr.setRequestHeader("Content-type", "application/json; charset= UTF-8");
//     xhr.onload = function () {
//       callback(null, xhr.responseText);
//     };
//     // we have to pass the data from post through JSON.stringify(as the name implies JSON.stringify passes a JSON object as a string to the output)
//     xhr.send(data);
//   }
//   // we will make a http delete request
//   delete(url, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("DELETE", url, true);
//     xhr.onload = function () {
//       if (this.status === 200) {
//         callback(null, "Post deleted");
//       } else {
//         // we will return Error and status of the response if error occurs. E.g Error: 404
//         callback("Error:" + xhr.status);
//       }
//     };
//     xhr.send();
//   }
// }
// USING PROMISES AND ARROW FUNCTIONS
// Easy httplib
// @version 2.0.0
// @author Wisdom Johnson
// @ license MIT
// class httplib {
//   // make an HTTP GET request
//   get(url) {
//     // if we want to return the data, we need to declare a new promise
//     return new Promise((resolve, reject) => {
//       fetch(url)
//         // retrieves the promise from the window body object first
//         .then((response) => response.json())
//         // returns the data in the json function into the console
//         .then((data) => resolve(data))
//         .catch((err) => reject(err));
//     });
//   }
//   // data represents the parameter for the new object added to the array
//   post(url, data) {
//     return new Promise((resolve, reject) => {
//       fetch(url, {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(data),
//       })
//         // retrieves the promise from the window body object first
//         .then((response) => response.json())
//         // returns the data in the json function into the console
//         .then((data) => resolve(data))
//         .catch((err) => reject(err));
//     });
//   }
//   put(url, data) {
//     return new Promise((resolve, reject) => {
//       fetch(url, {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify(data),
//       })
//         // retrieves the promise from the window body object first
//         .then((response) => response.json())
//         // returns the data in the json function into the console
//         .then((data) => resolve(data))
//         .catch((err) => reject(err));
//     });
//   }
//   delete(url) {
//     // if we want to return the data, we need to declare a new promise
//     return new Promise((resolve, reject) => {
//       fetch(url, {
//         method: "DELETE",
//         headers: { "Content-type": "application/json" },
//         // NO BODY IS NEEDED SINCE NO DATA IS BEING ADDED OR UPDATED RATHER IT'S BEING DELETED
//       }) // retrieves the promise from the window body object first
//         .then((response) => response.json())
//         // returns the data in the json function into the console
//         // instead of passing data as usual, we pass in a string that is displayed in console if resource is deleted
//         .then((data) => resolve("OTILO..."))
//         .catch((err) => reject(err));
//     });
//   }
// }
// USING ASYNC AND AWAIT
// Easy httplib
// @version 3.0.0
// @author Wisdom Johnson
// @ license MIT
class httplib {
  // make an HTTP GET request
  async get(url) {
    // we do not need to declare a promise here as async already did that
    // await here pauses the operation of the promise till the operation below is complete
    const resp = await fetch(url);
    // there's no need for .then() here due to presence of async and await
    const respData = await resp.json();
    // the operation that needed the pause is completed and we need to return something as a task which in this case is the data extracted from the promise above
    return respData;
  }
  // data represents the parameter for the new object added to the array
  async post(url, data) {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      // we have to stringify the data in this parameter-data to return the JSON object as a string
      body: JSON.stringify(data),
    });
    const respData = await resp.json();
    return respData;
  }
  async put(url, data) {
    const resp = await fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const respData = await resp.json();
    return respData;
  }
  async delete(url) {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      // NO BODY IS NEEDED SINCE NO DATA IS BEING ADDED OR UPDATED RATHER IT'S BEING DELETED
    });
    // retrieves the promise from the window body object first
    const respData = await resp.json();
    return 'respData';
  }
}
