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

function getPhotoFormat(photoFilename) {
  return (photoFilename.split('.').pop() === 'jpg' ? 'jpeg' : photoFilename.split('.').pop())
}


// ################################################################################################

async function generateJpegThumbnail(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating 'JPEG' thumbnail: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .resize(256, 192)
    .toFormat('jpeg')
    .jpeg({ quality: 30 })
    .gif({pageHeight: 192})
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

async function generateGifThumbnail(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating 'GIF' thumbnail: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename, { animated: true })
    .rotate()
    .resize(256, 192)
    .toFormat('gif')
    .gif({pageHeight: 192})
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': 'image/gif',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

// ################################################################################################

async function generateJpegPreview(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating 'JPEG' preview: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .resize(1080, 1080, { fit: 'inside' })
    .toFormat('jpeg')
    .jpeg({ quality: 60 })
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

async function generateGifPreview(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating 'GIF' preview: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename, { animated: true })
    .rotate()
    .resize(1080, 1080, { fit: 'inside' })
    .toFormat('gif')
    .gif({pageHeight: 1080})
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': 'image/gif',
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

// ################################################################################################

async function generateJpegImage(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating unaltered 'JPEG' image: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename)
    .rotate()
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': `image/jpeg`,
        'Content-Length': data.length,
      });
      return (res.end(data));
    });
}

async function generateGifImage(req, res, photoFilename) {
  console.log(`${timeStamp()} - Generating unaltered 'GIF' image: '${photoFilename}'`);
  sharp.cache({ items: 0 });
  sharp.cache({ files: 0 });
  sharp.cache(false);
  sharp(process.env.PATH_UPLOADS + photoFilename, { animated: true })
    .rotate()
    .toFormat('gif')
    .toBuffer()
    .then((data) => {
    // To display the image
      res.writeHead(200, {
        'Pragma-directive': 'no-cache', 'Cache-directive': 'no-cache', 'Cache-control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0',
        'Content-Type': `image/gif`,
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
    // Type of image (thumbnail, preview or download)
    let currentPrefix = '';
    if (req.params.image.startsWith(process.env.PREFIX_THUMBNAILS)) { currentPrefix = process.env.PREFIX_THUMBNAILS; }
    if (req.params.image.startsWith(process.env.PREFIX_PREVIEWS)) { currentPrefix = process.env.PREFIX_PREVIEWS; }
    // Image format
    const imageFormat = getPhotoFormat(req.params.image);
    // Image request
    console.log(`${timeStamp()} - Image requested for '${req.params.image}'`);
    const photoFilename = currentPrefix !== '' ? removePrefix(req.params.image, currentPrefix) : req.params.image;
    // Check photo file exists
    if (fs.existsSync(process.env.PATH_UPLOADS + photoFilename)) {
      // Photo file exists
      console.log(`${timeStamp()} - Photo file exists for image: '${photoFilename}'`);
      if (currentPrefix === process.env.PREFIX_THUMBNAILS) {
        imageFormat === 'gif' ? generateGifThumbnail(req, res, photoFilename) : generateJpegThumbnail(req, res, photoFilename);
      } else if (currentPrefix === process.env.PREFIX_PREVIEWS) {
        imageFormat === 'gif' ? generateGifPreview(req, res, photoFilename) : generateJpegPreview(req, res, photoFilename);
      } else {
        imageFormat === 'gif' ? generateGifImage(req, res, photoFilename) : generateJpegImage(req, res, photoFilename);
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
