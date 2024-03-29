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
      web_css: process.env.WEB_CSS,
      web_icon_type: process.env.WEB_ICON_TYPE,
      web_icon_href: process.env.WEB_ICON_HREF,
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
    res.status(500).send(`${timeStamp()} - Get upload error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeGetUpload;
