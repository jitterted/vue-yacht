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
    <div>{{ scoreInfo.totalScore }}</div>
    <div v-for="(category, index) in scoreInfo.categories"
         :key="index"
    >
      <button>{{ category.description }}</button>
      {{category.diceRoll}}
      {{category.score}}
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  interface Category {
    description: string;
    diceRoll: string;
    score: string;
  }

  interface ScoreInfo {
    totalScore: number;
    categories: Category[];
  }

  @Component({
    components: {
      // HelloWorld,
    },
  })
  export default class App extends Vue {
    private readonly startGameUrl = '/api/start-game'
    private readonly lastRollUrl = '/api/last-roll'
    private readonly rollDiceUrl = '/api/roll-dice'
    private readonly scoreCategoriesUrl = '/api/score-categories'

    private lastRoll = '(no last roll)'
    private scoreInfo: ScoreInfo = {totalScore: 0, categories: []}

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
      console.log("Getting Last Roll...")
      fetch(this.lastRollUrl)
        .then(response => response.json())
        .then(lastRollResultJson => this.lastRoll = lastRollResultJson.roll)
        .catch(error => console.log('Refresh error: ' + error))

      console.log("Getting Score and Categories")
      fetch(this.scoreCategoriesUrl)
        .then(response => response.json())
        .then(json => this.scoreInfo = json)
        .catch(error => console.log('Refresh error: ' + error))
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
