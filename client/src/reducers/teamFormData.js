const initialState = {
  name: "",
  wins: 0,
  losses: 0,
  logo_url: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATED_DATA":
      console.log(action.teamFormData);
      return action.teamFormData;

    case "RESET_TEAM_FORM":
      return initialState;

    default:
      return state;
  }
};
