
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
import fs from 'fs'

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

// Secret hash
function secretHash(string = process.env.PASSCODE) {
  return crypto.createHash('md5').update(string + process.env.SESSION_SECRET).digest("hex")
}

// Authorised
function authorisationCheck (req, res, next) {
  console.log(`${timeStamp()} - Authorising HTTP ${req.method} request for 'upload'`)
  try {
    // Check query param and redirect
    if (typeof req.query.p !== 'undefined') {
      console.log(`${timeStamp()} - Setting user authorisation cookie for 'upload' with supplied passcode parameter`)
      res.cookie('hash', secretHash(req.query.p), {signed: true, httpOnly: true, sameSite: 'strict', maxAge: 31556926000, secure: true})
      console.log(`${timeStamp()} - Redirecting back to 'upload' for re-authorisation`)
      res.redirect(process.env.ROUTE_UPLOAD)
      res.end()
      return
    }
    if (typeof req.signedCookies.hash !== 'undefined' && req.signedCookies.hash === secretHash()) {
      //Authorised
      console.log(`${timeStamp()} - User authorisation cookie for 'upload' is authorised`)
      next()
    } else {
      res.cookie('hash', 'removed', {signed: true, httpOnly: true, sameSite: 'strict', maxAge: 0, secure: true})
      throw new Error('Incorrect passcode in user authorisation cookie')
    }
  } catch (error) {  
    console.log(`${timeStamp()} - Authorisation Error: ${error.message}`)
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'passcode-form'`)
    res.render(process.env.VIEW_UPLOAD, {web_title: process.env.WEB_TITLE, page: 'passcode-form'})
    res.end()
  }
}

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
  res.render(process.env.VIEW_INDEX, {web_title: process.env.WEB_TITLE})
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
  console.log(`${timeStamp()} - Getting photo filenames:`)
  const photoFilenames = fs.readdirSync(process.env.PATH_PHOTOS)
  console.log(photoFilenames)
  res.render(process.env.VIEW_GALLERY, {web_title: process.env.WEB_TITLE, photoFiles: photoFilenames})
  res.end()
})

// HTTP request for upload page
// GET
app.get(process.env.ROUTE_UPLOAD, authorisationCheck, (req, res) => {
  console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-form'`)
  res.render(process.env.VIEW_UPLOAD, {web_title: process.env.WEB_TITLE, page: 'upload-form'})
  res.end()
})
// POST
app.post(process.env.ROUTE_UPLOAD, [authorisationCheck, upload.array('photos')], (req, res) => {
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
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-successful'`)
    res.render(process.env.VIEW_UPLOAD, {web_title: process.env.WEB_TITLE, page: 'upload-successful'})
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
