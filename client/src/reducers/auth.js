const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: true,
        user: action.payload.username
      };
    case "LOGOUT_USER":
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
};
