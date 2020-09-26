import React from 'react';
import './AddArtistPage.css';
function AddArtistPage() {
    const postArtist = ()=>{
        return true
    }
    return (
        <form className="artistAddPage">
            <div className="form__group field">
            <input className="form__field" placeholder="Artist name" required/>
            <label className="form__label">Artist name</label>
            </div>
            <div className="form__group field">
            <input className="form__field" placeholder="Cover image" required/>
            <label className="form__label">Cover image</label>
            </div>
            <div className="form__group field">
            <input className="form__field" placeholder="Description" required/>
            <label className="form__label">Description</label>
            </div>
            <button type="submit" onSubmit={postArtist}>Add Artist</button>
            </form>
       
    )
}

export default AddArtistPage