<template>
  <div id="app">
    <div>Dice Roll: {{ lastRoll }}</div>
    <button
        @click="startGame"
    >Start Game
    </button>
    <button
        @click="rollDice"
    >Roll Dice
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
    private readonly rollDiceUrl = '/api/roll-dice'

    private lastRoll = '(no last roll)'

    startGame() {
      this.postTo(this.startGameUrl);
      this.fetchLastDiceRoll();
    }

    rollDice() {
      this.postTo(this.rollDiceUrl)
      this.fetchLastDiceRoll()
    }


    private postTo(url: string) {
      fetch(url, {
          method: 'POST'
        }
      )
    }

    private fetchLastDiceRoll() {
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
