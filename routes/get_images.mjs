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
    .resize(256, 192)
    .toFormat('jpeg')
    .jpeg({ quality: 30 })
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

function generateImage(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating unaltered image: '${photoFilename}'`);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
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
    let currentPrefix = '';
    if (req.params.image.startsWith(process.env.PREFIX_THUMBNAILS)) { currentPrefix = process.env.PREFIX_THUMBNAILS; }
    if (req.params.image.startsWith(process.env.PREFIX_PREVIEWS)) { currentPrefix = process.env.PREFIX_PREVIEWS; }
    // Image request
    console.log(`${timeStamp()} - Image requested for '${req.params.image}'`);
    const photoFilename = currentPrefix !== '' ? removePrefix(req.params.image, currentPrefix) : req.params.image;
    // Check photo file exists
    if (fs.existsSync(process.env.PATH_UPLOADS + photoFilename)) {
      // Photo file exists
      console.log(`${timeStamp()} - Photo file exists for image: '${photoFilename}'`);
      if (currentPrefix === process.env.PREFIX_THUMBNAILS) {
        generateThumbnail(req, res, photoFilename);
      } else if (currentPrefix === process.env.PREFIX_PREVIEWS) {
        generatePreview(req, res, photoFilename);
      } else {
        generateImage(req, res, photoFilename);
      }
    } else {
      // Photo file does not exist
      console.log(`${timeStamp()} - Photo file does not exist for '${photoFilename}'`);
      res.status(404).send(`Error 404 - ${timeStamp()} - Image not found: '${req.params.image}'`);
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error 500 - ${timeStamp()} - Images error`);
    res.end();
  }
}

// ################################################################################################

// Exports
export default routeImages;
