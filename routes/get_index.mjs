// ################################################################################################

// Imports

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

// Route - Index
function routeIndex(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'index'`);
    res.render(process.env.VIEW_INDEX, { web_title: process.env.WEB_TITLE });
    res.end();
  } catch (error) {
    console.error(error);
    res.send(`${timeStamp()} - Index error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeIndex;
