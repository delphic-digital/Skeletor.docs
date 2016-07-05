---
menu:
  main:
    parent: development
title: Javascript
toc: true
weight: 1
---

Skeletor comes with a JavaScript structure that utilizes [RequireJS](http://requirejs.org) for dependency and module loading. There are a couple reasons for this:

* **Performance**: Skeletor uses best practices for loading JavaScript with a multi-page site. There is a *core*, or commmon file that gets loading on everypage. After that, there are component level scripts that get loaded in after page load. These components are only loaded if that component exists on the page. It's another way of doing page specific scripts, except this is refined down to the component level.
* **Dependency managment** can become a big problem with JavaScript, AMD solves this.

### Brief overview of structure

```bash
skeletor
|-- Static
    |-- dist
    |   |-- js
    |       |-- # Your custom javascript is compiled here
    |       |-- lib
    |           |-- require.js
    |-- src
        |-- js
            |-- skeletor.main.js
            |-- components
            |-- common.js
            |-- common
                |-- # Your common components here

```

#### Main

This is the `core` and gets loaded on every page. It takes care of global utilities, global components, polyfills, and including the component loader.

```
// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
	},
	packages: [

	],
	shim: {

	}
});
// endbower

//Need a second config so the optimizer doesn't try and evaluate the browser only jquery conditional.

require.config({
	paths: {
		'jquery': (document.addEventListener) ?
			['//code.jquery.com/jquery-3.0.0.min']
			:
			['//code.jquery.com/jquery-1.12.4.min'] // https://github.com/rnsloan/requirejs-conditionally-load-jquery2
	}
})

define(function (require){

	var componentLoader   = require('skeletor.util.componentLoader'),
	    browsehappy       = require('skeletor.browsehappy'),
	    svg4everybody     = require('svg4everybody'),
	    picturefill       = require('picturefill'),
	    commonComponents  = require('./components/common');

	svg4everybody();
	commonComponents.init();

});
```
{{< note title="Note" >}}
Be sure to rename `skeletor.main.js` with your siteShortName config setting, so it's `nameofsite.main.js`. Also update this name in your base template.
{{< /note >}}

Here is a breakdown of all the parts:

```
/*---------------------------------------------------------------

	Here is where bower packages get automatically wired up.
	You should never edit anything in here manually, unless
	you need to delete a path.

-----------------------------------------------------------------*/


// Automatically injected Bower JS dependencies via bowerRequireJS
require.config({
	paths: {
	},
	packages: [

	],
	shim: {

	}
});
// endbower
```


```
/*---------------------------------------------------------------

	This is some logic to load different verisons of jquery based
	on browser support. jQuery 3.x supports IE 9+ only.

-----------------------------------------------------------------*/


//Need a second config so the optimizer doesn't try and evaluate the browser only jquery conditional.

require.config({
	paths: {
		'jquery': (document.addEventListener) ?
			['//code.jquery.com/jquery-3.0.0.min']
			:
			['//code.jquery.com/jquery-1.12.4.min'] // https://github.com/rnsloan/requirejs-conditionally-load-jquery2
	}
})

```


```
/*---------------------------------------------------------------

	Here is where some predownloaded components are already
	required. These are loaded and initiliazed on page load.

-----------------------------------------------------------------*/

define(function (require){

	var componentLoader   = require('skeletor.util.componentLoader'),
	    browsehappy       = require('skeletor.browsehappy'),
	    svg4everybody     = require('svg4everybody'),
	    picturefill       = require('picturefill'),
	    commonComponents  = require('./components/common');

	svg4everybody();
	commonComponents.init();

});
```

Here is a breakdown on the preloaded components:

```
var componentLoader   = require('skeletor.util.componentLoader'),
/*
	This is a Skeletor utility that handles component loading
	through data attributes on elements in your html. By loading
	javascript this way, the component is essitianly loaded
	"on demand" and loaded only when it's needed. It also supports
	context, so components can be loaded only on mobile, tablet, or desktop.
	See below for example's on how to use this.
*/
```
```
browsehappy       = require('skeletor.browsehappy')
/*
	Detects old versions of browsers and shows a prompt bar for
	the user to upgrade.
*/
```

```
svg4everybody     = require('svg4everybody'),
/*
	External SVG spritesheets polyfill. One of Skeletors key features.
*/
```
```
picturefill       = require('picturefill'),
/*
	Picture element pollyfill. Use picture element and srset without
	crossbrowser worry.
*/
```
```
commonComponents  = require('./components/common');
/*
	For your sites custom common (global) components. This is where
	code lives that you want loaded on every page and will be
	concatenated to the main.js when built.
*/
```


### Dynamic components

Create requirejs components in the `./components` folder. These won't be concatenated with the main (common) JS and these can be loaded directly with the HTML.


#### Example component

Components are standard requirejs modules, and it's syntax should be used. For components that rely on the `data-component` loading, there require a couple functions.

1. An init function for encapsulating code that should run with the component is fully loaded into the page.
2. A destroy function to run when the component is unloaded on the page. For instance, when it leaves a mobile context and enters tablet.

Here's an example:

```
define(['jquery'],function($) {

	return {
		settings: {
			$elm : $('.js-skeletor-guy')
		},

		init: function() {

			console.log('Init skeletor guy.');

			this.settings.$elm.click(function(){
				$(this).toggleClass('flipped')
			})
		},

		destroy: function() {
			console.log('Destroy skeletor guy.')
		}

	};

});
```

#### Component loading

Add a data-component to the html element that the component will be attached to:

```HTML
<!-- component-example.js will be loaded anytime this HTML is present on the page -->
<div class="component-example" data-component="component-example">
	Lorem ipsum
</div>
```

To load a JS component for only certain media queries, add a data-component-context to the html element. For multiple states, comma separate the values.

```HTML
<!-- component-example.js will be loaded only in tablet and desktop -->
<div class="component-example" data-component="component-example" data-component-context="tablet,desktop">
	Lorem ipsum
</div>
```

These components are aynced in after page load and will remain separate modules in the build process.

## Skeletor Object

The global `Skeletor` object is used extensively by and created for the plugin system. It defines global options, localized messages, feature detection, and device support. It also acts as a namespace for plugins by housing a top level name to avoid global conflicts. Each plugin class definition can be found on the `Skeletor` object, for example, the accordion class is found under `Skeletor.Accordion`.
