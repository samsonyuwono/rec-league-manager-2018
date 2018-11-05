export const updatePlayerFormData = playerFormData => {
  console.log(playerFormData);
  return {
    type: "UPDATED_PLAYER_FORM",
    playerFormData
  };
};

export const resetPlayerForm = () => {
  return {
    type: "RESET_PLAYER_FORM"
  };
};
