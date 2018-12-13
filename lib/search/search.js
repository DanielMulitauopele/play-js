const $ = require("jquery");

const key = "6ad28f3bfd8438979401eba5775e6ae2";
const musixUrl = "https://api.musixmatch.com/ws/1.1";
const playUrl = "https://sheltered-lake-54213.herokuapp.com/api/v1";

class SearchArtistsResult {
  constructor(data) {
    this.data = data;
  }

  artistList() {
    var artists = [];
    this.data["message"]["body"]["artist_list"].forEach((artist) => {
      let artistObj = {
        id: artist.artist.artist_id,
        name: artist.artist.artist_name
      };
      artists.push(artistObj);
    });
    return artists;
  }
}
class ArtistTrackResult {
  constructor(data) {
    this.data = data;
  }

  trackList() {
    var tracks = [];
    this.data["message"]["body"]["track_list"].forEach((track) => {
      let genreBase = track.track.primary_genres.music_genre_list
      let trackGenre;

      if ((genreBase === undefined) || (genreBase.length === 0)) {
        trackGenre = 'Unknown';
      } else {
        trackGenre = track.track.primary_genres
                          .music_genre_list[0].music_genre.music_genre_name
      }

      trackObj = {
        id: track.track.track_id,
        name: track.track.track_name,
        artist_name: track.track.artist_name,
        genre: trackGenre,
        song_rating: track.track.track_rating
      }

      tracks.push(trackObj);
    });
    return tracks;
  }
}

// ** DOM APPEND FUNCTIONS **

const displayArtistsResults = (data) => {
  searchResults = new SearchArtistsResult(data);

  // Clear Any Current HTML First
  $('.fetch-data').html('');

  searchResults.artistList().forEach(artist => {
    $('.fetch-data').append(`
      <div class="listed-artist">
        <p class="artist_name">
          <a href="javascript:void(0)" class="artist-select" id="${artist.id}">${artist.name}</a>
        </p>
      </div>
    `);
  });
}

String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};

const displayTrackResults = (data) => {
  trackResults = new ArtistTrackResult(data);
  // Clear Current HTML
  $('.fetch-data').html('');

  trackResults.trackList().forEach(track => {
    $('.fetch-data').append(`
      <div class="listed-song">
        <p class="name">${track.name.trunc(25)}</p>
        <p class="artist_name" style="display: none;">${track.artist_name}</p>
        <p class="genre">${track.genre}</p>
        <p class="song_rating">${track.song_rating}</p>
        <a href="javascript:void(0)" id="${track.id}">
          <i class="favorite-button far fa-heart fa-1x fa-fw"></i>
        </a>
      </div>
    `);
  });
}

// ** FETCH FUNCTIONS **
const getTracksByArtist = (artistId) => {
  fetch(`${musixUrl}/track.search?f_artist_id=${artistId}&format=json&apikey=${key}&page_size=30&s_track_rating=desc`)
    .then(response => response.json())
    .then(data => displayTrackResults(data))
    .catch(error => console.error({ error }))
}

const searchArtists = (name) => {
  fetch(`${musixUrl}/artist.search?q_artist=${name}&format=json&apikey=${key}&page_size=30`)
    .then(response => response.json())
    .then(data => displayArtistsResults(data))
    .catch(error => console.error({ error }))
}

const postFavorite = (data) => {
  fetch(`${playUrl}/songs`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    mode: 'cors',
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.error({ error }));
}

// Event listener for search artist form
$('#artist-search').on('click', event => {
  let artistName = $('#artist-search-name').val();
  searchArtists(artistName);
});

$('#artist-search-name').keyup(event => {
  if(event.keyCode == 13) {
    let artistName = $('#artist-search-name').val();
    searchArtists(artistName);
  }
})

// Event Listener for Adding to Favorites
$('.fetch-data').on('click', '.listed-song', event => {
  songPayload = {
    name: event.currentTarget.children[0].textContent,
    artist_name: event.currentTarget.children[1].textContent,
    genre: event.currentTarget.children[2].textContent,
    song_rating: event.currentTarget.children[3].textContent
  }

  postFavorite(songPayload);
  event.currentTarget.children[4].children[0].removeAttribute('class');
  event.currentTarget.children[4].children[0].setAttribute('class', 'favorite-button fas fa-heart fa-1x fa-fw');
  event.currentTarget.children[4].setAttribute('disabled');
});

// Event Listerner for Selecting Artist
$('.fetch-data').on('click', '.artist-select', event => {
  getTracksByArtist(event.target.id);
});

$('a').on('click', function(){
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

loadActiveNav();
