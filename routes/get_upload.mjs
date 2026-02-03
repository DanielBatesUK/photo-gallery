// ################################################################################################

// My Imports
import timeStamp from "../lib/time_stamp.mjs";

// ################################################################################################

// Route - GET - Upload
function routeGetUpload(req, res) {
  try {
    console.log(
      `${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-form'`,
    );
    res.render("upload", {
      web_title: process.env.HEAD_TITLE,
      web_icon_type: process.env.HEAD_LINK_ICON_TYPE,
      web_icon_href: process.env.HEAD_LINK_ICON_HREF,
      web_signature: process.env.PAGE_SIGNATURE,
      page: "upload-form",
    });
    // res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send(`${timeStamp()} - Get upload error`);
    // res.end();
  }
}

// ################################################################################################

// Exports
export default routeGetUpload;
