import { getDayIdentifier } from '../utils/utils'

// Initial state
export const initialState = {
  todaysDate: new Date(),
  calendarMonth: new Date(),
  dayData: {},
  selectedDay: null,
}

// Reducers
export const reducer = (state, action) => {
  switch (action.type) {
    case 'calendar/previousMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() - 1,
          1
        ),
      }
    }
    case 'calendar/nextMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() + 1,
          1
        ),
      }
    }
    case 'day/dayClick': {
      console.log(action.payload)
      return { ...state, selectedDay: action.payload }
    }
    case 'modal/initializeDayData': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payoad.dayIdentifier]: { inputVal: '', background: false },
        },
      }
    }
    case 'modal/changeDayInputVal': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {
            ...state.dayData[action.payload.dayIdentifier],
            data: action.payload.value,
          },
        },
      }
    }
    case 'modal/changeBackground': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {
            ...state.dayData[action.payload.dayIdentifier],
            highlighted: action.payload.value,
          },
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
