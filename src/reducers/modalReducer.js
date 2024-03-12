// Seperate reducer state that will hold day infomation when the calendar month is changed
const initialState = {}

export const createInitalState = (day) => {
  // Unique identifier for the day informaiton
  const currentDayString = `${day.getMonth()}${day.getDate()}${day.getFullYear()}`
  // If the day already had data return to the component that otherwise return enpty state
  if (!initialState[currentDayString])
    initialState[currentDayString] = { dayData: '', highlightDay: false }
  return initialState[currentDayString]
}

export const reducer = (state, action) => {
  // Unique identifier to retrieve day information
  const currentDayString = `${action.payload.day.getMonth()}${action.payload.day.getDate()}${action.payload.day.getFullYear()}`
  switch (action.type) {
    case 'changeDayData': {
      // Update the day informaiton in the reducer state then return it to the component
      initialState[currentDayString] = {
        ...state,
        dayData: action.payload.value,
      }
      return initialState[currentDayString]
    }
    case 'changeHighlightDay': {
      initialState[currentDayString] = {
        ...state,
        highlightDay: action.payload.value,
      }
      return initialState[currentDayString]
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}


