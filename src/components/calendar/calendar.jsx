import { CalendarWeek } from '../calendarWeek/calendarWeek'
import './calendar.css'
import { generateCalendarDays } from '../../utils/utils'

export const Calendar = () => {
  // Create a new date object that weill be used later.
  const todaysDate = new Date()
  // Array of days and months that will be used to generate the calendar.
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ]
  // Calculate the number of weeks to show in the calendar
  const numOfWeeks = Math.ceil(
    (new Date(
      todaysDate.getFullYear(),
      todaysDate.getMonth() + 1,
      0
    ).getDate() +
      todaysDate.getDay()) /
      7
  )
  // Use utils function to generate the days in the calender
  const days = generateCalendarDays(todaysDate)

  // console.log('Day number of the month: ', todaysDate.getDate())
  // console.log('Day number of the week:', todaysDate.getDay())
  // console.log(todaysDate.getMinutes())

  return (
    <table id='calendar'>
      <thead>
        <tr>
          <th colSpan={7}>{`${
            months[todaysDate.getMonth()]
          } ${todaysDate.getFullYear()}`}</th>
        </tr>
        <tr>
          {weekDays.map((day) => (
            <th key={day} className={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(numOfWeeks)
          .fill(null)
          .map((week, idx) => (
            <CalendarWeek
              key={idx}
              todaysDate={todaysDate}
              days={days}
              week={idx}
            />
          ))}
      </tbody>
    </table>
  )
}
