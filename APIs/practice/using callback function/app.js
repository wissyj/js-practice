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
function createPosts(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}
function getPosts() {
  setTimeout(() => {
    let output = "";
    // for each string in the array above we pass the content into a list item and p tag for title and body respectively. we will call on the  parameter- get used below to get the string of the variables- title and body
    posts.forEach(function (get) {
      output += ` <li>${get.title}</li> <p>${get.body}</p>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}
createPosts({ title: "Post three", body: "This is post three" }, getPosts);
