export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = decoded => {
  return {
    type: "LOGOUT_USER",
    payload: decoded
  };
};
