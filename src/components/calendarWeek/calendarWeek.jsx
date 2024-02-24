// import { useMemo, useState, useEffect} from "react"
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import './calendarWeek.css'
import { CalendarDay } from '../calendarDay/calendarDay'

export const CalendarWeek = ({ todaysDate, days, week }) => {
  const daysInWeek = useMemo(() => {
    const dayArray = []
    for (let i = week * 7; i < week * 7 + 7; i++) {
      dayArray.push(days[i])
    }
    return dayArray
  }, [days])

  return (
    <tr>
      {daysInWeek.map((day, idx) => {
        return <CalendarDay key={idx} day={day} />
      })}
    </tr>
  )
}

CalendarWeek.propTypes = {
  todaysDate: PropTypes.object,
  days: PropTypes.array,
  week: PropTypes.number,
}
