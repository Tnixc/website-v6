async function updateSong() {
  const res = await fetch("https://api.enochlau.com/api/current-song");
  const data = await res.json();
  const html = {
    status: document.getElementById("song-status"),
    cover: document.getElementById("song-cover-art"),
    title: document.getElementById("song-title"),
    artist: document.getElementById("song-artist"),
    songInfo: document.getElementById("song-info"),
    notListening: document.getElementById("not-listening"),
  };

  html.status.setAttribute("data-playing", data.now_playing);

  if (data.now_playing) {
    html.cover.style.backgroundImage = `url(${data.image_url})`;
    html.title.innerText = data.name;
    html.artist.innerHTML = data.artist;
    html.cover.classList.remove("hidden");
    html.songInfo.classList.remove("hidden");
    html.notListening.classList.add("hidden");
  } else {
    html.cover.classList.add("hidden");
    html.songInfo.classList.add("hidden");
    html.notListening.classList.remove("hidden");
  }
}

updateSong();

setInterval(updateSong, 1000);
