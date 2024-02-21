import { CalendarCell } from "../calendarCell/calendarCell"
import './calendar.css'

export const Calendar = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  

  return (
    <table id='calendar'>
      <thead>
        <tr>
          {weekDays.map(day => <th key={day} className={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <CalendarCell />
          <CalendarCell />
          <CalendarCell />
          <CalendarCell />
          <CalendarCell />
          <CalendarCell />
          <CalendarCell />
        </tr>
      </tbody>
    </table>
  )
}