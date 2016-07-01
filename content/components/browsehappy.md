---
date: 2016-06-24T09:27:49-04:00
menu:
  main:
    parent: components
title: Skeletor.browsehappy
weight: 5
---

Show an unobstrusive notification bar if your browser is out dated. This is a wrapper around http://browser-update.org's service. Lot's of this information here is repeated from their service.

## Usage

This component is included by default in Skeletor. There isn't anything extra you need to do unless you want to change options. The relevant initialization code is in the `skeletor.main.js`

```javascript
require(['skeletor.browsehappy'], function(){
  new Skeletor.BrowseHappy()
})
```
With optional options object:

```javascript
require(['skeletor.browsehappy'], function(){
  new Skeletor.BrowseHappy($(document),{
    test: true
  })
})
```

{{< note title="Note" >}}
The first parameter is always the element the component is attached too. In the above, `$(document)` is used. It's also the default if it's left blank.
{{< /note >}}

## Options

|Option|Type|Default|Description|
|---|---|---|---|
|vs|object|{i:9,f:25,o:12.1,s:2,c:10}|Browser versions to notify|
|reminder|int|24|after how many hours should the message reappear, 0 = show all the time|
|reminderClosed|int|150|If the user closes message it reappears after x hours|
|onshow|function|function(infos){}|Callback function after the bar has appeared|
|onclick|function|function(infos){}|Callback function if bar was clicked|
|onclose|function|function(infos){}|Callback function after the bar is closed|
|l|boolean|false|set a language for the message, e.g. "en", overrides the default detection|
|test|boolean|false|true = always show the bar (for testing)|
|text|string|""|Custom notification html text,  Optionally include up to two placeholders "%s" which will be replaced with the browser version and contents of the link tag. Example: "Your browser (%s) is old.  Please <a%s>update</a>"   |
|text_xx|string|""|Custom notification text for language "xx", e.g. text_de for german and text_it for italian |
|newwindow|boolean|true|Open link in new window/tab|
|url|string|http://browsehappy.com/|The url to go to after clicking the notification|


## CSS

The following CSS rules are applied by the script. You can overwrite them in your own CSS.

```CSS
.buorg {
  position:absolute;
  width:100%;
  top:0px;
  left:0px;
  border-bottom:1px solid #A29330;
  background:#FDF2AB no-repeat 1em 0.55em url(http://browser-update.org/img/dialog-warning.gif);
  text-align:left;
  cursor:pointer;
  font-family: Arial,Helvetica,sans-serif; color:#000;
  font-size: 12px;
}

.buorg div {
  padding:5px 36px 5px 40px;
}

.buorg a {
  color:#E25600;
}

#buorgclose {
  position: absolute;
  right: .5em;
  top:.2em;
  height: 20px;
  width: 12px;
  font-weight: bold;
  font-size:14px;
  padding:0;
}
```