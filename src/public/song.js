async function updateSong() {
  const res = await fetch("https://api.enochlau.com/api/current-song");
  const data = await res.json();
  const html = {
    status: document.getElementById("song-status"),
    cover: document.getElementById("song-cover-art"),
    title: document.getElementById("song-title"),
    artist: document.getElementById("song-artist"),
  };

  html.cover.style.backgroundImage = `url(${data.image_url})`;

  html.title.innerText = data.name;
  html.artist.innerHTML = data.artist;
  html.status.setAttribute("data-playing", data.now_playing);
}

updateSong();

setInterval(updateSong, 1000);
