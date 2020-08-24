let playing = false
let currentTrack = 0
let timer
let tracks

const play = () => {
  $('#PLAY').blur()
  playing = !playing
  if (playing) {
    $('#PLAY').textContent = "⏹️"

    setTrack(currentTrack)
    tracks[currentTrack].play()
  } else {
    $('#PLAY').textContent = "▶️"
    $('#PREV').style.opacity = 0
    $('#NEXT').style.opacity = 0
    tracks[currentTrack].pause()
  }
}

const prev = () => {
  $('#PREV').blur()
  if (currentTrack <= 0) return
  tracks[currentTrack].stop()
  tracks[currentTrack].unload()
  setTrack(currentTrack - 1)
  tracks[currentTrack].play()
}

const next = () => {
  $('#NEXT').blur()
  if (currentTrack > 14) return
  tracks[currentTrack].stop()
  tracks[currentTrack].unload()
  setTrack(currentTrack + 1)
  tracks[currentTrack].play()
}

const setTrack = track => {
  tracks = tracks || createTracks()
  currentTrack = track

  $('#PREV').style.opacity = track === 0 ? 0 : 100
  $('#NEXT').style.opacity = track === 14 ? 0 : 100

  $('#CHAPTER').innerHTML = "CHAPTER " + trackList[currentTrack].chapter
  $('#SONGNAME').style.opacity = 0
  $('#ARTIST').style.opacity = 0

  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    $('#SONGNAME').innerHTML = trackList[currentTrack].song
    $('#ARTIST').innerHTML = trackList[currentTrack].artist
    $('#SONGNAME').style.opacity = 100
    $('#ARTIST').style.opacity = 100
  }, track === 0 ? 13000 : 5000);
}

const createTracks = () => {
  return new Array(15).fill().map((_, i) => new Howl({
    src: window.location.href + i,
    html5: true,
    preload: false,
    autoPlay: false,
    format: 'mp3',
    onend: next,
  }))
}

const trackList = [
  { chapter: "1: ENTER POSEIDON", song: "Agua", artist: "J Balvin ft. Tainy" },
  { chapter: "1: ENTER POSEIDON", song: "Water", artist: "Ugly God" },
  { chapter: "2: DIONYSIS BRINGS THE JUICE", song: "Juice", artist: "AD" },
  { chapter: "3: THOR'S REBUTTAL", song: "Thunderstruck", artist: "AC/DC" },
  { chapter: "3: THOR'S REBUTTAL", song: "Electric Feel", artist: "MGMT" },
  { chapter: "4: ZOOT UP BABY", song: "Iron Man (Wick-It Remix)", artist: "Black Sabbath and Wick-it the Instigator" },
  { chapter: "4: ZOOT UP BABY", song: "Breakn A Sweat", artist: "Skrillex ft. The Doors" },
  { chapter: "4: ZOOT UP BABY", song: "Stillettos (Pumps)", artist: "Crime Mob" },
  { chapter: "5: TOO ZOOTED", song: "Ayy Ladies", artist: "Travis Porter ft. Tyga" },
  { chapter: "5: TOO ZOOTED", song: "I Am A God", artist: "Kanye West" },
  { chapter: "6: THE POT BOILS OVER", song: "Wizard Fight", artist: "Weed Eater" },
  { chapter: "6: THE POT BOILS OVER", song: "Ride The Lightning", artist: "Metallica" },
  { chapter: "7: POSEIDON'S REVENGE", song: "Drowning", artist: "A Boogie Wit Da Hoody" },
  { chapter: "8: KRONOS REMEMBERS", song: "Once In A Lifetime", artist: "Talking Heads" },
  { chapter: "8: KRONOS REMEMBERS", song: "Father and Son", artist: "Cat Stevens" },
]

const $ = selector => document.querySelector(selector)