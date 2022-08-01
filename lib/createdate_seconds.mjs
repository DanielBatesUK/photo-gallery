// ################################################################################################

// Imports
import fs from 'fs';
import exifr from 'exifr';

// ################################################################################################

// EXIF Created date in seconds
async function createDateSeconds(file) {
  try {
    // console.log(`Reading exif CreateDate for '${file}'`);
    const tags = await exifr.parse(file, ['CreateDate']);
    // console.log(`${file} createdate in seconds: ${(tags.CreateDate.getTime())}`);
    return tags.CreateDate.getTime();
  } catch (error) {
    // console.log(`Reading exif CreateDate for '${file}' failed...`);
    // console.error(error);
    return 'xxxxxxxxxxxxx';
  }
}

// ################################################################################################

// Exports
export default createDateSeconds;
