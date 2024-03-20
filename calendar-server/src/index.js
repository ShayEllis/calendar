import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/api/calendar', async (req, res) => {
  const calendarDays = await prisma.CalendarDays.findMany()
  res.json(calendarDays)
})

app.post('/api/calendar', async (req, res) => {
  const { dateString, moneySpent, background } = req.body

  if (!dateString || !background) {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const note = await prisma.CalendarDays.create({
      data: { dateString, moneySpent, background },
    })
    res.json(note)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.put('/api/calendar/:id', async (req, res) => {
  // change this to use dateString
  const { dateString, moneySpent, background } = req.body
  const id = parseInt(req.params.id) // change this to use dateString

  if (!dateString || !background) {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const updateCalendarDay = await prisma.CalendarDays.update({
      where: { id },
      data: { dateString, moneySpent, background },
    })
    res.json(updateCalendarDay)
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
