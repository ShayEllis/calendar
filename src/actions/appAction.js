// Actions
const modalInputChange = (event, dayIdentifier) => {
  switch (event.target.name) {
    case 'moneySpent':
      dispatch({
        type: 'modal/changeDayInputVal',
        payload: { dayIdentifier, value: event.target.value },
      })
      break
    case 'hasBackground':
      dispatch({
        type: 'modal/changeBackground',
        payload: { dayIdentifier, value: !state.dayData[dayIdentifier].highlighted },
      })
      break
    default:
      console.error(`No input with the name '${event.target.name}'`)
  }
}

const handlePreviousArrowClick = () => {
  dispatch({ type: 'calendar/previousMonth' })
}

const handleNextArrowClick = () => {
  dispatch({ type: 'calendar/nextMonth' })
}

const handleDayClick = (day) => {
  const dayIdentifier = getDayIdentifier(day)

  dispatch({ type: 'day/dayClick', payload: dayIdentifier })
}

export { modalInputChange, handlePreviousArrowClick, handleNextArrowClick, handleDayClick}