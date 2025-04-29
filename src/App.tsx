
import './App.css'
import TI4Overlay from './components/TI4Overlay'
import './utils/TwitchExtensionHelper'; // Initialize mock Twitch helper

function App() {

  
  

  return (
    <>
      <script src="https://apis.google.com/js/api.js" async defer></script>
      <h1>Vite + React</h1>
      
      <div className="bg-gray-200 h-full flex items-center justify-center">
        <div className="p-6 bg-white rounded shadow">
          <h1 className="text-xl font-bold mb-2">TI4 Twitch Overlay Test Environment</h1>
          <p>The overlay should appear at the bottom of this page.</p>
          <p className="text-sm text-gray-600 mt-4">
            Try hovering over player icons and the scoring icon to test the hover cards.
          </p>
        </div>
      </div>
      <TI4Overlay />
    </>
  )
}

export default App
