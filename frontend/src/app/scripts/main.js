document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    console.clear()
    console.log(Date.now().toExponential(), [Math.random(), Math.random(), Math.random()].map(Math.round).join(', '));
  }, 1000)
})