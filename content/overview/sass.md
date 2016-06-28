---
menu:
  main:
    parent: getting started
title: Sass
toc: true
weight: 4
---


Skeletor comes with Sass and a structure setup. The following Sass helper libraries and plugins are preinstalled:
 * [Susy](http://susy.oddbird.net), great for robust grids
 * [Bourbon](http://bourbon.io), awesome set of mixins
 * [Breakpoint](http://breakpoint-sass.com), used with a custom mixin to make breakpoints easy
 * [Node Sass Globbing](https://github.com/britco/node-sass-globbing), so you don't have to add custom partials to the main.scss. Be careful of casscading rules!!

## Brief overview of structure

### `main.scss`

The `main.scss` file contains the entries points for the sites sass partials.

#### `partials`

 * `_settings.scss` site settings defined here, it contains variables for all of the colors, font stacks, breakpoints, and sizing.
 * `base` holds global and base styles.
 * `components` holds site components styles. Any partial added here is automatically imported with the globbing plugin
 * `layout` holds global layout styles.
 * `utilites` holds mixins and SASS utilites.

#### Overview of best practices for writing SASS/CSS with Skeletor

 * [Mobile First](http://www.zell-weekeat.com/how-to-write-mobile-first-css), mobile first approach
 * [SMACSS](https://smacss.com), css design process
 * [BEM](https://css-tricks.com/bem-101), naming convention for CSS.


_Notes_

We found using a traditional mobile first structure within each component partial is better for maintainability than inlining media queries into each class. This way, there is only one of each breakpoints defined in each component, instead of scattered throughout. This makes a big difference on large scale sites.

```scss
.main-nav {
	/* Mobile main nav styles */

	&__list {

	}

	&__item {

	}

	@include breakpoint($medium){

		&__list {

		}

		&__item {

		}
	}

}
```

instead of


```scss
.main-nav {

	@include breakpoint($medium){}

	&__list {
		@include breakpoint($medium){}
	}

	&__item {
		@include breakpoint($medium){}
	}
}
```
