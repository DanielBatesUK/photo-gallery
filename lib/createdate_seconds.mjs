// ################################################################################################

// Imports
import fs from 'fs';
import exifr from 'exifr';

// ################################################################################################

// EXIF Created date in seconds
async function createDateSeconds(file) {
  try {
    const tags = await exifr.parse(file, ['CreateDate']);
    return tags.CreateDate.getTime();
  } catch (error) {
    return 'xxxxxxxxxxxxx';
  }
}

// ################################################################################################

// Exports
export default createDateSeconds;
