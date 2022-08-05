// ################################################################################################

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

// Route - GET - Upload
function routeGetUpload(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-form'`);
    res.render(process.env.VIEW_UPLOAD, {
      web_title: process.env.WEB_TITLE,
      web_signature: process.env.WEB_SIGNATURE,
      route_gallery: process.env.ROUTE_GALLERY,
      route_images: process.env.ROUTE_IMAGES,
      route_index: process.env.ROUTE_INDEX,
      route_upload: process.env.ROUTE_UPLOAD,
      page: 'upload-form',
    });
    res.end();
  } catch (error) {
    console.error(error);
    res.send(`${timeStamp()} - Get upload error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeGetUpload;
