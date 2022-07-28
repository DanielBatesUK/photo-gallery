// ################################################################################################

// Imports
import crypto from 'crypto';

// ################################################################################################

// Secret hash
function secretHash(string = process.env.PASSCODE) {
  try {
    return crypto.createHash('md5').update(string + process.env.SESSION_SECRET).digest('hex');
  } catch (error) {
    console.error(error);
    return false;
  }
}

// ################################################################################################

// Exports
export default secretHash;
