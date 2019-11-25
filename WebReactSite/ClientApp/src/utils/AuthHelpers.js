const constants = {
  tokenKey: "auth"
};

export default {
  urlConstants: {
    singInUrl: "api/user/signin",
    signUpUrl: "api/user/create"
  },
  saveAuth: (userName, token, isAdmin = false, email) => {
    setLS(
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
    const item = getLS();
    let login = "";
    if (item) {
      login = JSON.parse(item).userName;
    }
    return login;
  },

  getEmail: () => {
    const item = getLS();
    let email = "";
    if (item) {
      email = JSON.parse(item).email;
    }
    return email;
  },

  isAuthenticated: () => {
    const item = getLS();
    if (item) {
      return true;
    } else {
      return false;
    }
  },

  isAdmin: () => {
    const item = getLS();
    if (item) {
      const isAdmin = JSON.parse(item).isAdmin;
      if (isAdmin) {
        return true;
      }
    }
    return false;
  },

  getToken: () => {
    const item = getLS();
    let token = null;
    if (item) {
      token = JSON.parse(item).access_token;
    }
    return token;
  }
};
const getLS = () => {
  let item;
  try {
    item = localStorage.getItem(constants.tokenKey);
    if (item) return item;
  } catch (e) {
    console.log(e);
  }
  return null;
};
const setLS = data => {
  try {
    localStorage.setItem(constants.tokenKey, data);
  } catch (e) {
    console.log(e);
  }
};
