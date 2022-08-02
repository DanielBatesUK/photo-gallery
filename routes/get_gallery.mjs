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
    let paramModalTime = false;
    if (typeof req.query.m !== 'undefined') { paramModalTime = Number(req.query.m); }
    const photoFilenames = fs.readdirSync(process.env.PATH_UPLOADS);
    res.render(process.env.VIEW_GALLERY, { web_title: process.env.WEB_TITLE, web_signature: process.env.WEB_SIGNATURE, prefix_thumbnails: process.env.PREFIX_THUMBNAILS, prefix_previews: process.env.PREFIX_PREVIEWS, photoFiles: photoFilenames, paramStart, paramModalTime });
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
