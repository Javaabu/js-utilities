---
title: Installation & Setup
sidebar_position: 1.2
---

# Installation

In order to use JS Utilities, you must include the compiled JavaScript files on your website.

## Installation via NPM and Laravel Mix

First install the NPM package 

```bash
npm install @javaabu/js-utilities --save
```

Then copy the compiled JS files to your public directory using Laravel Mix by adding the following line to your `webpack.mix.js` file and running `npm run prod`

```JavaScript
    const mix = require('laravel-mix');

    mix.copy('node_modules/javaabu-js-utilities/dist', 'public/vendors/javaabu-js-utilities');
```

Now you the precompiled distribution files will be available at `public/vendors/javaabu-js-utilities`. Include them in your page.

```html
<script src="vendors/javaabu-js-utilities/js/utilities.js"></script>
```

## Manual Installation

To manually install JS Utilities, you can [download the release of your choice](https://github.com/Javaabu/js-utilities/tags) from GitHub and copy the files from the dist directory into your project.

Include the compiled files in your page:

```html
<script src="path/to/utilities.js"></script>
```