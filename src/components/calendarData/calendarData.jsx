import PropTypes from 'prop-types'
import './calendarData.css'

//className={classes}

export const CalendarData = ({ date, dayData }) => {
  return (
    <>
      <span className='calendarDate'>{date}</span>
      <div
        className='calendarDataContainer'
        style={dayData?.highlighted ? { backgroundColor: '#5BBB60' } : undefined}>
        {!!dayData && <div className='calendarData'>{`$${dayData.data}`}</div>}
      </div>
    </>
  )
}

CalendarData.propTypes = {
  date: PropTypes.number.isRequired,
  dayData: PropTypes.string,
  highlightDay: PropTypes.bool,
}
