import React from "react";
import { Link } from "react-router-dom";
import TeamWinLoss from "./TeamWinLoss";

const TeamCard = ({ team }) => (
  <div key={team.id} className="TeamCard">
    <h3>{team.name}</h3>
    <img
      className="TeamImage"
      key={team.id}
      src={team.logo_url}
      alt={team.name}
    />
    <div>
      <Link style={{ marginBottom: "5px" }} to={`/teams/${team.id}`}>
        Roster
      </Link>{" "}
      <br />
      <Link style={{ marginBottom: "5px" }} to={`/teams/${team.id}/edit`}>
        Edit Team
      </Link>{" "}
      <br />
      <TeamWinLoss team={team.id} wins={team.wins} losses={team.losses} />
    </div>
  </div>
);

export default TeamCard;
