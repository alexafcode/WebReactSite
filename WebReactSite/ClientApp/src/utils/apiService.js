import authHelpers from "./authHelpers";

export default class ApiService {
  _baseUrl = "api";

  fetchUrl = async url => {
    const response = await fetch(`${this._baseUrl}${url}`);
    if (!response.ok) {
      //ToDo Message
      throw new Error(`Not Fetch, ${response.status}`);
    }
    return await response.json();
  };

  postUrl = async (url, data) => {
    const response = await fetch(`${this._baseUrl}${url}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`No User, status ${response.status}`);
    }
    const json = await response.json();
    return json;
  };

  signIn = async data => {
    const response = await this.postUrl("/user/signin", data);
    return this._transformUser(response);
  };

  signUp = async data => {
    const response = await this.postUrl("/user/create", data);
    return this._transformUser(response);
  };
  _transformUser = data => {
    const { user, token, isAdmin, email, refToken } = data;
    const userAvatar =
      data.userAvatar === undefined || !data.userAvatar
        ? authHelpers.getDefaultUserAvatar()
        : data.userAvatar;
    return { user, token, isAdmin, email, userAvatar, refToken };
  };
}
