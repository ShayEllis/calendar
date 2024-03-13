import { useReducer } from 'react'
import Arrow from '../../assets/arrow.png'
import './calendar.css'
import { generateCalendarDays } from '../../utils/utils'
import { CalendarWeek } from '../calendarWeek/calendarWeek'
import { Modal } from '../modal/modal'
import { getDayIdentifier } from '../../utils/utils'
import { reducer, initialState } from '../../reducers/calendarReducer'

export const Calendar = () => {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)

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
  const weeksInCurrentMonth = Math.ceil(
    (new Date(
      state.calendarMonth.getFullYear(),
      state.calendarMonth.getMonth() + 1,
      0
    ).getDate() +
      new Date(
        state.calendarMonth.getFullYear(),
        state.calendarMonth.getMonth(),
        1
      ).getDay()) /
      7
  )
  // Use utils function to generate the days in the calender
  const days = generateCalendarDays(state.calendarMonth)

  // Sends the correct action to the reducer when an input field in the reducer is changed
  const handleInputChange = ({ target }, dayIdentifier) => {
    switch (target.name) {
      case 'moneySpent':
        dispatch({
          type: 'changeDayData',
          payload: { dayIdentifier, value: target.value },
        })
        break
      case 'hasBackground':
        dispatch({
          type: 'changeHighlightDay',
          payload: { dayIdentifier, value: !state.highlightDay },
        })
        break
      default:
        console.error(`No input with the name '${target.name}'`)
    }
  }

  const handlePreviousArrowClick = () => {
    dispatch({ type: 'previousMonth' })
  }

  const handleNextArrowClick = () => {
    dispatch({ type: 'nextMonth' })
  }

  const handleDayClick = (day) => {
    const dayIdentifier = getDayIdentifier(day)

    dispatch({ type: 'dayClick', payload: dayIdentifier })
  }
  console.log(state)

  return (
    <table id='calendar'>
      <thead>
        <tr>
          <th colSpan={7}>
            <Modal
              handleInputChange={handleInputChange}
              selectedDay={state.selectedDay}
              dayData={state.dayData ? state.dayData : undefined}
            />
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
                  months[state.calendarMonth.getMonth()]
                } ${state.calendarMonth.getFullYear()}`}
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
        {Array(weeksInCurrentMonth)
          .fill(null)
          .map((week, idx) => (
            <CalendarWeek
              key={`${state.calendarMonth.getMonth()}${state.calendarMonth.getFullYear()}${idx}`}
              calendarMonth={state.calendarMonth}
              todaysDate={state.todaysDate}
              days={days}
              week={idx}
              handleDayClick={handleDayClick}
              dayData={state.dayData}
            />
          ))}
      </tbody>
    </table>
  )
}
