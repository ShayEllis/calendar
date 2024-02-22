// import { useMemo, useState, useEffect} from "react"
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CalendarDays } from '../calendarDays/calendarDays'

export const CalendarWeeks = ({ dayElements, numOfWeeks, week }) => {
  const [weekElements, setWeekElements] = useState(null)

  useEffect(() => {
    const elementArray = []
    for (let i = week * 7; i < week * 7 + 7; i++) {
      elementArray.push(dayElements[i])
    }
    setWeekElements(elementArray)
  }, [dayElements, numOfWeeks])

  return <tr>{weekElements}</tr>
}

CalendarWeeks.propTypes = {
  dayElements: PropTypes.array,
  numOfWeeks: PropTypes.number,
  week: PropTypes.number,
}
