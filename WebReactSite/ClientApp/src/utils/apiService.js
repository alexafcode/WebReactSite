export default class ApiService {
  _baseUrl = "api";

  async fetchUrl(url) {
    const response = await fetch(`${this._baseUrl}${url}`);
    if (!response.ok) {
      throw new Error(`Not Fetch, ${response.status}`);
    }
    return await response.json();
  }
  async postUrl(url, data) {
    const response = await fetch(`${this._baseUrl}${url}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Not Fetch, status ${response.status}`);
    }
    return await response.json();
  }

  async signIn(data) {
    const response = await this.postUrl("/user/signin", data);
    return response;
  }
}

//  singInUrl: "api/user/signin",
//   body:JSON.stringify({tittle:tittle, body:body})
