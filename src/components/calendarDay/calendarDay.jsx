import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarDay.css'
import { Modal } from '../modal/modal'
import { CalendarData } from '../calendarData/calendarData'

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
  }, [day, todaysDate])

  return (
    <td className='calendarCellContainer'>
      <Modal classes={classes}>
        <CalendarData classes={classes} date={day.getDate()} />
      </Modal>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
  todaysDate: PropTypes.object.isRequired,
}
