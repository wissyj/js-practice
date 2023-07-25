class githubUI {
  constructor() {
    this.profile = document.getElementById("profile");
  }
  displayProfile(userProfile) {
    this.profile.innerHTML = `
    <div class = "bg-transaprent card  card-body mb-3 p-3 w-100">
  <div class="row bg-transparent d-flex align-items-center justify-content-between">
    <ul class=" col-md-4 bg-transparent list-group mb-3">
        <li class=" bg-transparent list-group-items ">Name: ${userProfile.name}</li>
        <li class=" bg-transparent list-group-items ">Public Repos: ${userProfile.public_repos}</li>
        <li class=" bg-transparent list-group-items ">Public Gists: ${userProfile.public_gists}</li>
        <li class=" bg-transparent list-group-items ">Followers: ${userProfile.followers}</li>
        <li class=" bg-transparent list-group-items ">Following:  ${userProfile.following}</li>
    </ul>
    <div class="col-md-4 border-2  bg-transparent text-center">
        <img src="${userProfile.avatar_url}" alt="${userProfile.name}" class="img-fluid mb-2">
        <p class="bio_Data m-2 text-center">${userProfile.bio}</p>
        <a href="${userProfile.html_url}" target="_blank" rel="noopener noreferrer"
            class=" btn bg-transparent profileBtn d-flex justify-content-center m-4">View Profile</a>
    </div>
    <ul class=" col-md-4  list-group bg-transparent px-2">
        <li class=" bg-transparent list-group-items ">Company: ${userProfile.company}</span>
        <li class=" bg-transparent figures list-group-items">Location: ${userProfile.location}</span>
        <li class=" bg-transparent figures list-group-items">Available for Hire: ${userProfile.hireable}</span>
        <li class=" bg-transparent figures ">Website/Blog:  <a href="${userProfile.blog}" target="_blank" rel="noopener noreferrer"
        class=" ">Visit Blog/Website</a> </span>
        <li class=" bg-transparent figures list-group-items">Created At: ${userProfile.created_at}</span>
        <li class=" bg-transparent figures list-group-items">Last updated: ${userProfile.updated_at}</span>
    </ul>
</div>
</div>
    `;
    // const userBio = userProfile.bio;
    // const Available = userProfile.hireable;
    // const userCompany = userProfile.company;
    // const userLocation = userProfile.location;
    // const userBlog = userProfile.blog;
    // if (
    //   userBio === null ||
    //   userBlog === null ||
    //   userCompany === null ||
    //   userLocation === null ||
    //   Available === null
    // ) {
    //   === "Not Available";
    // }
  }
}
