---
menu:
  main:
    parent: development
title: Sass
toc: true
weight: 2
---


Skeletor comes with Sass and a structure setup. The following Sass helper libraries and plugins are preinstalled:

* [Susy](http://susy.oddbird.net), great for robust grids
* [Bourbon](http://bourbon.io), awesome set of mixins
* [Breakpoint](http://breakpoint-sass.com), used with a custom mixin to make breakpoints easy
* [Node Sass Globbing](https://github.com/britco/node-sass-globbing), so you don't have to add custom partials to the main.scss. Be careful of casscading rules!!

## Structure

```bash
skeletor
|-- Static
    |-- dist
    |   |-- css
    |   |   |-- main.css # Your Sass gets compiled here
    |-- src
        |-- scss
            |-- main.scss
            |-- partials
                |-- _settings.scss
                |-- base
                |   |-- _buttons.scss
                |   |-- _fonts.scss
                |   |-- _inputs.scss
                |   |-- _scaffolding.scss
                |   |-- _sprites.scss
                |   |-- _svg.scss
                |   |-- _typography.scss
                |-- components
                |   |-- # Your sites Sass components
                |-- layout
                    |-- _footer.scss
                    |-- _forms.scss
                    |-- _header.scss
                    |-- _sidebar.scss
```

*`main.scss`*

The `main.scss` file contains the entries points for the sites sass partials.

*`partials`*

* `_settings.scss` site settings defined here, it contains variables for all of the colors, font stacks, breakpoints, and sizing.
* `base` holds global and base styles.
* `components` holds site components styles. Any partial added here is automatically imported with the globbing plugin.
* `layout` holds global layout styles.

## Philosophies

* [Mobile First](http://www.zell-weekeat.com/how-to-write-mobile-first-css), mobile first approach
* [SMACSS](https://smacss.com), css design process
* [BEM](https://css-tricks.com/bem-101), naming convention for CSS.
