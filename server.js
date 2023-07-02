// ################################################################################################

// Photo-Gallery - node.js express photo-gallery website
// Copyright (C) 2022  Daniel Bates

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
if (process.debugPort) console.log(`${timeStamp()} - Debug on port ${process.debugPort}`); // Log debug port

// ################################################################################################

// Check upload folder
if (process.env.PATH_UPLOADS.endsWith('/') === false) process.env.PATH_UPLOADS = `${process.env.PATH_UPLOADS}/`;
console.log(`${timeStamp()} - Upload folder: '${process.env.PATH_UPLOADS}'`);
try {
  if (fs.lstatSync(process.env.PATH_UPLOADS).isDirectory() === false) throw Error;
} catch (error) {
  console.error(`${timeStamp()} - Error: Cannot access upload folder: '${process.env.PATH_UPLOADS}'`);
  console.error(`${timeStamp()} - Exit`);
  process.exit();
}

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
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const originalUrl = `${protocol}://${host}${req.originalUrl}`;
  console.log(`${timeStamp()} - Received HTTP ${req.method} request for '${originalUrl}'`);
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
