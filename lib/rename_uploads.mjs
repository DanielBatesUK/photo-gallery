// ################################################################################################

// !! WARNING !! WARNING !! WARNING !! WARNING !!
// !! WARNING !! WARNING !! WARNING !! WARNING !!
// !! WARNING !! WARNING !! WARNING !! WARNING !!

// I only used this script to prefix EXIF CreateDate to each file name in the uploads directory

// It will rename all files in upload folder when called

// Import in call this function at your own risk!

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
