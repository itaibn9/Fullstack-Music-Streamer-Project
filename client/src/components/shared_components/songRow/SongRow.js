import React from 'react'
import { Link } from "react-router-dom";
import play_logo from './play_logo.png';
import like_logo from './like_logo.png';
import './SongRow.css';

const songDetials = {
    name:'my name is',
    youtubeLink: 'sNPnbI1arSE',
    artist_name: 'eminem',
    likes:'250',
    uploaded_at:"2002-05-17",
    length: "03:31"
};
function SongRow({name, length, artist, songID}) {

    return (
        <div className="songRow">
            <Link className="play_logo" to={`/song/${songID}`}>
           <button><img className="control__logo" src={play_logo} alt="play" /></button>
           </Link>
            <p>{name}</p>
            <p>{artist}</p>
           <button><img className="control__logo" src={like_logo} alt="like" /></button>
            <p>{length}</p>

        </div>
    )
}

export default SongRow;
