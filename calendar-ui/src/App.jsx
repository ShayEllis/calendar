import { useReducer, useEffect } from 'react'
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

  useEffect(() => {
    const fetchCalendarDayData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/calendar')

        if (!response.ok) throw new Error(response.statusText)

        const calendarDayData = await response.json()
        dispatch({ type: 'app/loadCalenderDayData', payload: calendarDayData })
      } catch (e) {
        console.error(
          `Failed to fetch calendar data from server - ${e.message}`
        )
      }
    }
    fetchCalendarDayData()
  }, [])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <Calendar />
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
