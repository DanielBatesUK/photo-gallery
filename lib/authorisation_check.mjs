// ################################################################################################

// My Imports
import timeStamp from './time_stamp.mjs';
import secretHash from './secret_hash.mjs';

// ################################################################################################

// Authorisation Check
function authorisationCheck(req, res, next) {
  console.log(`${timeStamp()} - Authorising HTTP ${req.method} request for 'upload'`);
  try {
    // Check for URL query param and redirect back for authorisation
    if (typeof req.query.p !== 'undefined') {
      console.log(`${timeStamp()} - Setting user authorisation cookie for 'upload' with supplied passcode parameter`);
      res.cookie('hash', secretHash(req.query.p), {
        signed: true, httpOnly: true, sameSite: 'strict', maxAge: 31556926000, secure: true,
      });
      console.log(`${timeStamp()} - Redirecting back to 'upload' for re-authorisation`);
      res.redirect(`.${process.env.ROUTE_UPLOAD}`);
      res.end();
      return;
    }
    if (typeof req.signedCookies.hash !== 'undefined' && req.signedCookies.hash === secretHash()) {
      // Passcode accepted - User authorised
      console.log(`${timeStamp()} - User authorised for 'upload'`);
      next();
    } else {
      // Passcode rejected - User not authorised
      res.cookie('hash', 'removed', {
        signed: true, httpOnly: true, sameSite: 'strict', maxAge: 0, secure: true,
      });
      throw new Error('Incorrect passcode in user authorisation cookie');
    }
  } catch (error) {
    // Request passcode from unauthorised users via form
    console.log(`${timeStamp()} - Authorisation Error: ${error.message}`);
    console.log(`${timeStamp()} - Processing HTTP ${req.method} request for '${req.path}' as 'upload' with page 'passcode-form'`);
    res.render(process.env.VIEW_UPLOAD, {
      web_title: process.env.WEB_TITLE,
      web_css: process.env.WEB_CSS,
      web_icon_type: process.env.WEB_ICON_TYPE,
      web_icon_href: process.env.WEB_ICON_HREF,
      web_signature: process.env.WEB_SIGNATURE,
      route_gallery: process.env.ROUTE_GALLERY,
      route_images: process.env.ROUTE_IMAGES,
      route_index: process.env.ROUTE_INDEX,
      route_upload: process.env.ROUTE_UPLOAD,
      page: 'passcode-form',
    });
    res.end();
  }
}

// ################################################################################################

// Exports
export default authorisationCheck;
