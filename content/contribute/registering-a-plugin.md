---
date: 2016-06-24T16:37:49-04:00
menu:
  main:
    parent: contribute
title: Registering a plugin
weight: 6
---

Skeletor has a private bower repo to host all it's components using [private-bower](https://www.npmjs.com/package/private-bower) hosted here: http://bowerregistry-delphic.rhcloud.com/. Registering it follows normal bower steps with an extra config.

## Register

Create a bower config file at the root of your plugin directory: `.bowerrc` with the following settings.

```javascript
{
    "registry": "http://bowerregistry-delphic.rhcloud.com",
    "timeout": 300000,
}
```
You can read more about the `.bowerrc` from the bower site: https://bower.io/docs/config/

## Usage

Skeletor includes a `.bowerrc` file that points to the private bower registery already. Installing a Skeletor component is a simple as running bower commands.

```bash
bower install plugin
```

Skeletor will auto wire it up to your require.js config file:

```
{
  'paths': {
    'skeletor.plugin': 'bower_components/skeletor.plugin'
  }
}
```

Now you can load it with requirejs in a component:
```
require(['skeletor.plugin'], function(){
    var $plugin = new Skeletor.plugin($('.plugin__list'));
})
```
