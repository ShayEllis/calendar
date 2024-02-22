import { useEffect, useState } from 'react'
import { CalendarWeeks } from '../calendarWeeks/calendarWeeks'
import './calendar.css'

export const Calendar = () => {
  const todaysDate = new Date()
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
  const numOfWeeks = Math.ceil(
    new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0).getDate() /
      7
  )
  const [dayElements, setDayElements] = useState(Array(42).fill(null))

  useEffect(() => {
    setDayElements((d) => {
      // Create a Date object and set it to the first of the month
      const startOfCalendar = new Date(
        todaysDate.getFullYear(),
        todaysDate.getMonth(),
        1
      )
      // Move back to SUN which is the start of the calendar and get the correct day number for the previous month
      startOfCalendar.setDate(
        startOfCalendar.getDate() - startOfCalendar.getDay()
      )
      // Map the number of days in the calendar and create an array to build the calendar from
      return d.map((day, idx) => {
        const currentDay = startOfCalendar.getDate()
        startOfCalendar.setDate(startOfCalendar.getDate() + 1)

        return (
          <td key={idx} className='calendarCellContainer'>
            <div className='calendarCell'>{currentDay}</div>
          </td>
        )
      })
    })
  }, [])

  console.log('Day number of the month: ', todaysDate.getDate())
  console.log('Day number of the week:', todaysDate.getDay())
  console.log(todaysDate.getMinutes())

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
            <CalendarWeeks key={idx} dayElements={dayElements} numOfWeeks={numOfWeeks} week={idx} />
          ))}
      </tbody>
    </table>
  )
}
