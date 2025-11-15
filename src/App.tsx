import './App.css'

import { LoadingScreen } from './Components/LoadingScreen'
import { Home } from './Pages/HomePage'


function App() {
  return (
    <>
    <div>
      <LoadingScreen />
      <Home/>
    </div>
    </>
  )
}

export default App
