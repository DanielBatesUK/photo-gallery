// ################################################################################################

// !! WARNING !! WARNING !! WARNING !! WARNING !!
// !! WARNING !! WARNING !! WARNING !! WARNING !!
// !! WARNING !! WARNING !! WARNING !! WARNING !!

// I only used this script to prefix EXIF CreateDate to each file name
// in the uploads directory. It now does this to each file when uploaded.

// It will rename ALL files in the upload folder when called

// I would only use this function if you have initially and manually
// copied photos into the upload folder. Otherwise; leave it alone.

// Import and call this function at your own risk!

// ################################################################################################

// Imports
import fs from 'fs';

// My Imports
import createDateSeconds from './createdate_seconds.mjs';

// ################################################################################################

// Rename Uploads
function renameUploads() {
  try {
    const photoFilenames = fs.readdirSync(process.env.PATH_UPLOADS);
    photoFilenames.forEach(async (value) => {
      console.log(`rename : ${process.env.PATH_UPLOADS}${value}, ${process.env.PATH_UPLOADS}${await createDateSeconds(`${process.env.PATH_UPLOADS}${value}`)}-${value}`);
      fs.rename(`${process.env.PATH_UPLOADS}${value}`, `${process.env.PATH_UPLOADS}${await createDateSeconds(`${process.env.PATH_UPLOADS}${value}`)}-${value}`, (error) => {
        if (error) console.log(error);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// ################################################################################################

// Exports
export default renameUploads;
