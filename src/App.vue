<template>
  <div id="app">
    <div>Dice Roll:
      <span
          v-for="(die, index) in lastRoll"
          :key="index"
      >
        <input
            type="checkbox"
            :value=index
            v-model="keptDiceIndexes"
        >{{ die }}
      </span>
      <button
          @click="reroll"
          :disabled="!canReroll"
      >Reroll
      </button>
    </div>
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
    },
  })
  export default class App extends Vue {
    private readonly startGameUrl = '/api/start-game'
    private readonly lastRollUrl = '/api/last-roll'
    private readonly rollDiceUrl = '/api/roll-dice'
    private readonly scoreCategoriesUrl = '/api/score-categories'
    private readonly rerollUrl = '/api/reroll'

    private lastRoll: number[] = []
    private scoreInfo: ScoreInfo = {totalScore: 0, categories: []}
    private keptDiceIndexes: number[] = []

    private rollCount = 0;

    get canReroll() {
      return this.rollCount > 0 && this.rollCount < 3
    }

    public rerollCompleted() {
      this.rollCount++
    }

    public initialRollCompleted() {
      this.rollCount = 1
    }

    async startGame() {
      await this.postTo(this.startGameUrl);
    }

    async rollDice() {
      await this.postTo(this.rollDiceUrl)
      this.keptDiceIndexes = Array.from({length: this.lastRoll.length}, (_, i) => i)
      this.initialRollCompleted()
    }

    async reroll() {
      await fetch(this.rerollUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({diceIndexesToKeep: this.keptDiceIndexes.sort()})
      })
      await this.fetchLastDiceRoll()
      this.keptDiceIndexes = Array.from({length: this.keptDiceIndexes.length}, (_, i) => i)
      this.rerollCompleted()
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
      await this.fetchLastDiceRoll()
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
