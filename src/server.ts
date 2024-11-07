import express from 'express'
import payload from 'payload'
import { nextApp, nextHandler } from './next-utils'

const app = express()
const PORT = process.env.PORT || 3000

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server Error:', err)
  res.status(500).json({ error: 'Internal Server Error', details: err.message })
})

const start = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || '',
      express: app,
      onInit: () => {
        console.log(`Payload Admin URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
      },
    })

    app.use((req, res) => {
      console.log('Handling request:', req.url)
      return nextHandler(req, res)
    })

    nextApp.prepare().then(() => {
      app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`)
        console.log(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
      })
    })
  } catch (error) {
    console.error('Server startup error:', error)
  }
}

start().catch((err) => {
  console.error('Fatal server error:', err)
  process.exit(1)
})