import React from 'react';
import {Link} from 'react-router-dom';
import PlayerLike from './PlayerLike'

const PlayerCard = ({ team, player }) => (
  <div key={player.id} className="PlayerCard">
    <h3>{player.name}</h3>
    <p>Height(cm): {player.height}</p>
    <p>Weight(lb): {player.weight} </p>
    <img className="PlayerImage" src={player.image_url} alt={player.name} />
    <div>
    <Link style={{ marginBottom: '5px'}} to={`/players/${player.id}`}>View Player</Link> <br />
      <Link style={{ marginBottom: '5px'}} to={`/players/${player.id}/edit`}>Edit Player</Link> <br />
      <PlayerLike player={player.id} likes={player.likes}/>
    </div>
  </div>
)


export default PlayerCard;
