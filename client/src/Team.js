import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const Team = props => (
  <div key={props._id} className="team">
    <img
      alt="team_image"
      className="TeamImage"
      src={props.logo_url}
      alt={props.name}
    />
    <div className="teamContent">
      <div className="singleTeamContent">
        <h3>{props.name}</h3>
        <h3>{props.children}</h3>
      </div>
      <div className="singleTeamButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
        <button>
          <a
            onClick={() => {
              props.handleUpdateTeam(props._id);
            }}
          >
            update
          </a>
        </button>
        <button>
          <a
            onClick={() => {
              props.handleDeleteTeam(props._id);
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
