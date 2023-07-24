// THIS IS FOR CALLBACK FUNCTIONS
// const posts = [
//   {
//     title: "Post One",
//     body: "This is post One.",
//   },
//   {
//     title: "Post Two",
//     body: "This is post two.",
//   },
// ];
// function createPosts(post, callback) {
//   setTimeout(() => {
//     posts.push(post);
//     callback();
//   }, 1000);
// }
// function getPosts() {
//   setTimeout(() => {
//     let output = "";
//     // for each string in the array above we pass the content into a list item and p tag for title and body respectively. we will call on the  parameter- get used below to get the string of the variables- title and body
//     posts.forEach(function (get) {
//       output += ` <li>${get.title}</li> <p>${get.body}</p>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// }
// createPosts({ title: "Post three", body: "This is post three" }, getPosts);

// THIS IS FOR PROMISES
const posts = [
  {
    title: "Post One",
    body: "This is post One.",
  },
  {
    title: "Post Two",
    body: "This is post two.",
  },
];
function createPosts(post) {
  // this is the standard snippet for calling promises. RESOLVE- IS WHAT WE WANT TO CALL ON WHEN WE ARE DONE WHILE REJECT IS WHAT WE WANT TO THROW AS AN ERROR
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      // we assign an error for the promise to catch if one occurs, true or false is what we use
      const error = false;
      if (!error) {
        // resolve replaces callback in XHR here
        resolve();
        console.log(post["body"]);
      } else {
        // reject calls on error if any
        reject("ERROR: SOMETHING WENT WRONG!");
      }
    }, 2000);
  });
}
function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach(function (get) {
      output += ` <li>${get.title}</li> <p>${get.body}</p>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}
createPosts({ title: "Post three", body: "This is post three." })
  // this is the function to execute when a promise is accepted or is succesfull
  .then(getPosts)
  // this is the function to execute when a promise is rejected
  // we pass in a function that contains a parameter- which is the callback to execute when error occurs. The content in the function is what the promise executes to complete the callback
  .catch(function (err) {
    console.log(err);
  });
