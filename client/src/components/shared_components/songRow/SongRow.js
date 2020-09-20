import React from 'react'
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
function SongRow() {
    return (
        <div className="songRow">
           <button><img className="control__logo" src={play_logo} alt="play" /></button>
            <p>{songDetials.name}</p>
            <p>{songDetials.artist_name}</p>
           <button><img className="control__logo" src={like_logo} alt="like" /></button>
            <p>{songDetials.length}</p>

        </div>
    )
}

export default SongRow;
