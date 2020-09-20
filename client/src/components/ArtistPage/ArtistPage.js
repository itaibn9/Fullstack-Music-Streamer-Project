import React from 'react';
import './ArtistPage.css';
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';

function ArtistPage() {
    return (
        <div className="artistPage">
            <TitleBlock />
            <SongRow />
            <SongRow />
            <SongRow />
            <SongRow />
        </div>
    )
}

export default ArtistPage;
