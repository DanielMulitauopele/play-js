const $ = require("jquery");

const playUrl = "https://sheltered-lake-54213.herokuapp.com/api/v1"

// Favorites DOM Functions

const displayFavorites = (data) => {
  data.forEach(song => {
    $('.fetch-data').append(`
      <div class="listed-song" id="${song.id}">
        <p class="name">${song.name}</p>
        <p class="artist_name">${song.artist_name}</p>
        <p class="genre">${song.genre}</p>
        <p class="song_rating">${song.song_rating}</p>
      </div>
      `);
  });
}

const removeFromFavoritesDisplay = (id) => {
  $('.fetch-data').remove(`#${id}`);
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
    <span class="message">${data.message}</span>
  `);
}

// Event Listener for Adding to Favorites
$('.musix-results').on('click', '.track-results', event => {
  songPayload = {
    name: event.currentTarget.children[0].textContent,
    artist_name: event.currentTarget.children[1].textContent,
    genre: event.currentTarget.children[2].textContent,
    song_rating: event.currentTarget.children[3].textContent
  }

  postFavorite(songPayload);
  event.currentTarget.children[4].textContent = "Added To Favorites!";
});

// Event Listener for Adding to Playlist - Modal
$('.song-list').on('click', '.song-playlist-add', event => {
  let songId = event.target.parentNode.parentNode.id;
  let songName = event.target.parentNode.parentNode.children[0].textContent;

  $('#playlist-song-id').val(songId);
  $('#playlist-msg').text(`Add "${songName}"" to which playlist?`);
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
$('.song-list').on('click', '.song-remove', event => {
  let songId = event.target.parentNode.parentNode.id;
  delFavorites(songId);
});

// Closes Playlist Modal on Window Click
window.onclick = event => {
  if (event.target == document.getElementById('playlist-modal')) {
    $('#playlist-modal').css('display', 'none');
  }
} 


$('a').on('click', function(event){
  event.preventDefault;
  $('a').removeClass('active')
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
loadActiveNav();
