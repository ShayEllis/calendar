import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarDay.css'

export const CalendarDay = ({ day, todaysDate }) => {
  const classes = useMemo(() => {
    if (todaysDate.getMonth() !== day.getMonth()) {
      return 'notCurrentMonth calendarCell'
    } else if (todaysDate.getDate() === day.getDate()) {
      return 'currentDate calendarCell'
    } else {
      return 'calendarCell'
    }
  }, [day])

  return (
    <td className='calendarCellContainer'>
      <div className={classes}>{day.getDate()}</div>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object,
  todaysDate: PropTypes.object,
}
