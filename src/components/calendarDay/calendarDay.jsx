import { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarDay.css'
import { CalendarData } from '../calendarData/calendarData'
import { getDayIdentifier } from '../../utils/utils'
import { handleDayClick } from '../../actions/appAction'
import { StateContext } from '../../context/stateContext'

export const CalendarDay = ({ day }) => {
  const state = useContext(StateContext)

  // Set differnet styles for the current day of the month and any days that are not part of the current month
  const classes = useMemo(() => {
    if (state.calendarMonth.getMonth() !== day.getMonth()) {
      return 'notCurrentMonth calendarCell'
    } else if (getDayIdentifier(state.todaysDate) === getDayIdentifier(day)) {
      return 'currentDate calendarCell'
    } else {
      return 'calendarCell'
    }
  }, [day, state.todaysDate, state.calendarMonth])

  return (
    <td className='calendarCellContainer'>
      <div className={classes} onClick={() => handleDayClick(day)}>
        <CalendarData
          date={day.getDate()}
          dayData={state.dayData[getDayIdentifier(day)]}
        />
      </div>
    </td>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object.isRequired,
}
