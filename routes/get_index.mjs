// ################################################################################################

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

// Route - Index
function routeIndex(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'index'`);
    res.render(process.env.VIEW_INDEX, {
      web_title: process.env.WEB_TITLE,
      web_css: process.env.WEB_CSS,
      web_icon_type: process.env.WEB_ICON_TYPE,
      web_icon_href: process.env.WEB_ICON_HREF,
      route_gallery: process.env.ROUTE_GALLERY,
      route_images: process.env.ROUTE_IMAGES,
      route_index: process.env.ROUTE_INDEX,
      route_upload: process.env.ROUTE_UPLOAD,
    });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send(`${timeStamp()} - Index error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeIndex;
