export const updateTeamFormData = teamFormData => {
  console.log(teamFormData);
  return {
    type: "UPDATED_DATA",
    teamFormData
  };
};

export const resetTeamForm = () => {
  return {
    type: "RESET_TEAM_FORM"
  };
};
