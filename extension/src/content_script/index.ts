window.addEventListener('message', (event) => {
  if (event.source !== window) { return }

  if (event.data.family === 'WSInspector') {
    console.log('Intercepted message', event.data)
  }
})