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
      <button
          @click="assignRoll(category.description)"
      >{{ category.description }}
      </button>
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

    async startGame() {
      await this.postTo(this.startGameUrl);
      await this.fetchLastDiceRoll();
    }

    async rollDice() {
      await this.postTo(this.rollDiceUrl)
      await this.fetchLastDiceRoll()
    }

    async assignRoll(categoryDescription: string) {
      await fetch('/api/assign-roll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: categoryDescription})
      })
      await this.fetchLastDiceRoll()
    }

    private async postTo(url: string) {
      await fetch(url, {
          method: 'POST'
        }
      )
    }

    private async fetchLastDiceRoll() {
      let response = await fetch(this.lastRollUrl)
      // could check response here, e.g.:
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const lastRollResultJson = await response.json()
      this.lastRoll = lastRollResultJson.roll

      // .catch(error => console.log('Refresh error: ' + error))

      response = await fetch(this.scoreCategoriesUrl)
      this.scoreInfo = await response.json()

      // .catch(error => console.log('Refresh error: ' + error))
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
