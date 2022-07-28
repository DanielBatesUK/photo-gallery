// ################################################################################################

// Imports
import fs from 'fs';

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

// Route - Gallery
function routeGallery(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'gallery'`);
    console.log(`${timeStamp()} - Getting photo filenames:`);
    let paramStart = 0;
    if (typeof req.query.s !== 'undefined') { paramStart = Number(req.query.s); }
    const photoFilenames = fs.readdirSync(process.env.PATH_UPLOADS);
    res.render(process.env.VIEW_GALLERY, { web_title: process.env.WEB_TITLE, photoFiles: photoFilenames, paramStart });
    res.end();
  } catch (error) {
    console.error(error);
    res.send(`${timeStamp()} - Gallery error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeGallery;
