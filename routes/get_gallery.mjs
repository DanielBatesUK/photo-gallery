// ################################################################################################

// Imports
import fs from "fs";

// My Imports
import timeStamp from "../lib/time_stamp.mjs";

// ################################################################################################

// Route - Gallery
function routeGallery(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'gallery'`);
    console.log(`${timeStamp()} - Getting photo filenames:`);
    let paramStart = 0;
    if (typeof req.query.s !== "undefined") {
      paramStart = Number(req.query.s);
    }
    let paramModalTime = false;
    if (typeof req.query.m !== "undefined") {
      paramModalTime = Number(req.query.m);
    }
    const photoFilenames = fs.readdirSync(process.env.PATH_UPLOADS);
    res.render("gallery", {
      web_title: process.env.HEAD_TITLE,
      web_icon_type: process.env.HEAD_LINK_ICON_TYPE,
      web_icon_href: process.env.HEAD_LINK_ICON_HREF,
      web_signature: process.env.PAGE_SIGNATURE,
      photos_per_page: process.env.PHOTOS_PER_PAGE,
      photos_pagination: process.env.PHOTOS_PAGINATION,
      photos_pagination_buffer: process.env.PHOTOS_PAGINATION_BUFFER,
      photoFiles: photoFilenames,
      paramStart,
      paramModalTime,
    });
    // res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send(`${timeStamp()} - Gallery error`);
    // res.end();
  }
}

// ################################################################################################

// Exports
export default routeGallery;
