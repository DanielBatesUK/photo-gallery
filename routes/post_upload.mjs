// ################################################################################################

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

// Route - POST - Upload
function routePostUpload(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload'`);
    if (typeof req.files === 'undefined' || req.files.length === 0) throw new Error('No files selected');
    req.files.forEach((element) => {
      console.log(`${timeStamp()} - Upload complete for '${element.filename}'`);
    });
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'upload-successful'`);
    res.render(process.env.VIEW_UPLOAD, { web_title: process.env.WEB_TITLE, page: 'upload-successful' });
    res.end();
  } catch (error) {
    console.log(error);
    res.send(`${timeStamp()} - Post upload error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routePostUpload;
