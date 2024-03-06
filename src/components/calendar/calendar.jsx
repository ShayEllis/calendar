import { useState } from 'react'
import { CalendarWeek } from '../calendarWeek/calendarWeek'
import Arrow from '../../assets/arrow.png'
import './calendar.css'
import { generateCalendarDays } from '../../utils/utils'

export const Calendar = () => {
  // Initialize state to a new date object that will be used later to generate the days of the month
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  // Create a new date object that will be used to reference the current day.
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
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      0
    ).getDate() +
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth(),
        1
      ).getDay()) /
      7
  )
  // Use utils function to generate the days in the calender
  const days = generateCalendarDays(calendarMonth)

  const handlePreviousArrowClick = () => {
    setCalendarMonth(
      (pre) => new Date(pre.getFullYear(), pre.getMonth() - 1, 1)
    )
  }

  const handleNextArrowClick = () => {
    setCalendarMonth(
      (pre) => new Date(pre.getFullYear(), pre.getMonth() + 1, 1)
    )
  }

  return (
    <table id='calendar'>
      <thead>
        <tr>
          <th colSpan={7}>
            <div className='headingContainer'>
              <div className='arrowContainer'>
                <img
                  src={Arrow}
                  alt='Previous Month'
                  className='arrow previousArrow'
                  onClick={handlePreviousArrowClick}
                />
              </div>

              <h2 className='calendarHeading'>
                {`${
                  months[calendarMonth.getMonth()]
                } ${calendarMonth.getFullYear()}`}
              </h2>
              <div className='arrowContainer'>
                <img
                  src={Arrow}
                  alt='Next Month'
                  className='arrow nextArrow'
                  onClick={handleNextArrowClick}
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          {weekDays.map((day) => (
            <th key={day}>
              <div className={`dayHeading ${day}`}>{day}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(numOfWeeks)
          .fill(null)
          .map((week, idx) => (
            <CalendarWeek
              key={`${calendarMonth.getMonth()}${calendarMonth.getFullYear()}${idx}`}
              calendarMonth={calendarMonth}
              todaysDate={todaysDate}
              days={days}
              week={idx}
            />
          ))}
      </tbody>
    </table>
  )
}
