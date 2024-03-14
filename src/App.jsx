import { useReducer } from 'react'
import { Calendar } from './components/calendar/calendar'
import './App.css'
import { reducer, initialState } from './reducers/appReducer'
import { getDayIdentifier } from './utils/utils'
import { StateContext } from './context/stateContext'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <Calendar />
    </StateContext.Provider>
  )
}

export default App
