// ################################################################################################

// Imports
import fs from 'fs';

// My Imports
import timeStamp from '../lib/time_stamp.mjs';
import createDateSeconds from '../lib/createdate_seconds.mjs';

// ################################################################################################

// Route - POST - Upload
function routePostUpload(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload'`);
    if (typeof req.files === 'undefined' || req.files.length === 0) throw new Error('No files selected');
    req.files.forEach(async (element) => {
      console.log(`${timeStamp()} - Upload complete for '${element.filename}'`);
      const createDatePrefix = await createDateSeconds(`${element.destination}${element.filename}`);
      console.log(`${timeStamp()} - Renaming uploaded file: ${element.filename}, ${createDatePrefix}-${element.filename}`);
      fs.rename(`${element.destination}${element.filename}`, `${element.destination}${createDatePrefix}-${element.filename}`, (error) => {
        if (error) console.log(error);
      });
    });
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-successful'`);
    res.render(process.env.VIEW_UPLOAD, {
      web_title: process.env.WEB_TITLE,
      web_signature: process.env.WEB_SIGNATURE,
      route_gallery: process.env.ROUTE_GALLERY,
      route_images: process.env.ROUTE_IMAGES,
      route_index: process.env.ROUTE_INDEX,
      route_upload: process.env.ROUTE_UPLOAD,
      page: 'upload-successful',
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).send(`${timeStamp()} - Post upload error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routePostUpload;
