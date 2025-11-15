import './App.css'

import { LoadingScreen } from './Components/LoadingScreen'
import { Home } from './Pages/HomePage'
import { HelpButton } from './Components/HelpButton'


function App() {
  return (
    <>
      <div>
        <LoadingScreen />
        <Home />
        <HelpButton />
      </div>
    </>
  )
}

export default App
