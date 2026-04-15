<template>
  <div class="page-content">
    <div class="ui container">
      <h2 class="ui header"><i class="graduation cap red icon"></i> Training</h2>

      <!-- ─── LANDING ───────────────────────────────────────────────────── -->
      <div v-if="!quizStarted && !quizFinished" class="ui segment" style="text-align: center; padding: 3em 2em;">
        <div v-if="loading" class="ui active inline loader" style="margin-bottom: 1em;"></div>
        <template v-else>
          <i class="massive red brain icon"></i>
          <h2 style="margin-top: 0.5em;">Ready for a quick quiz?</h2>
          <p style="color: #777; font-size: 1.1em;">
            Read each customer scenario and pick the correct entry from the library.<br>
            Practice before you respond to real questions.
          </p>
          <div class="ui horizontal list" style="justify-content: center; margin: 1.2em 0; color: #888; font-size: 0.9em;">
            <div class="item"><i class="question circle icon"></i> 10 scenarios</div>
            <div class="item"><i class="book icon"></i> Match scenario → entry</div>
            <div class="item"><i class="random icon"></i> Choices from real entry library</div>
          </div>

          <div v-if="notEnoughEntries" class="ui yellow message" style="max-width: 420px; margin: 1em auto;">
            <i class="exclamation triangle icon"></i>
            Not enough entries in the library yet. Add at least 4 entries to start training!
          </div>
          <div v-else style="margin-top: 1.5em;">
            <button @click="startQuiz" class="ui large green button">
              <i class="play icon"></i> Start Quiz
            </button>
          </div>
        </template>
      </div>

      <!-- ─── QUIZ IN PROGRESS ─────────────────────────────────────────── -->
      <div v-if="quizStarted && !quizFinished">
        <div style="margin-bottom: 1.5em;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88em; color: #888; margin-bottom: 0.4em;">
            <span>Question {{ currentIdx + 1 }} of {{ quizSet.length }}</span>
            <span>Score: {{ score }} / {{ currentIdx }}</span>
          </div>
          <div style="background: #e0e0e0; border-radius: 4px; height: 8px;">
            <div :style="{ width: progressPct + '%', background: '#DB2828', height: '8px', borderRadius: '4px', transition: 'width 0.3s' }"></div>
          </div>
        </div>

        <div class="ui segment">
          <!-- Scenario -->
          <div class="ui small blue label" style="margin-bottom: 0.8em;">{{ currentQ.category }}</div>
          <h3 style="margin-top: 0.2em;">{{ currentQ.title }}</h3>
          <div style="background: #f9fafe; border-left: 3px solid #DB2828; padding: 0.9em 1em; border-radius: 4px; margin-bottom: 1.4em; color: #555; font-size: 0.95em; line-height: 1.6;">
            {{ currentQ.content }}
          </div>

          <p style="font-weight: 600; color: #333; margin-bottom: 0.8em;">
            <i class="book red icon"></i> Which entry best resolves this issue?
          </p>

          <!-- Choices before answering -->
          <div v-if="!answered">
            <div
              v-for="entry in currentChoices"
              :key="entry._id"
              class="choice-card"
              :class="{ selected: selectedId === entry._id }"
              @click="selectedId = entry._id"
            >
              <span class="choice-badge">{{ entry.issueCode }}</span>
              <div style="flex: 1;">
                <div class="ui mini blue label" style="margin-bottom: 0.3em;">{{ entry.Category }}</div>
                <p style="margin: 0; color: #555; font-size: 0.88em; line-height: 1.5;">
                  {{ entry.Response.length > 130 ? entry.Response.substring(0, 130) + '...' : entry.Response }}
                </p>
              </div>
            </div>
          </div>

          <!-- Choices after answering — highlight result -->
          <div v-if="answered">
            <div
              v-for="entry in currentChoices"
              :key="entry._id"
              class="choice-card"
              :class="{
                correct:    entry._id === correctId,
                wrong:      selectedId === entry._id && entry._id !== correctId,
                unselected: selectedId !== entry._id && entry._id !== correctId
              }"
            >
              <span class="choice-badge">{{ entry.issueCode }}</span>
              <div style="flex: 1;">
                <div class="ui mini blue label" style="margin-bottom: 0.3em;">{{ entry.Category }}</div>
                <p style="margin: 0; color: #555; font-size: 0.88em; line-height: 1.5;">
                  {{ entry.Response.length > 130 ? entry.Response.substring(0, 130) + '...' : entry.Response }}
                </p>
              </div>
            </div>

            <div class="ui message" :class="lastCorrect ? 'green' : 'red'" style="margin-top: 1em;">
              <i :class="lastCorrect ? 'check circle icon' : 'times circle icon'"></i>
              <strong>{{ lastCorrect ? 'Correct!' : 'Incorrect.' }}</strong>
              <span v-if="!lastCorrect">
                The correct entry was <strong>{{ correctEntry ? correctEntry.issueCode : '' }}</strong>
                (category: {{ currentQ.category }}).
              </span>
            </div>
          </div>

          <div style="margin-top: 1.4em; display: flex; gap: 1em;">
            <button v-if="!answered" class="ui blue button" :disabled="!selectedId" @click="submitAnswer">
              <i class="check icon"></i> Submit Answer
            </button>
            <button v-if="answered" @click="nextQuestion" class="ui button">
              {{ currentIdx + 1 < quizSet.length ? 'Next →' : 'See Results' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ─── RESULTS ──────────────────────────────────────────────────── -->
      <div v-if="quizFinished" class="ui segment" style="text-align: center; padding: 3em 2em;">
        <i class="massive" :class="scorePct >= 70 ? 'green trophy icon' : scorePct >= 40 ? 'yellow star icon' : 'red frown icon'"></i>
        <h2 style="margin-top: 0.5em;">Quiz Complete!</h2>

        <div class="ui statistic" style="margin: 1em 0;">
          <div class="value" :style="{ color: scorePct >= 70 ? '#21ba45' : scorePct >= 40 ? '#f2c61f' : '#db2828' }">
            {{ score }} / {{ quizSet.length }}
          </div>
          <div class="label">Correct answers</div>
        </div>

        <div style="margin-top: 0.5em;">
          <div class="ui large label" :class="scorePct >= 70 ? 'green' : scorePct >= 40 ? 'yellow' : 'red'" style="font-size: 1.1em;">
            {{ scorePct }}% — {{ scoreLabel }}
          </div>
        </div>

        <div class="ui segment" style="margin-top: 2em; text-align: left; max-width: 400px; margin-left: auto; margin-right: auto;">
          <h4 style="margin-bottom: 0.8em;"><i class="chart bar icon"></i> Results by category</h4>
          <div v-for="(stat, cat) in categoryStats" :key="cat"
               style="display: flex; justify-content: space-between; margin-bottom: 0.4em; font-size: 0.9em;">
            <span><div class="ui mini blue label">{{ cat }}</div></span>
            <span :style="{ color: stat.correct === stat.total ? '#21ba45' : stat.correct === 0 ? '#db2828' : '#f2711c' }">
              {{ stat.correct }} / {{ stat.total }}
            </span>
          </div>
        </div>

        <button @click="startQuiz" class="ui green button" style="margin-top: 1em;">
          <i class="redo icon"></i> Retake
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import TRAINING_SCENARIOS from '@/data/trainingData'
import { api } from '@/helpers/helpers'

const CHOICE_COUNT = 4

export default {
  name: 'training-page',
  data() {
    return {
      allEntries:    [],
      loading:       true,
      quizSet:       [],
      currentIdx:    0,
      currentChoices: [],
      selectedId:    null,
      answered:      false,
      lastCorrect:   false,
      score:         0,
      quizStarted:   false,
      quizFinished:  false,
      categoryStats: {}
    }
  },
  computed: {
    // Need at least CHOICE_COUNT entries to build meaningful choices
    notEnoughEntries() { return this.allEntries.length < CHOICE_COUNT },
    currentQ()    { return this.quizSet[this.currentIdx] || {} },
    // correct entry = the one whose Category matches the scenario's correctCategory
    correctId()   { return this.currentChoices.find(e => e.Category === this.currentQ.category)?._id || '' },
    correctEntry(){ return this.currentChoices.find(e => e._id === this.correctId) },
    progressPct() { return this.quizSet.length ? (this.currentIdx / this.quizSet.length) * 100 : 0 },
    scorePct()    { return this.quizSet.length ? Math.round((this.score / this.quizSet.length) * 100) : 0 },
    scoreLabel() {
      if (this.scorePct >= 90) return 'Excellent!'
      if (this.scorePct >= 70) return 'Good job!'
      if (this.scorePct >= 40) return 'Keep practicing!'
      return 'Needs improvement'
    }
  },
  async mounted() {
    try {
      const res = await api.getAllEntries()
      if (res.success) this.allEntries = res.data
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    startQuiz() {
      // All 10 scenarios, shuffled order
      this.quizSet = [...TRAINING_SCENARIOS].sort(() => Math.random() - 0.5)
      this.currentIdx    = 0
      this.score         = 0
      this.selectedId    = null
      this.answered      = false
      this.lastCorrect   = false
      this.categoryStats = {}
      this.quizStarted   = true
      this.quizFinished  = false
      this.loadChoices()
    },

    loadChoices() {
      const scenario = this.currentQ

      // Pick 1 correct entry (matching category), fallback to any entry if none match
      const matching     = this.allEntries.filter(e => e.Category === scenario.category)
      const nonMatching  = this.allEntries.filter(e => e.Category !== scenario.category)

      const correct = matching.length
        ? matching[Math.floor(Math.random() * matching.length)]
        : this.allEntries[Math.floor(Math.random() * this.allEntries.length)]

      // Pick (CHOICE_COUNT - 1) distractors from non-matching entries
      const distractors = nonMatching
        .sort(() => Math.random() - 0.5)
        .slice(0, CHOICE_COUNT - 1)

      this.currentChoices = [...distractors, correct].sort(() => Math.random() - 0.5)
      this.selectedId     = null
      this.answered       = false
      this.lastCorrect    = false
    },

    submitAnswer() {
      this.lastCorrect = this.selectedId === this.correctId
      if (this.lastCorrect) this.score++
      const cat = this.currentQ.category
      if (!this.categoryStats[cat]) this.categoryStats[cat] = { correct: 0, total: 0 }
      this.categoryStats[cat].total++
      if (this.lastCorrect) this.categoryStats[cat].correct++
      this.answered = true
    },

    nextQuestion() {
      if (this.currentIdx + 1 < this.quizSet.length) {
        this.currentIdx++
        this.loadChoices()
      } else {
        this.quizFinished = true
        this.quizStarted  = false
      }
    }
  }
}
</script>

<style scoped>
.choice-card {
  display: flex;
  align-items: flex-start;
  gap: 0.9em;
  border: 2px solid #ddd;
  border-radius: 6px;
  padding: 0.8em 1em;
  margin-bottom: 0.6em;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.choice-card:hover     { border-color: #DB2828; background: #fff0f0; }
.choice-card.selected  { border-color: #DB2828; background: #fde8e8; }
.choice-card.correct   { border-color: #21ba45; background: #e8f8e8; cursor: default; }
.choice-card.wrong     { border-color: #DB2828; background: #fde8e8; cursor: default; }
.choice-card.unselected{ border-color: #ddd;    background: #fff;    cursor: default; opacity: 0.55; }

.choice-badge {
  display: inline-block;
  background: #DB2828;
  color: #fff;
  font-weight: 700;
  font-size: 0.78em;
  padding: 0.25em 0.6em;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 0.15em;
}
.choice-card.correct   .choice-badge { background: #21ba45; }
.choice-card.wrong     .choice-badge { background: #DB2828; }
.choice-card.unselected .choice-badge { background: #aaa; }
</style>
