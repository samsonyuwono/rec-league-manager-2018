const initialState = {
  name: "",
  height: 0,
  weight: 0,
  image_url: "",
  likes: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATED_PLAYER_FORM":
      return action.playerFormData;

    case "RESET_PLAYER_FORM":
      debugger;
      return initialState;

    default:
      return state;
  }
};
