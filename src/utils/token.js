const token = () => {
  const tokenAuth = localStorage.getItem("token");
  return tokenAuth;
};

export default token;
