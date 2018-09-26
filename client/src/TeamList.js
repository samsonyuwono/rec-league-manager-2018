import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Team from "./Team";

const TeamList = props => {
  const teamNodes = props.data.map(team => (
    <Team
      name={team.name}
      key={team._id}
      id={team._id}
      timestamp={team.updatedAt}
    >
      {team.wins} - {team.losses}
    </Team>
  ));
  return <div className="panel-body">{teamNodes}</div>;
};

TeamList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      names: PropTypes.string,
      wins: PropTypes.number,
      losess: PropTypes.number,
      logo_url: PropTypes.string
    })
  )
};

TeamList.defaultProps = {
  data: []
};

export default TeamList;
