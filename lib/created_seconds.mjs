// ################################################################################################

// Imports
import exifr from 'exifr';

// ################################################################################################

// EXIF Created date in seconds
async function createdDateSeconds(file) {
  try {
    console.log('created seconds run');

    const tags = await exifr.parse(file, ['CreateDate']);

    console.log(tags);
  } catch (error) {
    console.error(error);
  }
}

// ################################################################################################

// Exports
export default createdDateSeconds;

// createdDateSeconds('/media/usb-raid/www-storage/photo-gallery/photos/1657116594500-b00a1d0d-ef8c-4d48-98be-3e86c5853f6a.jpg')
