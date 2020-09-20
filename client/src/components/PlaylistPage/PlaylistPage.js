import React from 'react';
import './PlaylistPage.css';
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';

function PlaylistPage() {
    return (
        <div className="playlistPage">
        <TitleBlock />
        <SongRow />
        <SongRow />
        <SongRow />
        <SongRow />
    </div>
    )
}

export default PlaylistPage;
