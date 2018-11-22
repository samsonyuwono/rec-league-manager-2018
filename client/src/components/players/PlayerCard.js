import React from "react";
import { Link } from "react-router-dom";
import PlayerLike from "./PlayerLike";

const PlayerCard = ({ team, player }) => (
  <div key={player._id} className="PlayerCard">
    <h3>{player.name}</h3>
    <p>Height(cm): {player.height}</p>
    <p>Weight(lb): {player.weight} </p>
    <img className="PlayerImage" src={player.image_url} alt={player.name} />
    <div className="card-details">
      <Link className="link-style" to={`/players/${player._id}`}>
        View Player
      </Link>{" "}
      <Link className="link-style" to={`/players/${player._id}/edit`}>
        Edit Player
      </Link>{" "}
      <PlayerLike player={player._id} likes={player.likes} />
    </div>
  </div>
);

export default PlayerCard;
