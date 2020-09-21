function newQuery(table, id) {
    switch (table) {
        case 'album':
            return `CALL GetAlbumSongList(${id});`
            break;
        
        case 'playlist':
            return `CALL GetSongList(${id});`
            break;

        case 'artist':
            return `CALL getArtistSongList(${id});`
            break;
        }
        
}
   module.exports = newQuery;