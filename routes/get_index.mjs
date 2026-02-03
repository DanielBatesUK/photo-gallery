// ################################################################################################

// My Imports
import timeStamp from "../lib/time_stamp.mjs";

// ################################################################################################

// Route - Index
function routeIndex(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'index'`);
    res.render("index", {
      web_title: process.env.HEAD_TITLE,
      web_icon_type: process.env.HEAD_LINK_ICON_TYPE,
      web_icon_href: process.env.HEAD_LINK_ICON_HREF,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`${timeStamp()} - Index error`);
  }
}

// ################################################################################################

// Exports
export default routeIndex;
