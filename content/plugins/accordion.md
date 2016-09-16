---
date: 2016-06-24T09:27:49-04:00
menu:
  main:
    parent: plugins
title: Skeletor.accordion
weight: 5
---

Allows collapsing and expanding of multiple sections of content.

**Requires:** `skeletor.core`

## Installing

`bower install skeletor.accordion`

## Usage

An accordion must be structured using the example markup. Every item should have an accompanying header and section. The header will be bound with a click event that toggles the display of its sibling section, while also closing other sections (can be changed through options).

```html
<div class="accordion js-accordion" data-component="accordion">
  <div class="accordion__item">
    <header class="accordion__header">
      Lorem ipsum dolor sit amet
    </header>
    <section class="accordion__section">
      <div class="accordion__body">
        Qui offendit convenire ea. Vis eirmod graecis mentitum in. Scripta delectus an quo. Equidem elaboraret nam et,
      </div>
    </section>
  </div>
</div>
```

Now you can require and initialize the accordion.

```javascript
require(['skeletor.accordion'], function(){

  //attach to multiple elements
  $('.js-accordion').each(function(){
    new Skeletor.Accordion($(this));
  })

  //Or attach to single element with options
  new Skeletor.Accordion($('.js-accordion-another'),{singleOpen: false});

})
```

## Options

|Option             |Type      |Default       |Description                                                            |
|-------------------|----------|--------------|-----------------------------------------------------------------------|
|singleOpen         |boolean   |true          |Allow only one item open at a time                                     |
|collapsible        |boolean   |true          |Allow only all items to collapse or not                                |
|duration           |int       |200           |Animation length between transitions                                   |
|easing             |string    |'swing'       |Animation easing supports Velocty: http://velocityjs.org/#easing       |
|active             |int       |0             |Which item to show on page load                                        |


## Methods

|Method              |Description                                                            |
|--------------------|-----------------------------------------------------------------------|
|open(int:index)     |Open accordion item at specified index. 0 based.                       |
|close(int:index)    |Close accordion item at specified index. 0 based.                      |
|closeall()          |Close all items                                                        |


## Keyboard

Keyboard navigation is supported:

**If you focus in the accordion "buttons"**

* use Up/Left to put focus on previous accordion button,
* use Down/Right to put focus on next accordion button

And hit return on an accordion button to open/close it.