
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
console.log('Server Started')

// ################################################################################################

// Express
const app = express()
app.enable('trust proxy')
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'pug')

// ################################################################################################

// HTTP requests all logged
app.all('*', (req, res, next) => {
  console.log(`Received HTTP ${req.method} request for '${req.path}'`)
  next() // pass control to the next handler
})

// HTTP request for index page
app.get(process.env.ROUTE_INDEX, (req, res, next) => {
  console.log(`Processing 'index' for '${req.path}' HTTP ${req.method} request`)
  res.status(200).render(process.env.VIEW_INDEX)
  res.end()
  next()
})

// HTTP request for passcode
app.get(process.env.ROUTE_PASSCODE, (req, res) => {
  console.log(`Processing 'passcode' HTTP ${req.method} request for '${req.path}'`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})
app.post(process.env.ROUTE_PASSCODE, (req, res) => {
  console.log(`Processing 'passcode' HTTP ${req.method} request for '${req.path}'`)
  res.status(200).render(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for gallery page
app.get(process.env.ROUTE_GALLERY, (req, res) => {
  console.log(`Processing 'gallery' HTTP ${req.method} request for '${req.path}'`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for upload page
app.get(process.env.ROUTE_UPLOAD, (req, res) => {
  console.log(`Processing 'upload' HTTP ${req.method} request for '${req.path}'`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})
app.post(process.env.ROUTE_UPLOAD, (req, res) => {
  console.log(`Processing 'upload' HTTP ${req.method} request for '${req.path}'`)
  res.status(200).send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP requests all logged
app.all('*', (req, res, next) => {
  console.log(`Completed HTTP ${req.method} request for '${req.path}'`)
})

// ################################################################################################

// Listen for HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`HTTP server started and listening to port ${process.env.PORT}`)
})

// ################################################################################################
