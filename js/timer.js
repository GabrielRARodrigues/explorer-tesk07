import Sounds from './sounds.js'

const { timeEndAudio } = Sounds()

export default function ({ minutesTimerView, updateTimer, secondsTimerView }) {
  let timerTimeOut
  let minutes = Number(minutesTimerView.textContent)

  function hold() {
    clearTimeout(timerTimeOut)
  }

  function reset() {
    updateTimer(minutes)
    clearTimeout(timerTimeOut)
  }

  function countDown() {
    timerTimeOut = setTimeout(function () {
      let countMinutes = minutes
      let seconds = Number(secondsTimerView.textContent)

      let isFinished = countMinutes <= 0 && seconds <= 0

      updateTimer(countMinutes)

      if (isFinished) {
        // resetControls()
        updateTimer(minutes)
        timeEndAudio.play()
        return
      }

      if (seconds <= 0) {
        seconds = 60
        --countMinutes
      }

      updateTimer(countMinutes, String(seconds - 1))

      countDown()
    }, 1000)
  }

  function updateMinutes(newMinutes) {
    minutes = newMinutes
  }

  function addFiveMinutes() {
    if (minutes === 0) countDown()
    minutes += 5
  }

  function removeFiveMinutes() {
    if (minutes - 5 >= 0) {
      minutes -= 5
    } else {
      alert('Não é possível diminuir mais os minutos')
    }
  }

  return {
    hold,
    reset,
    updateMinutes,
    countDown,
    addFiveMinutes,
    removeFiveMinutes
  }
}
