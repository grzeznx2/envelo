export default class Timer {
  startTime: number | undefined
  endTime: number | undefined
  constructor() {
    this.startTime = undefined
    this.endTime = undefined
  }
  start() {
    this.startTime = Date.now()
  }
  stop() {
    this.endTime = Date.now()
  }
  getDuration() {
    if (!this.startTime || !this.endTime) return
    return Math.floor((this.endTime - this.startTime) / 1000)
  }
}
