import * as WaveformPlaylist from 'waveform-playlist'

var Player = function () {
  this.playlist = WaveformPlaylist.init({
    samplesPerPixel: 1260,
    waveHeight: 100,
    container: document.getElementById('playlist'),
    timescale: true,
    mono: true,
    exclSolo: true,
    state: 'cursor',
    colors: {
      waveOutlineColor: '#CCCCCC'
    },
    controls: {
      show: true, // whether or not to include the track controls
      width: 140 // qqwidth of controls in pixels
    },
    zoomLevels: [1260]
  })
}

Player.prototype.load = function (trackurls) {
  this.playlist.tracks = []
  this.playlist.getEventEmitter().emit('clear')
  var tracksToLoad = []
  for (var track in trackurls) {
    tracksToLoad.push(
      {
        'src': track.url,
        'name': track.name,
        'muted': false,
        'customClass': 'play',
        'soloed': track.solo
      }
    )
  }
  this.playlist.load(tracksToLoad)
}

export default Player
