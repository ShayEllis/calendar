import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarWeek.css'
import { CalendarDay } from '../calendarDay/calendarDay'
import { getDayIdentifier } from '../../utils/utils'

export const CalendarWeek = ({
  calendarMonth,
  todaysDate,
  days,
  week,
  handleDayClick,
  dayData
}) => {
  // Create an array of days in this specific week
  const daysInWeek = useMemo(() => {
    const dayArray = []
    for (let i = week * 7; i < week * 7 + 7; i++) {
      dayArray.push(days[i])
    }
    return dayArray
  }, [week, days])

  return (
    <tr>
      {daysInWeek.map((day) => {
        return (
          <CalendarDay
            key={getDayIdentifier(day)}
            day={day}
            calendarMonth={calendarMonth}
            todaysDate={todaysDate}
            handleDayClick={handleDayClick}
            dayData={dayData}
          />
        )
      })}
    </tr>
  )
}

CalendarWeek.propTypes = {
  calendarMonth: PropTypes.object.isRequired,
  todaysDate: PropTypes.object.isRequired,
  days: PropTypes.array.isRequired,
  week: PropTypes.number.isRequired,
  handleDayClick: PropTypes.func.isRequired,
}
