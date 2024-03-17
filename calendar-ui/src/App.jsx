import { useReducer } from 'react'
import { Calendar } from './components/calendar/calendar'
import './App.css'
import { reducer, initialState } from './reducers/appReducer'
import {
  CalendarContext,
  CalendarDispatchContext,
} from './context/calendarContexts'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <Calendar />
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
