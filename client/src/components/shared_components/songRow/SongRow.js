import React from 'react'
import { Link } from "react-router-dom";
import play_logo from './play_logo.png';
import like_logo from './like_logo.png';
import './SongRow.css';

function SongRow({name, length, artist, songID, type, typeID, refresh}) {
console.log(songID);
console.log(typeID);
console.log(type);
    return (
        <div className="songRow">
            <Link className="play_logo" to={`/api/song/${songID}?${type}=${typeID}`}>
           <button onClick ={() => refresh ? refresh() : null}><img className="control__logo" src={play_logo} alt="play" /></button>
           </Link>
            <p>{name}</p>
            <p>{artist}</p>
           <button onClick={() => alert("In development..")}><img className="control__logo" src={like_logo} alt="like" /></button>
            <p>{length}</p>
        </div>
    )
}

export default SongRow;
