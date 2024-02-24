import { useEffect, useState } from 'react'
import { CalendarWeek } from '../calendarWeek/calendarWeek'
import './calendar.css'

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
  const [days, setDays] = useState(Array(42).fill(null))

  useEffect(() => {
    setDays((d) => {
      // Create a Date object and set it to the first of the month
      const startOfCalendar = new Date(
        todaysDate.getFullYear(),
        todaysDate.getMonth(),
        1
      )
      // If the month does not start on SUN, the start of the calendar, get the correct day number for the previous month
      if (startOfCalendar.getDay() > 0) {
        startOfCalendar.setDate(
          startOfCalendar.getDate() - startOfCalendar.getDay()
        )
      }
      // Map the number of days in the calendar and create an array to build the calendar from
      return d.map(() => {
        const currentDay = startOfCalendar.getDate()
        startOfCalendar.setDate(startOfCalendar.getDate() + 1)

        return currentDay
      })
    })
  }, [])

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
