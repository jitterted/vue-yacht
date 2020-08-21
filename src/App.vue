<template>
  <div id="app">
    <div>Dice Roll: {{ lastRoll }}</div>
    <button
        @click="startGame"
    >Start Game
    </button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    components: {
      // HelloWorld,
    },
  })
  export default class App extends Vue {
    private readonly startGameUrl = '/api/start-game'
    private readonly lastRollUrl = '/api/last-roll'

    private lastRoll = '(no last roll)'

    startGame() {
      fetch(this.startGameUrl, {
          method: 'POST'
        }
      )
      fetch(this.lastRollUrl)
        .then(response => response.json())
        .then(lastRollResultJson => this.lastRoll = lastRollResultJson.roll)
        .catch(error => console.log('Refresh error: ' + error));
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
