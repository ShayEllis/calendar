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
    case 'app/loadCalenderDayData': {
      const serverDayData = action.payload.reduce((acc, val) => {
        acc[val.dateString] = {moneySpent: val.moneySpent, background: val.background}
        return acc
      }, {})
      return {...state, dayData: {...state.dayData, ...serverDayData}}
    }
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
      if (!state.dayData[action.payload]) {
        return {
          ...state,
          selectedDay: action.payload,
          dayData: {
            ...state.dayData,
            [action.payload]: { moneySpent: 0, background: false },
          },
        }
      } else {
        return { ...state, selectedDay: action.payload }
      }
    }
    case 'modal/clearDayValues': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload]: { moneySpent: 0, background: false },
        },
      }
    }
    case 'modal/changeMoneySpent': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {
            ...state.dayData[action.payload.dayIdentifier],
            moneySpent: action.payload.value,
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
            background: action.payload.value,
          },
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
