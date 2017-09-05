// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#app',
  data: {
    active: false,
    running: false,
    strict: false,
    activeInputState: false,
    series: [],
    inputSeries: [],
    activeCount: 1,
    targetCount: 20,
    activeButton: null,
    timeouts: [],
    waitforInput: null,
    message: 'info',
    sounds: {
      1: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
      2: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
      3: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
      4: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3',
      'error': ''
    }
  },
  created () {},
  mounted () {},
  watch: {
    'message' (newVal, oldVal) {
      if (oldVal === 'warn' && newVal === null) {
        if (this.strict) {
          this.activeCount = 1
        } else {
          this.displaySeries()
        }
      }
    },
    'active' () {
      this.running = false
      this.strict = false
      this.activeInputState = false
    },
    'running' (val) {
      this.activeCount = 1
      if (val) {
        this.startGame()
      } else {
        this.timeouts.forEach((item) => {
          clearTimeout(item)
        })
      }
      this.activeInputState = false
    }
  },
  computed: {
    getActiveCount () {
      return (this.active && this.running) ? this.activeCount < 10 ? '0' + this.activeCount : this.activeCount : '--'
    }
  },
  methods: {
    handleButtonClick (button) {
      if (!this.activeInputState) return
      clearTimeout(this.waitforInput)

      let index = this.inputSeries.length

      if (this.series[index] === button) {
        this.inputSeries.push(button)
      } else {
        this.message = 'warn'
      }

      if (this.inputSeries.length === this.activeCount) {
        if (this.activeCount === this.targetCount) {
          this.message = 'success'
          this.running = false
        } else {
          this.activeCount++
          this.displaySeries()
        }
      }

      this.waitforInput = setTimeout(() => {
        this.message = 'warn'
      }, 5000)
    },
    displaySeries (callback) {
      this.activeInputState = false
      this.inputSeries = []
      for (var i = 0; i < this.activeCount; i++) {
        let tmp = i

        let to = setTimeout(() => {
          this.activeButton = this.series[tmp]

          setTimeout(() => {
            this.activeButton = null
            if (tmp === this.activeCount - 1) {
              this.activeInputState = true
              clearTimeout(this.waitforInput)
              this.waitforInput = setTimeout(() => {
                this.message = 'warn'
              }, 5000)
              if (callback) callback()
            }
          }, 500)
        },
        1000 + (i * 1000))

        this.timeouts.push(to)
      }
    },
    startGame () {
      this.generateSeries()
      this.displaySeries()
    },
    generateSeries () {
      this.series = []
      for (var i = 0; i < this.targetCount; i++) {
        this.series.push(Math.floor((Math.random() * 4) + 1))
      }
    },
    toggleActive () {
      this.active = !this.active
    },
    toggleRunning () {
      if (!this.active) return
      this.running = !this.running
    },
    toggleStrict () {
      if (!this.active) return
      this.strict = !this.strict
    }
  }
})
