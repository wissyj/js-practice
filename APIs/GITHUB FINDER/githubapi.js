class githubFinder {
  constructor() {
    this.client_id = "3234343423434324";
    this.client_secret = "334545545454543449534";
  }
  async get(user) {
    const profileUrl = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const profile = await profileUrl.json();
    return { profile };
  }
}
