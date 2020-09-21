import React, { useState, useEffect } from 'react';
import SquareRow from '../shared_components/SqaureRow/SquareRow';
import './SearchPage.css';
function SearchPage() {
const [searchInput, setSearchInput] = useState("");

    const filterBySearch = (title) => {
        setSearchInput(title);
      };




    return (
        <div className="searchPage">
            <h1>Enter Your Search</h1>
            <div className="form__group field">
            <input onChange={(event) => filterBySearch(event.target.value)} className="form__field" placeholder="Search" required/>
            <label className="form__label">Search</label>
            </div>
            <div className="searchPage__topTen">
            <h2>Songs By Search</h2>
            <SquareRow table={'song'} page={'song'} searchBy={searchInput} />
            </div>
            <div className="searchPage__topTen">
            <h2>Playlists By Search</h2>
            <SquareRow table={'playlist'}  page={'playlist'} searchBy={searchInput}/>
            </div>
            <div className="searchPage__topTen">
            <h2>Albums By Search</h2>
            <SquareRow table={'album'}  page={'album'} searchBy={searchInput}/>
            </div>
            <div className="searchPage__topTen">
            <h2>Artists By Search</h2>
            <SquareRow table={'artist'}  page={'artist'} searchBy={searchInput}/>    
        </div>
        </div>
    )
}

export default SearchPage;
