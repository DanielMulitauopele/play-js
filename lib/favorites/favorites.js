const $ = require("jquery");

const playUrl = "https://sheltered-lake-54213.herokuapp.com/api/v1"

String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '...' : this;
};

// Favorites DOM Functions

const displayFavorites = (data) => {
  data.forEach(song => {
    $('.fetch-data').append(`
      <div class="listed-song" id="${song.id}">
        <p class="name">${song.name.trunc(20)}</p>
        <p class="artist_name">${song.artist_name.trunc(10)}</p>
        <p class="genre">${song.genre}</p>
        <a href="javascript:void(0)" class="song-remove">
          <i class="favorite-button fas fa-heart fa-fw"></i>
        </a>
        <a href="javascript:void(0)" class="song-playlist-add">
          <i class="playlist-button fas fa-music fa-fw"></i>
        </a>
      </div>
      `);
  });
}

const removeFromFavoritesDisplay = (id) => {
  $('.fetch-data').children(`#${id}`).remove();
}

// Favorites/Songs

const delFavorites = (id) => {
  fetch(`${playUrl}/songs/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  })
    .catch(error => console.error({ error }));

  removeFromFavoritesDisplay(id);
}
const getFavorites = () => {
  fetch(`${playUrl}/songs`)
    .then(response => response.json())
    .then(data => displayFavorites(data))
    .catch(error => console.error({ error }));
}

const addSongToPlaylist = (playlistId, songId) => {
  fetch(`${playUrl}/playlists/${playlistId}/songs/${songId}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type':'application/json' }
  })
    .then(response => response.json())
    .then(data => displayPlaylistMessage(data))
    .catch(error => console.error({ error }));
}

const displayPlaylistMessage = data => {
  $('.modal-body').append(`
    <span class="modal-text">${data.message}</span>
  `);
}

const displayPlaylists = (data) => {
  data.forEach(playlist => {
    $('.playlist-list').append(`
      <tr id="${playlist.id}">
        <td style="border: 1px solid black;" class="playlist-name">${playlist.playlist_name}</td>
      </tr>
    `);

    $('#playlists-selection').append(`
      <option value="${playlist.id}">${playlist.playlist_name}</option>
    `);
  })
}

const getPlaylists = () => {
  fetch(`${playUrl}/playlists`)
    .then(response => response.json())
    .then(data => displayPlaylists(data))
    .catch(error => console.error({ error }));
}

// Event Listener for Adding to Playlist - Modal
$('.fetch-data').on('click', '.song-playlist-add', event => {
  let songId = event.target.parentNode.parentNode.id;
  let songName = event.target.parentNode.parentNode.children[0].textContent;

  $('#playlist-song-id').val(songId);
  $('#playlist-msg').text(`Add "${songName}" to which playlist?`);
  $('#playlist-modal').css('display', 'block');
});

// Event Listener for Song to Playlist Form
$('#select-playlist').submit(event => {
  event.preventDefault();
  let playlistId = event.target.children[0].value;
  let songId = event.target.children[1].value;

  addSongToPlaylist(playlistId, songId);
});

// Closes Playlist Modal
$('.close').on('click', () => {
  $('#playlist-modal').css('display', 'none');
});

// Event Listener For Removing From Favorites
$('.fetch-data').on('click', '.song-remove', event => {
  let songId = event.target.parentNode.parentNode.id;
  delFavorites(songId);
});

// Closes Playlist Modal on Window Click
window.onclick = event => {
  if (event.target == document.getElementById('playlist-modal')) {
    $('#playlist-modal').css('display', 'none');
  }
}


$('nav').children('a').on('click', function(event){
  event.preventDefault;
  $(this).addClass('active')
  localStorage.setItem('link', $(this).prop('href'))
});

function loadActiveNav(){
  let link = localStorage.getItem('link')
  if (link == window.location['href']) {
    $('a').each(function(){
      if ($(this).prop('href') === link)
        $(this).addClass('active')
    });
  };
};


getFavorites();
getPlaylists();
loadActiveNav();
