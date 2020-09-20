import React from 'react';
import './AlbumPage.css';
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';

function AlbumPage() {
    return (
        <div className="albumPage">
            <TitleBlock />
            <SongRow />
            <SongRow />
            <SongRow />
            <SongRow />
        </div>
    )
}

export default AlbumPage;
