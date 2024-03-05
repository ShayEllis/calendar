const initialState = {}

export const createInitalState = (day) => {
  const currentDayString = `${day.getMonth()}${day.getDate()}${day.getFullYear()}`
  if (!initialState[currentDayString])
    initialState[currentDayString] = { dayData: '', highlightDay: false }
  return initialState[currentDayString]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'changeDayData': {
      // console.log(initialState) // holds inital render state, retreive state from here - FIX THIS
      return { ...state, dayData: action.payload }
    }
    case 'changeHighlightDay': {
      // console.log(initialState) // holds inital render state, retreive state from here - FIX THIS
      return { ...state, highlightDay: action.payload }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
