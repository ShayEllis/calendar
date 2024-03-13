import { getDayIdentifier } from '../utils/utils'

export const initialState = {
  todaysDate: new Date(),
  calendarMonth: new Date(),
  dayData: {},
  selectedDay: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'previousMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() - 1,
          1
        ),
      }
    }
    case 'nextMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() - 1,
          1
        ),
      }
    }
    case 'dayClick': {
      return { ...state, selectedDay: action.payload }
    }
    case 'changeDayData': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {...state.dayData[action.payload.dayIdentifier], data: action.payload.value},
        },
      }
    }
    case 'changeHighlightDay': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {...state.dayData[action.payload.dayIdentifier], highlighted: action.payload.value},
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
