// Load data
const searchSongs = async () => {
    const songKey = document.getElementById('song-key').value;
    const url = ` https://api.lyrics.ovh/suggest/${songKey}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showSong(data.data);
    } catch (error) {
        displayError('Something is wrong!!! Please try again later!')
    }
}


// Show songs
const showSong = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        const songTemp = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songDiv.innerHTML = songTemp;
        songContainer.appendChild(songDiv);
    });
}


// Load lyric
const getLyric = async (artist, title) => {
    url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError('Lyrics not found!!! Please try again later.')
    }
}


// Display Lyrics
const displayLyrics = lyrics => {
    const lyric = document.getElementById('lyrics');
    lyric.innerText = lyrics;
}


// Display error
const displayError = error => {
    const ShowError = document.getElementById('error-message');
    ShowError.innerText = error;
}