const $ = s => document.querySelector(s);
const img = $("#img"),
  playBtn = $("#playpause"),
  playIcon = $("#playpause-btn"),
  audio = $("#audio"),
  title = $("#title"),
  prev = $("#prevbtn"),
  next = $("#nextbtn"),
  progress = $("#progress"),
  progressLine = $(".progress-line"),
  currTime = $(".current-time"),
  totalTime = $(".duration-time"),
  volumeBtn = $("#volume"),
  layer = $(".layer"),
  volBar = $(".bar"),
  volumeRange = $(".volumerange"),
  repeatBtn = $("#repeat"),
  likeBtn = $("#like"),
  likeIcon = $("#likeicon"),
  listBtn = $("#list"),
  songList = $("#songs-list"),
  closeList = $("#listclose");

const songs = [
  { path: 'audio/audio5.mpeg', displayName: 'Main Phir Bhi Tum Ko Chahon Ga', cover: "images/image1.jpeg" },
  { path: 'audio/audio3.mpeg', displayName: "Main Rang Sharbtoon Ka", cover: "images/image2.jpeg" },
  { path: 'audio/audio6.mpeg', displayName: 'Ve Haniya', cover: "images/img5.jpg" },
  { path: 'audio/audio2.mp3', displayName: 'Ishqa Ve', cover: "images/image4.jpeg" },
];

let index = 2, playing = false;

const load = s => {
  img.src = s.cover;
  title.textContent = s.displayName;
  audio.src = s.path;
};

const play = () => {
  playing = true;
  playIcon.classList.replace("fa-play", "fa-pause");
  audio.play();
};

const pause = () => {
  playing = false;
  playIcon.classList.replace("fa-pause", "fa-play");
  audio.pause();
};

const change = d => {
  index = (index + d + songs.length) % songs.length;
  load(songs[index]);
  play();
};


// ===== PROGRESS =====
const format = t =>
  `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

audio.ontimeupdate = () => {
  if (!playing) return;
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.value = percent;
  progressLine.style.width = percent + "%";
  if (duration) totalTime.textContent = format(duration);
  currTime.textContent = format(currentTime);
  if (percent >= 100) change(1);
};

progress.oninput = e =>
  audio.currentTime = (audio.duration / 100) * e.target.value;


// ===== VOLUME =====
volumeBtn.onclick = () => {
  layer.classList.toggle("hide");
  setTimeout(() => layer.classList.remove("hide"), 5000);
};

volumeRange.oninput = () => {
  audio.volume = volumeRange.value;
  volBar.style.width = volumeRange.value * 100 + "%";
};


// ===== Audio REPEAT & LIKE =====
repeatBtn.onclick = () =>
  audio.loop = repeatBtn.classList.toggle("color");

likeBtn.onclick = () =>
  likeIcon.classList.replace(
    likeBtn.classList.toggle("color") ? "far" : "fas",
    likeBtn.classList.contains("color") ? "fas" : "far"
  );


// ===== SONG LIST =====
listBtn.onclick = () => songList.classList.toggle("showlist");
closeList.onclick = () => songList.classList.remove("showlist");


// ===== BUTTON EVENTS =====
playBtn.onclick = () => playing ? pause() : play();
prev.onclick = () => change(-1);
next.onclick = () => change(1);