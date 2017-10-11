import { getPort } from './portHandler'

window.addEventListener('message', (event) => {
  if (event.source !== window) { return }

  const { meta } = event.data
  if (meta && meta.family === 'WSInspector') {
    console.log('Intercepted message', event.data)

    getPort().postMessage(event.data)
  }
})
