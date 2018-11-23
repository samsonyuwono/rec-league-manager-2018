import React from "react";
import { Link } from "react-router-dom";
import TeamWinLoss from "./TeamWinLoss";

const TeamCard = ({ team }) => (
  <div key={team._id} className="TeamCard">
    <h3>{team.name}</h3>
    <img
      className="TeamImage"
      key={team._id}
      src={team.logo_url}
      alt={team.name}
    />
    <div className="card-details">
      <Link className="link-style" to={`/teams/${team._id}`}>
        Roster
      </Link>{" "}
      <Link className="link-style" to={`/teams/${team._id}/edit`}>
        Edit Team
      </Link>{" "}
      <TeamWinLoss team={team._id} wins={team.wins} losses={team.losses} />
    </div>
  </div>
);

export default TeamCard;
