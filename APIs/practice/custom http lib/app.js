// we will instantiate/ call the httplib function from httplib.js here in app.js
const myhttpLib = new httplib();
// we will now assign the url for the get constructor in httplib.js to myhttplib and create a callback function
// GET REQUEST
//  in get constructor we have - get(url, callback), we will replicate the same here to
myhttpLib.get("data.json", function (error, response) {
  //   we can now console.log the parameter response cos it represents the callback function in httplib.js and the callback function contains the responsetext for the http GET request
  if (error) {
    console.log(error);
  } else {
    // you must use JSON.parse to pass the json string as a javascript object. This will not be neccessary if we are calling on an external API cos they are all different
    const data = JSON.parse(response);
    console.log(data);
    console.log(data[2]);
    console.log(data[1]["title"]);
  }
});
// create new post
const newPost = {
  userid: 10,
  id: 31,
  title: "Hey buddy",
  body: " wassup today?",
};

// POST REQUEST
// POST request contains these  PATH TO ADD THE NEW DATA , DATA TO BE ADDED, A CALLBACK FUNCTION IF NEEDED as stated below
myhttpLib.post("data.json", newPost, function (error, newPost) {
  if (error) {
    console.log(error);
  } else {
    console.log(newPost);
  }
});
