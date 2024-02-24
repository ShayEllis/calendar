import PropTypes from 'prop-types'
import './calendarDay.css'

export const CalendarDay = ({ day }) => {
  return (
    <td className='calendarCellContainer'>
      <div className='calendarCell'>{day}</div>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.number,
}
