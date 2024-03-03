import './calendarData.css'

export const CalendarData = ({ classes, date, data, highlightDay }) => {
  return (
    <div className={classes}>
      <span className='calendarDate'>{date}</span>
      <div className='calendarDataContainer' style={highlightDay ? { backgroundColor: '#5BBB60'} : undefined}>
        {!!data && <div className='calendarData'>{`$${data}`}</div>}
      </div>
    </div>
  )
}
