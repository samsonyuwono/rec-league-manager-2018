import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const Team = props => (
  <div key={props.id} className="team">
    <img
      alt="team_image"
      className="TeamImage"
      src={props.logo_url}
      alt={props.name}
    />
    <div className="teamContent">
      <div className="singleTeamContent">
        <h3>{props.name}</h3>
        <h3>{props.wins}</h3>
        <ReactMarkdown source={props.children} />
      </div>
      <div className="singleCommentButtons" />
    </div>
  </div>
);

Team.propTypes = {
  name: PropTypes.string.isRequired,
  logo_url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};

export default Team;
