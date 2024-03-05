import PropTypes from 'prop-types'
import './calendarData.css'

export const CalendarData = ({ classes, date, dayData, highlightDay }) => {
  return (
    <div className={classes}>
      <span className='calendarDate'>{date}</span>
      <div
        className='calendarDataContainer'
        style={highlightDay ? { backgroundColor: '#5BBB60' } : undefined}>
        {!!dayData && <div className='calendarData'>{`$${dayData}`}</div>}
      </div>
    </div>
  )
}

CalendarData.propTypes = {
  classes: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  data: PropTypes.string,
  highlightDay: PropTypes.bool,
}
