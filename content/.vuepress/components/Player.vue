<template>
  <div id='player'>
    <h1></h1>
    <div v-bind:class="playliststyles" id="playlist"></div>
  </div>
</template>

<script>
import Player from './player.js'
export default {
  props: {
    tracks: Array
  },
  data: function () {
    return {
      isPlaying: false,
      isLoading: false,
      player: Object
    }
  },
  mounted: function () {
    this.tracks = [{
        'src': "http://test.wav",
        'name': "wurst",
        'muted': false,
        'customClass': 'play',
        'soloed': true
      }
    ]
    this.player = new Player()
    this.isLoading = true
    this.player.playlist.getEventEmitter().on('audiosourcesloaded', this.audioLoaded)
    this.player.load(this.tracks)
  },
  beforeDestroy: function () {
    this.stop()
    delete this.player
  },
  methods: {
    update_tracks: function (oldval, newval) {
      if (JSON.stringify(oldval) !== JSON.stringify(newval) && this.isLoading !== true) {
        this.stop()
        this.isLoading = true
        this.player.load(this.tracks)
      }
    },
    playpause: function (event) {
      if (this.isPlaying) {
        this.player.playlist.getEventEmitter().emit('pause')
      } else {
        this.player.playlist.getEventEmitter().emit('play')
        this.player.playlist.getEventEmitter().on('finished', this.stop)
      }
      this.isPlaying = !this.isPlaying
      event.stopPropagation()
      return false
    },
    stop: function () {
      this.player.playlist.getEventEmitter().emit('stop')
      this.isPlaying = false
    },
    audioLoaded: function () {
      this.isLoading = false
      console.log(this.player.playlist.tracks.length)
    }
  }
}
</script>

<style media="screen">
/* #player {
  padding-top: 20px;
  margin-top: 10px;
  z-index: -1000;
}
#player .columns.hide{
  display: none;
}
*/
#playlist.hide{
  display: none;
}
#playlist .playlist-tracks .mix header {
  background-color: white;
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  color: black;
}
#playlist .playlist-tracks .reference header {
  color: white;
  background-color: #56B4E9;
}
#playlist .playlist-tracks .processed header {
  color: white;
  background-color: #818181;
}
/*.playlist .channel-wrapper .controls label {
    display: none !important;
}*/
.playlist .channel-wrapper .controls .btn {
    margin-left: 4px;
}
.playlist .channel-wrapper .controls .btn-solo.active {
    background-color: orange!important;
}
.playlist .channel-wrapper .controls .btn-mute {
    display: none !important;
}
.playlist .channel-wrapper .controls label {
    display: none !important;
}

#playlist.singletrack .playlist-tracks .channel-wrapper .controls .btn-solo {
    display: none !important;
}

.playlist {
  margin: 0em 0;
  width: 100%;
  z-index: 0;
}
  .playlist .playlist-time-scale {
    height: 30px; }
  .playlist .playlist-tracks {
    background: transparent; }
  .playlist .channel {
    background: grey; }
  .playlist .channel-progress {
    background: orange; }
  .playlist .cursor {
    background: black; }
  .playlist .wp-fade {
    background-color: rgba(0, 0, 0, 0.1); }
  .playlist .state-cursor,
  .playlist .state-select {
    cursor: text; }
  .playlist .state-fadein {
    cursor: w-resize; }
  .playlist .state-fadeout {
    cursor: e-resize; }
  .playlist .state-shift {
    cursor: ew-resize; }
  .playlist .selection.point {
    background: #00d1b2; }
  .playlist .selection.segment {
    background: rgba(0, 0, 0, 0.1); }
  .playlist .channel-wrapper.silent .channel {
    opacity: 0.3; }
  .playlist .controls {
    background: transparent;
    text-align: center; }
    .playlist .controls header {
      overflow: hidden;
      color: white;
      background-color: #00d1b2;
      margin-bottom: 0.5em;
      height: 20px; }
    .playlist .controls label {
      margin: 0.5em auto;
      width: 80%;
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transform: translate(0, 0); }
    .playlist .controls label:before {
      content: "\f027";
      color: black;
      font-size: 13px;
      padding-right: 5px;
      -moz-osx-font-smoothing: grayscale; }
    .playlist .controls label:after {
      content: "\f028";
      color: black;
      font-size: 13px;
      padding-left: 5px; }
    .playlist .controls input[type=range] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      display: inline-block;
      display: none;
      width: 75%; }
    .playlist .controls input[type=range]::-webkit-slider-runnable-track {
      height: 8px;
      background: #ddd;
      border: none;
      border-radius: 3px;
      padding: 1px; }
    .playlist .controls input[type=range]::-moz-range-track {
      height: 8px;
      background: #ddd;
      border: none;
      border-radius: 3px;
      padding: 1px; }
    .playlist .controls input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: goldenrod;
      margin-top: -5px;
      cursor: ew-resize; }
    .playlist .controls input[type=range]::-moz-range-thumb {
      border: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: goldenrod;
      margin-top: -5px;
      cursor: ew-resize; }
    .playlist .controls input[type=range]:focus {
      outline: none; }
    .playlist .controls input[type=range]:focus::-webkit-slider-runnable-track {
      background: #ccc; }
    .playlist .controls input[type=range]:focus::-moz-range-track {
      background: #ccc; }
</style>
