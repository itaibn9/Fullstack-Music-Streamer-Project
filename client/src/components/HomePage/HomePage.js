import React, { useEffect } from 'react';
import SquareRow from '../shared_components/SqaureRow/SquareRow';
import './HomePage.css';
import { Mix } from '../../services/AnalyticsManager';
function HomePage() {
  useEffect(() => {
    Mix.track('App launched',{"Changed page": "Home Page"});
  }, [])
  return (
<div className="homePage">
    <div className="homePage__Welcome">
        <h1>Hello to my music-app</h1>
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Songs</h2>
    <SquareRow table={'song'} page={'song'} />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Playlists</h2>
    <SquareRow table={'playlist'}  page={'playlist'} />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Albums</h2>
    <SquareRow table={'album'}  page={'album'} />
    </div>
    <div className="homePage__topTen">
    <h2>Top 10 Artists</h2>
    <SquareRow table={'artist'}  page={'artist'} />
    </div>
</div>
  );
}

export default React.memo(HomePage);