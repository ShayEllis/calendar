// import { useMemo, useState, useEffect} from "react"
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarWeek.css'
import { CalendarDay } from '../calendarDay/calendarDay'

export const CalendarWeek = ({ calendarMonth, todaysDate, days, week, handleDayClick }) => {
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
            key={`${day.getMonth()}${day.getDate()}${day.getFullYear()}`}
            day={day}
            calendarMonth={calendarMonth}
            todaysDate={todaysDate}
            handleDayClick={handleDayClick}
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
}
