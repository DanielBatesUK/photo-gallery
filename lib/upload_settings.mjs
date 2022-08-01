// ################################################################################################

// Imports
import multer from 'multer';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';

// My Imports
import timeStamp from './time_stamp.mjs';

// ################################################################################################

// Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      cb(null, process.env.PATH_UPLOADS);
    } catch (error) {
      console.error(error);
    }
  },
  async filename(req, file, cb) {
    try {
      // Get Creation Date
      console.log(`${timeStamp()} - Creating file name...`);
      // Filename
      cb(null, `${Date.now()}-${uuidV4()}${path.extname(file.originalname)}`);
    } catch (error) {
      console.error(error);
    }
  },
});
const upload = multer({ storage });

// ################################################################################################

// Exports
export default upload;
