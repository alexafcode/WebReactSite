const constants = {
  tokenKey: "auth",
  defaultImageSrc:
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/128x128/plain/user.png"
};

export default {
  urlConstants: {
    singInUrl: "api/user/signin",
    signUpUrl: "api/user/create",
    uploadAvatarUrl: "api/user/upload",
    refreshToken: "api/user/refresh"
  },
  saveAuth: options => {
    const {
      userName,
      token,
      isAdmin = false,
      email,
      userAvatar = constants.defaultImageSrc,
      refToken
    } = options;
    setLS(
      JSON.stringify({
        userName,
        access_token: token,
        isAdmin,
        email,
        userAvatar,
        refToken
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
  getrefToken: () => {
    const item = getLS();
    let refToken = "";
    if (item) {
      refToken = JSON.parse(item).refToken;
    }
    return refToken;
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
  },

  getUserAvatar: () => {
    const item = getLS();
    let image = null;
    if (item) {
      image = JSON.parse(item).userAvatar;
      if (image) {
        return image;
      } else {
        return constants.defaultImageSrc;
      }
    }
  },
  getDefaultUserAvatar: () => {
    return constants.defaultImageSrc;
  },
  updateUserInfo: (changeData, key) => {
    const item = getLS();
    if (item) {
      const data = JSON.parse(item);
      data[key] = changeData;
      setLS(JSON.stringify(data));
    }
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
