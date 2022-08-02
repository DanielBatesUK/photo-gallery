// ################################################################################################

// Imports
import fs from 'fs';
import sharp from 'sharp';

// My Imports
import timeStamp from '../lib/time_stamp.mjs';

// ################################################################################################

function removePrefix(name, prefix) {
  const nameSplit = name.split(prefix);
  nameSplit.shift();
  return nameSplit.join();
}

function generateThumbnail(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating thumbnail: '${photoFilename}'`);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .resize(300, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 40 })
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

function generatePreview(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating preview: '${photoFilename}'`);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .resize(1080, 1080, { fit: 'inside' })
    .toFormat('jpeg')
    .jpeg({ quality: 60 })
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}
// ################################################################################################

// Route - Images
function routeImages(req, res) {
  try {
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'image file'`);
    let currentPrefix = false;
    if (req.params.image.startsWith(process.env.PREFIX_THUMBNAILS)) { currentPrefix = process.env.PREFIX_THUMBNAILS; }
    if (req.params.image.startsWith(process.env.PREFIX_PREVIEWS)) { currentPrefix = process.env.PREFIX_PREVIEWS; }
    if (currentPrefix) {
      // Image request
      console.log(`${timeStamp()} - Image requested for '${req.params.image}'`);
      const photoFilename = removePrefix(req.params.image, currentPrefix);
      // Check photo file exists
      if (fs.existsSync(process.env.PATH_UPLOADS + photoFilename)) {
        // Photo file exists
        console.log(`${timeStamp()} - Photo file exists for image: '${photoFilename}'`);
        if (currentPrefix === process.env.PREFIX_THUMBNAILS) {
          generateThumbnail(req, res, photoFilename);
        } else {
          generatePreview(req, res, photoFilename);
        }
      } else {
        // Photo file does not exist
        console.log(`${timeStamp()} - Photo file does not exist for '${photoFilename}'`);
        res.send(`no image exists '${req.params.image}'`);
        res.end();
      }
    }
  } catch (error) {
    console.error(error);
    res.send(`${timeStamp()} - Images error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeImages;
