const setAuth = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const removeAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const getAuth = () => {
  const token = localStorage.getItem("accessToken");
  return token ? true : false;
};

export { setAuth, removeAuth, getAuth };
