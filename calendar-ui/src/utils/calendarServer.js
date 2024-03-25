const apiURI = 'http://localhost:3000/api/calendar'

export const calendarServer = {
  async fetchCalendarDayData(stateDispatchFunc) {
    try {
      const response = await fetch(apiURI)
      if (!response.ok) throw new Error(await response.text())

      const calendarDayData = await response.json()
      return calendarDayData
    } catch (e) {
      console.error(e.message)
    }
  },
  async updateCalendarDayData(dateString, data) {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(`${apiURI}/${dateString}`, options)
      if (!response.ok) throw new Error(await response.text())
    } catch (e) {
      console.error(e.message)
    }
  },
}
