
// ################################################################################################

// Imports
import dotevn from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

// ################################################################################################

// Routes

// ################################################################################################

// dotEnv
dotevn.config()
console.info('Server Started')

// ################################################################################################

// Express
const app = express()
app.enable('trust proxy')
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'pug') // EventSub

// ################################################################################################

// HTTP requests all logged
app.all('*', (req, res, next) => {
  console.info(`HTTP ${req.method} request received for '${req.path}'`)
  next() // pass control to the next handler
})

// HTTP request for index page
// app.get(ROUTE_INDEX, (req, res) => { if (!res.writableEnded) { routeGetOverlay(req, res) } })

// HTTP request for passcode
app.get(process.env.ROUTE_PASSCODE, (req, res) => {
  console.info(`Processing ${req.method} request for '${req.path}`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})
app.post(process.env.ROUTE_PASSCODE, (req, res) => {
  console.info(`Processing ${req.method} request for '${req.path}`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for gallery page
app.get(process.env.ROUTE_GALLERY, (req, res) => {
  console.info(`Processing ${req.method} request for '${req.path}`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for upload page
app.get(process.env.ROUTE_UPLOAD, (req, res) => {
  console.info(`Processing ${req.method} request for '${req.path}`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})
app.post(process.env.ROUTE_UPLOAD, (req, res) => {
  console.info(`Processing ${req.method} request for '${req.path}`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// ################################################################################################

// Listen for HTTP requests
app.listen(process.env.PORT, () => {
  console.info(`HTTP server started and listening to port ${process.env.PORT}`)
})

// ################################################################################################
