const $ = require("jquery");

const playUrl = "https://sheltered-lake-54213.herokuapp.com/api/v1";

// Playlists

const getPlaylists = () => {
  fetch(`${playUrl}/playlists`)
    .then(response => response.json())
    .then(data => displayPlaylists(data))
    .catch(error => console.error({ error }));
}

const createPlaylist = (data) => {
  fetch(`${playUrl}/playlists`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => addToPlaylistsDisplay(data))
    .catch(error => console.error({ error }));
}

const displayPlaylists = (data) => {
  data.forEach(playlist => {
    $('.fetch-data').append(`
      <div class="listed-playlist">
        <p class="name">${playlist.playlist_name}</p>
        <p class="song_count">Song Count: ${playlist.songs.length}</p>
      </div>
    `);
  })
}

const addToPlaylistsDisplay = (data) => {
  let playlist = data.playlist;

  $('.fetch-data').append(`
    <div class="listed-playlist">
      <p class="name">${playlist.playlist_name}</p>
      <p class="song_count">Song Count: ${playlist.songs.length}</p>
    </div>
`);
}

// Event listener for creating playlist
$('#create-playlist').on('click', event => {
  event.preventDefault();
  let playlistName = $('#playlist-new-name').val();
  let data = { playlist_name: playlistName }
  createPlaylist(data);
});

$('nav').children('a').on('click', function(event){
  event.preventDefault;
  $('nav').children('a').removeClass('active')
  $(this).addClass('active')
  localStorage.setItem('link', $(this).prop('href'))
});

function loadActiveNav(){
  let link = localStorage.getItem('link')
  if (link == window.location['href']) {
    $('nav').children('a').each(function(){
      if ($(this).prop('href') === link)
        $(this).addClass('active')
    });
  };
};

loadActiveNav();
getPlaylists();
