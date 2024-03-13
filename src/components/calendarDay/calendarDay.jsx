import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarDay.css'
import { CalendarData } from '../calendarData/calendarData'
import { getDayIdentifier } from '../../utils/utils'

export const CalendarDay = ({
  day,
  todaysDate,
  calendarMonth,
  handleDayClick,
  dayData
}) => {
  // Set differnet styles for the current day of the month and any days that are not part of the current month
  const classes = useMemo(() => {
    if (calendarMonth.getMonth() !== day.getMonth()) {
      return 'notCurrentMonth calendarCell'
    } else if (getDayIdentifier(todaysDate) === getDayIdentifier(day)) {
      return 'currentDate calendarCell'
    } else {
      return 'calendarCell'
    }
  }, [day, todaysDate, calendarMonth])
  console.log(dayData)

  return (
    <td className='calendarCellContainer'>
      <div className={classes} onClick={() => handleDayClick(day)}>
        <CalendarData date={day.getDate()} dayData={dayData[getDayIdentifier(day)]} />
      </div>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  todaysDate: PropTypes.object.isRequired,
  calendarMonth: PropTypes.object.isRequired,
  handleDayClick: PropTypes.func.isRequired,
}
