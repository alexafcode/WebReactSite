const constants = {
  tokenKey: "auth"
};

export default {
  saveAuth: (userName, token, isAdmin) => {
    localStorage.setItem(
      constants.tokenKey,
      JSON.stringify({
        userName: userName,
        access_token: token,
        isAdmin: (isAdmin = false)
      })
    );
  },

  clearAuth: () => {
    localStorage.removeItem(constants.tokenKey);
  },

  getLogin: () => {
    let item = localStorage.getItem(constants.tokenKey);
    let login = "";
    if (item) {
      login = JSON.parse(item).userName;
    }
    return login;
  },

  isAuthenticated: () => {
    let item = localStorage.getItem(constants.tokenKey);
    if (item) {
      return true;
    } else {
      return false;
    }
  },

  getToken: () => {
    let item = localStorage.getItem(constants.tokenKey);
    let token = null;
    if (item) {
      token = JSON.parse(item).access_token;
    }
    return token;
  }
};
