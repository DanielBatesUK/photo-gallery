# **Photo-Gallery :camera::framed_picture:**

![GitHub package.json version](https://img.shields.io/github/package-json/v/DanielBatesUK/photo-gallery) ![GitHub last commit](https://img.shields.io/github/last-commit/DanielBatesUK/photo-gallery)

![GitHub repo file count](https://img.shields.io/github/directory-file-count/DanielBatesUK/photo-gallery) ![GitHub repo size](https://img.shields.io/github/repo-size/DanielBatesUK/photo-gallery) ![GitHub all releases](https://img.shields.io/github/downloads/DanielBatesUK/photo-gallery/total)

![GitHub issues](https://img.shields.io/github/issues-raw/DanielBatesUK/photo-gallery)

![GitHub forks](https://img.shields.io/github/forks/DanielBatesUK/photo-gallery?style=social)

![Twitter Follow](https://img.shields.io/twitter/follow/DanielBatesUK?style=social)

## **Description**

 A simple photo gallery website. It allows users to view, download and upload photos (upload access given with a passcode).

## **Installation**

### **Clone the repository**

Clone the photo-gallery repo from GitHub.

```Shell
git clone https://github.com/DanielBatesUK/photo-gallery
```

Then, in the clone's root directory, install required dependencies from npm.

```Shell
npm install -d
```

### **Configure the .env file**

***Either:*** Create an new .env file with the following.

```Shell
cat > .env
```

Then enter the following variables:

```Shell
PORT=3000
SESSION_SECRET="Your-Super-Secret-Password-Goes-Her
PASSCODE="Your-Not-So-Super-Secret-Passcode-Goes-Here"
PATH_UPLOADS="/location/where/to/save/uploaded/photos/goes/here/"
WEB_TITLE="Your-Photo-Gallery-Name-Goes-Here"
WEB_SIGNATURE="Your-Web-Page-Footer-Signature-Goes-Here"
ROUTE_INDEX="/"
ROUTE_GALLERY="/gallery"
ROUTE_UPLOAD="/upload"
ROUTE_IMAGES="/images"
VIEW_INDEX="index"
VIEW_GALLERY="gallery"
VIEW_UPLOAD="upload"
PREFIX_THUMBNAILS="thumb_"
PREFIX_PREVIEWS="prev_"
PHOTOS_PER_PAGE=20
```

 With the above press <kbd>Ctrl</kbd> + <kbd>D</kbd> to save.

***Or:*** Copy the .env.template provided to create your .env file.

```Shell
cp .env.template .env
```

***IMPORTANT:*** Before running, you will need, at the very least, to edit these variables in your .env file, to fit your requirements. Please do so with your text editor of choice.

- **PORT** - The integer port number you want to listen for http requests on. e.g. `3000`
- **SESSION_SECRET** - The string for the secret text that is used when hashing the passcode. e.g `My-Super-Secret-Password`
- **PASSCODE** - The string used for the passcode. The passcode is given to the users (by you) that you want to have upload access. It is entered via a form when trying to use the upload page. e.g. `My-Secret-Passcode`
- **PATH_UPLOADS** - This string is the pathname of the directory where you want the uploaded photos to be stored (it can be anywhere accessible on your system; but I would maybe avoid putting them in the '/public' directory). e.g. `/location/where/to/save/uploaded/`

The other variables can be left as default. Change them if you wish. But here is what they are.

- **WEB_TITLE** - String used for the title and heading on the webpages. e.g. `My Photo Gallery`
- **WEB_SIGNATURE** - String used for the small footer note at the bottom of all the webpages, accept for the home page. e.g. `Photo Gallery 2022`
- **ROUTE_INDEX** - String used for the route of the index/home page. e.g. https​://example.com`/`
- **ROUTE_GALLERY** - String used for the route of the gallery page. e.g. https​://example.com`/gallery`
- **ROUTE_UPLOAD** - String used for the route of the upload page. e.g. https​://example.com`/upload`
- **ROUTE_IMAGES** - String used for the route of the images page. This is the route used for displaying uploaded photos. By default; It is also used in the '/public directory too. e.g. https​://example.com`/images`
- **VIEW_INDEX** - String used for the filename of the jade/pug file (in '/views') that used for the index/home page. e.g. `index`
- **VIEW_GALLERY** - String used for the filename of the jade/pug file (in '/views') that used for the gallery page. e.g. `gallery`
- **VIEW_UPLOAD** - String used for the filename of the jade/pug file (in '/views') that used for the upload page. e.g. `upload`
- **PREFIX_THUMBNAILS** - String used as the prefix that tells the '/routes/get_image' script to generate a thumbnail from a upload photo (that is used on the gallery page). Must be different from `PREFIX_PREVIEWS`. e.g. `thumb_`
- **PREFIX_PREVIEWS** - String used as the prefix that tells the '/routes/get_image' script to generate a preview from a upload photo (that is used on the gallery modal). Must be different from `PREFIX_THUMBNAILS`. e.g. `prev_`
- **PHOTOS_PER_PAGE** - Integer used to give the number of photo shown on each page of the gallery. By default, and with the css for the gallery page; this number should be divisible by 4. e.g. `20`

## Story

## Author

### **Daniel Bates**

- Github: [@DanielBatesUK](https://github.com/DanielBatesUK)
- Twitter: [@DanielBatesUK](https://twitter.com/DanielBatesUK)
- LinkedIn: [@DanielBatesUK](https://linkedin.com/in/DanielBatesUK)

## License

- Copyright © 2022 [Daniel Bates](https://github.com/DanielBatesUK).
- This project is [GNU v3.0](https://github.com/DanielBatesUK/photo-gallery/blob/67efb74092928f88e5ed685ee61020db399a4635/LICENSE.md) licensed.
