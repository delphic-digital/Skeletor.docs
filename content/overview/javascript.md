---
menu:
  main:
    parent: getting started
title: Javascript
toc: true
weight: 5
---

Skeletor comes with a JavaScript structure that utilizes [RequireJS](http://requirejs.org). Some JS helper libraries and plugins are included automatically:

* [jQuery](https://jquery.com), version 2 is automatically loaded for browsers that support it, otherwise the 1.9 branch is used.
* [Browser Update](http://browser-update.org), tell your audience to use modern browsers!
* [onMediaQuery](https://github.com/JoshBarr/on-media-query), works great for triggering javascript for certain media queries.
* [Picturefill](https://github.com/scottjehl/picturefill), there is no reason to not use reponsive images.

### Brief overview of structure

```bash
skeletor
|-- Static
|   |-- dist
|   |   |-- js
|   |       |-- # Your custom javascript is compiled here
|   |       |-- lib
|   |           |-- require.js
|   |-- src
|       |-- js
|           |-- skeletor.main.js
|           |-- components
|           |-- common.js
|           |-- common
|               |-- # Your common components here

```

#### The main file

{{< note title="Note" >}}
Be sure to rename `skeletor.main.js` with your siteShortName config setting, so it's `nameofsite.main.js`. Also update this name in your base template.
{{< /note >}}

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
	throughdata attributes on elements in your html. By loading
	javascript this way, the component is essitianly loaded
	"on demand" and loaded only when it's needed. It also supports
	context, so components can be loaded only on mobile, for example.
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
	code lives that you want loaded on every page.
*/
```

Inside `components` will be your sites custom requirejs modules.

	* `common` folder contains components that are global and be concatenated to the main.js when built.
	* other components will be standalone and won't be concatenated with the main (common) JS. These can be loaded directly with the HTML.


### data-component and data-component-context
To load a JS component, use the sample syntax in ```component-example.js```, and add a data-component to the html element that should load the JS.

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