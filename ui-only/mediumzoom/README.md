# Medium-Zoom

This Antora UI extension makes an image zoomable on click. This is very beneficial if you want to enrich your content by including images with a smaller size that do not break the reading flow. If you click on the image, it is shown in its original (usually bigger) size.

Note that when setup, all images are now zoomable!

## Setup

1. Integrate medium-zoom to your UI:\
File: `medium-zoom.css` --> `src/css/`\
File: `medium-zoom.js` --> `src/js/vendor`\
Add: `@import url("medium-zoom.css");` --> `src/css/site.css`\
Add: `<script async src="{{{uiRootPath}}}/js/vendor/medium-zoom.js"></script>` --> `src/partials/footer-scripts.hbs`\
2. Add dependency:\
Add `"medium-zoom": "^1.1.0",` --> `dependencies` --> `package.json`\
Run `npm install` to update your dependencies.\
Create a new bundle.
