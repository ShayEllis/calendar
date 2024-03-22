import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/api/calendar', async (req, res) => {
  const calendarData = await prisma.Calendar.findMany()
  res.json(calendarData)
})

app.post('/api/calendar', async (req, res) => {
  const { dateString, moneySpent, background } = req.body

  if (!dateString || typeof background !== 'boolean') {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const note = await prisma.Calendar.create({
      data: { dateString, moneySpent, background },
    })
    res.json(note)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.put('/api/calendar/:dateString', async (req, res) => {
  // change this to use dateString
  const { moneySpent, background } = req.body
  const dateString = req.params.dateString // change this to use dateString
  if (typeof background !== 'boolean') {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const updateCalendarDay = await prisma.Calendar.update({
      where: { dateString }, // change this to use dateString
      data: { moneySpent, background },
    })
    res.json(updateCalendarDay)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

app.delete('/api/calendar/:id', async (req, res) => {
  // change this to use dateString
  const id = parseInt(req.params.id)

  try {
    await prisma.CalendarDays.delete({
      where: { id }, // change this to use dateString
    })
    res.status(204).send()
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

// const closeDatabaseConnection = async (queryFunction) => {
//   const result = await queryFunction()

// }
