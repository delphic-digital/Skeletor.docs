---
menu:
  main:
    parent: getting started
title: Setup
toc: true
weight: 2
---

Skeletor uses open source tools for its workflow. If you haven't installed these requirements please do so.

* [Node.js](https://nodejs.org/en/)
* Install Gulp ```npm install --g gulp-cli```
* Install Bower ```npm install -g bower```

## Installing

* Fork/Clone/Download the [Skeletor](https://github.com/delphic-digital/Skeletor) repository into your machine.
* Open a terminal and install the Node.Js dependencies by running ```npm install``` in your project directory.
* Install client side dependencies with bower by running ```bower install``` in your project directory.

Several things happened happened when you can the commands. `npm` installed all the nodejs dependencies needed for gulp to do its work. You only have to run this once. `bower` installed client side dependencies.

## Config

Before you get started, you will need to update some config options for gulp. Open the config file that is here:

```bash
skeletor
|-- gulp
    |-- config.js
```

```javascript
var localHostname = 'localhost.com', // Change to your local website that is running if you want to proxy it to browser-sync.
    siteShortname = 'skeletor', // Used for JavaScript optimaztion and should match your main.js namespace:  skeletor.main.js
    baseLayoutDir = './', // Where your index or base layout file is.
    baseLayoutFile = 'index.html', // The filename of your index or base layout. This is used to change the script included from src to dist.
    views = './*.html', // Where browser-sync should watch for HTML changes
    src = './Static/src', // Where the sass and js src are, probably don't need to change
    dist = './Static/dist', // Where everything gets compiled to, probably don't need to change
    assets = './Static/assets' // Where fonts and images, and other static assets should go. Probably don't need to change.
```

## Starting

Run gulp to automatically open a new Skeletor project running on localhost:3000.

## File structure

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

```bash
skeletor
|-- Gulp
|   |-- # Lots of gulp stuff
|-- Static
|   |-- assets
|   |   |-- images
|   |   |   |-- # Your image files
|   |   |-- spritesheets
|   |       |-- # Your spritesheets get generated here
|   |-- dist
|   |   |-- css
|   |   |   |-- main.css # Your Sass gets compiled here
|   |   |-- js
|   |   |   |-- lib
|   |   |   |   |-- require.js
|   |-- src
|       |-- js
|       |   |-- skeletor.main.js
|       |   |-- components
|       |   |   |-- common.js
|       |   |   |-- common
|       |   |   |   |-- # Your common components here
|       |-- scss
|       |   |-- main.scss
|       |   |-- partials
|       |       |-- _settings.scss
|       |       |-- base
|       |       |   |-- _buttons.scss
|       |       |   |-- _fonts.scss
|       |       |   |-- _inputs.scss
|       |       |   |-- _scaffolding.scss
|       |       |   |-- _sprites.scss
|       |       |   |-- _svg.scss
|       |       |   |-- _typography.scss
|       |       |-- components
|       |       |   |-- # Your sites Sass components
|       |       |-- layout
|       |           |-- _footer.scss
|       |           |-- _forms.scss
|       |           |-- _header.scss
|       |           |-- _sidebar.scss
|       |-- sprites
|       |   |-- bitmap.example.handlebars
|       |   |-- inline.mustache
|       |   |-- vector.example.html
|       |   |-- bitmaps
|       |   |   |-- # Your bitmap (png/jpg) sprites
|       |   |-- inline
|       |   |   |-- # Your CSS sprites
|       |   |-- vectors
|       |       |-- # Your svg spritesheet sprites
|       |-- styleguide
|           |-- styleguide_overrides.css
|           |-- styleguide_variables.css
|-- .bowerrc
|-- .editorconfig
|-- .gitignore
|-- bower.json
|-- config.json
|-- gulpfile.js
|-- index.html
|-- package.json
|-- README.md

```