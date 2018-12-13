const $ = require("jquery");
var urlParams = new URLSearchParams(window.location.search);

const playUrl = "https://sheltered-lake-54213.herokuapp.com/api/v1";

String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '...' : this;
};

const getPlaylist = (id) => {
  fetch(`${playUrl}/playlists/${id}/songs`)
    .then(response => response.json())
    .then(data => displayPlaylist(data))
    .catch(error => console.error({ error }));
}

const displayPlaylist = (data) => {
  $('#playlist-header-name').text(data.playlist_name);
  data.songs.forEach(song => {
    $('.fetch-data').append(`
      <div class="listed-song" id="${song.id}">
        <p class="name">${song.name.trunc(20)}</p>
        <p class="artist_name">${song.artist_name.trunc(10)}</p>
        <p class="genre">${song.genre}</p>
        <p class="genre">${song.song_rating}</p>
        <a href="javascript:void(0)" class="song-playlist-remove">
          <i class="playlist-button fas fa-music fa-fw"></i>
        </a>
      </div>
    `);
  })
}

const delPlaylistSong = (songId) => {
  let playlistId = urlParams.get('id');

  fetch(`${playUrl}/playlists/${playlistId}/songs/${songId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: { 'Content-Type':'application/json' }
  })
    .then(response => response.json())
    .catch(error => console.error({ error }));

  removeFromPlaylist(songId);
}

const removeFromPlaylist = (id) => {
  $('.fetch-data').children(`#${id}`).remove();
}

// Event Listener For Removing From Playlist
$('.fetch-data').on('click', '.song-playlist-remove', event => {
  let songId = event.target.parentNode.parentNode.id;
  delPlaylistSong(songId);
});


getPlaylist(urlParams.get('id'));
