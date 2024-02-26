import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarDay.css'

export const CalendarDay = ({ day, todaysDate }) => {
  // Set differnet styles for the current day of the month and any days that are not part of the current month
  const classes = useMemo(() => {
    if (todaysDate.getMonth() !== day.getMonth()) {
      return 'notCurrentMonth calendarCell'
    } else if (todaysDate.getDate() === day.getDate()) {
      return 'currentDate calendarCell'
    } else {
      return 'calendarCell'
    }
  }, [day])

  const handleClick = (event) => {
    console.log(event.target.classList.toggle('calenderCellClicked'))
    // event.target.classList
  }

  return (
    <td className='calendarCellContainer'>
      <div className={classes} onClick={handleClick}>
        {day.getDate()}
      </div>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object,
  todaysDate: PropTypes.object,
}
