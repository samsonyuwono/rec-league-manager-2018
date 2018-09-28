import React from "react";
import moment from "moment";
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
        <h3>{props.wins}</h3>
        <h3>{props.wins}</h3>
        <h3>{props.losses}</h3>
      </div>
      <div className="singleTeamButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
        <button>
          <a
            onClick={() => {
              props.handleUpdateTeam(props.id);
            }}
          >
            update
          </a>
        </button>
        <button>
          <a
            onClick={() => {
              props.handleDeleTeam(props.id);
            }}
          >
            delete
          </a>
        </button>
      </div>
    </div>
  </div>
);

Team.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  handleUpdateTeam: PropTypes.func.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired
};

export default Team;
