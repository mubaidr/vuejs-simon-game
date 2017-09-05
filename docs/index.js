// eslint-disable-next-line
Vue.config.productionTip = false
// eslint-disable-next-line
var myApp = new Vue({
  el: '#app',
  data: {
    active: true,
    running: true,
    strict: false,
    activeInputState: false,
    series: [],
    inputSeries: [],
    activeCount: 1,
    targetCount: 3,
    activeButton: null,
    timeouts: []
  },
  created () {},
  mounted () {
    this.startGame()
  },
  watch: {
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

      let index = this.inputSeries.length

      if (this.series[index] === button) {
        this.inputSeries.push(button)
      } else {
        alert('epic fail. noob')
        if (this.strict) {
          this.activeCount = 1
        } else {
          this.displaySeries()
        }
      }

      if (this.inputSeries.length === this.activeCount) {
        if (this.activeCount === this.targetCount) {
          alert('wow... so pro!')
          this.running = false
        } else {
          this.activeCount++
          this.displaySeries()
        }
      }
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
