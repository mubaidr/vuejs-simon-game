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
    activeCount: 3,
    targetCount: 20,
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
      this.inputSeries.push(button)
    },
    displaySeries (callback) {
      this.activeInputState = false
      for (var i = 1; i <= this.activeCount; i++) {
        let tmp = i

        let to = setTimeout(() => {
          this.activeButton = this.series[tmp - 1]

          setTimeout(() => {
            this.activeButton = null
            if (tmp === this.activeCount) {
              this.activeInputState = true
              if (callback) callback()
            }
          }, 1000)
        },
        i * 2 * 1000)

        this.timeouts.push(to)
      }
    },
    startGame () {
      this.generateSeries()
      this.displaySeries()
    },
    generateSeries () {
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
