// ################################################################################################

// Imports
import dotevn from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// My Imports
import timeStamp from './lib/time_stamp.mjs';
import upload from './lib/upload_settings.mjs';
import authorisationCheck from './lib/authorisation_check.mjs';
import createDateSeconds from './lib/createdate_seconds.mjs';

// ################################################################################################

// Routes
import routeIndex from './routes/get_index.mjs';
import routeGallery from './routes/get_gallery.mjs';
import routeGetUpload from './routes/get_upload.mjs';
import routePostUpload from './routes/post_upload.mjs';
import routeImages from './routes/get_images.mjs';

// ################################################################################################

// dotEnv
dotevn.config();

// ################################################################################################

// Starting
console.log(`${timeStamp()} - Server Starting`);

// ################################################################################################

// Express
const app = express();
app.enable('trust proxy');
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'pug');

// ################################################################################################

// HTTP requests all
app.all('*', (req, res, next) => {
  console.log(`${timeStamp()} - Received HTTP ${req.method} request for '${req.path}'`);
  next();
});

// HTTP request for index page
app.get(process.env.ROUTE_INDEX, routeIndex);

// HTTP request for gallery page
app.get(process.env.ROUTE_GALLERY, routeGallery);

// HTTP request for upload page
app.get(process.env.ROUTE_UPLOAD, authorisationCheck, routeGetUpload); // GET
app.post(process.env.ROUTE_UPLOAD, [authorisationCheck, upload.array('photos')], routePostUpload); // POST

// HTTP request for images
app.get(`${process.env.ROUTE_IMAGES}/:image`, routeImages);

// ################################################################################################

// Listen for HTTP requests
app.listen(process.env.PORT, () => {
  console.log(`${timeStamp()} - HTTP server started and listening to port ${process.env.PORT}`);
});

// ################################################################################################

const photoFilenames = fs.readdirSync(process.env.PATH_UPLOADS);
photoFilenames.forEach(async (value) => {
  console.log(`CreateDate filename: '${await createDateSeconds(`${process.env.PATH_UPLOADS}${value}`)}-${value}'`);
});
