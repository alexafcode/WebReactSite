const constants = {
  tokenKey: "auth"
};

export default {
  urlConstants: {
    singInUrl: "api/user/signin",
    signUpUrl: "api/user/create"
  },
  saveAuth: (userName, token, isAdmin = false, email) => {
    localStorage.setItem(
      constants.tokenKey,
      JSON.stringify({
        userName: userName,
        access_token: token,
        isAdmin: isAdmin,
        email: email
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

  getEmail: () => {
    let item = localStorage.getItem(constants.tokenKey);
    let email = "";
    if (item) {
      email = JSON.parse(item).email;
    }
    return email;
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
