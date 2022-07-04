
// ################################################################################################

// Imports
import dotevn from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { v4 as uuidV4 } from 'uuid'
import sharp from 'sharp'

// ################################################################################################

// Routes

// ################################################################################################

// Time stamp
function timeStamp(){
  const newDate = new Date()
  return newDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

// Starting
console.log(`${timeStamp()} - Server Starting`)


// ################################################################################################

// dotEnv
dotevn.config()

// ################################################################################################

// Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PATH_UPLOADS)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${uuidV4()}${path.extname(file.originalname)}`);
  }
})
var upload = multer({ storage: storage })

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
  console.log(`${timeStamp()} - Received HTTP ${req.method} request for '${req.path}'`)
  next() // pass control to the next handler
})

// HTTP request for index page
app.get(process.env.ROUTE_INDEX, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'index'`)
  res.render(process.env.VIEW_INDEX)
  res.end()
})

// HTTP request for passcode
// GET
app.get(process.env.ROUTE_PASSCODE, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'passcode'`)
  res.send(`{"${req.method}":"${req.path}"}`)
  res.end()
})
// POST
app.post(process.env.ROUTE_PASSCODE, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'passcode'`)
  res.send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for gallery page
app.get(process.env.ROUTE_GALLERY, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'gallery'`)
  res.send(`{"${req.method}":"${req.path}"}`)
  res.end()
})

// HTTP request for upload page
// GET
app.get(process.env.ROUTE_UPLOAD, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload'`)
  res.render(process.env.VIEW_UPLOAD)
  res.end()
})
// POST
app.post(process.env.ROUTE_UPLOAD, upload.array('photos'), (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload'`)
  try{
    if(typeof req.files === 'undefined' || req.files.length === 0) throw new Error('No files selected')
    req.files.forEach(element => {
      console.log(`${timeStamp()} - Uploading photo '${element.filename}':`)
      console.log(element)
      console.log(`${timeStamp()} - Creating jpeg thumbnail for '${element.filename}'`)
      sharp(element.path)
        .resize(300, 200)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`${process.env.PATH_THUMBNAILS}${element.filename}.jpeg`)
        //.toFile(`${process.env.PATH_THUMBNAILS}${element.filename.replace(/\.[^/.]+$/, ".jpeg")}`)
      console.log(`${timeStamp()} - Upload complete for '${element.filename}'`)    
    })
    res.send(`Uploaded ${req.files.length} file(s) successfully`)    
  } catch (error) {
    console.log(`${timeStamp()} - Error with upload submission:`)
    console.log(error)
    res.send(error.message)    
  }
  res.end()
})

// ################################################################################################

// Listen for HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`${timeStamp()} - HTTP server started and listening to port ${process.env.PORT}`)
})

// ################################################################################################
