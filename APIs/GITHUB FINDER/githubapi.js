class githubFinder {
  constructor() {
    // pass in the client id and secret that was given by github and is neccessary to authenticate your api call
    this.client_id = "5c7512c352af841e7513";
    this.client_secret = "7de451f57142551e5841dece680b01516752b407";
    // this is neccessary to sort last six(6)  repos of the github user
    this.repos_count = 6;
    this.recent_sort = "created:asc";
  }
  async get(user) {
    const profileUrl = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const ReposUrl = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const profile = await profileUrl.json();
    const repos = await ReposUrl.json();
    return { profile, repos };
  }
}
