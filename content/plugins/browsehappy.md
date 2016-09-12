---
date: 2016-06-24T09:27:49-04:00
menu:
  main:
    parent: plugins
title: Skeletor.browsehappy
weight: 5
---

Show an unobstrusive notification bar if your browser is out dated.

**Requires:** `skeletor.core`

## Installing

`bower install skeletor.browsehappy`

## Usage


```javascript
require(['skeletor.browsehappy'], function(){
  new Skeletor.BrowseHappy()
})
```
With optional options object:

```javascript
require(['skeletor.browsehappy'], function(){
  new Skeletor.BrowseHappy($(document),{
    min: { ie:9, firefox:25, opera:15, safari:6, chrome:40 }
  })
})
```

{{< note title="Note" >}}
The first parameter is always the element the plugin is attached too. In the above, `$(document)` is used. It's also the default if it's left blank.
{{< /note >}}

## Options

|Option|Type|Default|Description|
|---|---|---|---|
|min|object|{ie:9,firefox:25,opera:15,safari:6,chrome:40}|Browser versions to notify|
