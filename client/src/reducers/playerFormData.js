const initialState = {
  name: '',
  height: 0,
  weight: 0,
  image_url:''
}

export default (state= initialState, action) => {

  switch(action.type) {
    case 'UPDATED_PLAYER_FORM':
      return action.playerFormData;

    case 'RESET_PLAYER_FORM':
      return initialState;

    default:
      return state;
  }
}
