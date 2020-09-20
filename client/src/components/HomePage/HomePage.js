import React from 'react';
import SquareRow from '../shared_components/SqaureRow/SquareRow';
import './HomePage.css';
function HomePage() {
  return (
<div className="homePage">
    <div className="homePage__Welcome">
        <h1>Hello to my music-app</h1>
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Songs</h2>
    <SquareRow />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Playlists</h2>
    <SquareRow />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Albums</h2>
    <SquareRow />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Artists</h2>
    <SquareRow />
    </div>
</div>
  );
}

export default HomePage;