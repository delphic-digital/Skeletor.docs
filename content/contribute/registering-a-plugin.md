---
date: 2016-06-24T16:37:49-04:00
menu:
  main:
    parent: contribute
title: Registering a plugin
weight: 6
---

Skeletor has a private bower repo to host all it's components using [private-bower](https://www.npmjs.com/package/private-bower) hosted here: http://bowerregistry-delphic.rhcloud.com/.

## Register

To register your plugin for Skeletor, you need to point bower to the private bower repo. Create a bower config file, `.bowerrc`, at the root of your plugin directory with the following settings.

```javascript
{
    "registry": "http://bowerregistry-delphic.rhcloud.com",
    "timeout": 300000,
}
```

Create a `bower.json` at the root of your project with `bower init`.
Then use `bower register`:

```bash
$ bower register <my-package-name> <git-endpoint>
# for example
$ bower register example git://github.com/user/example.git
```


## Usage in Skeletor

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

Next you should write documentation for your plugin.

Next: [Writing documentation](/contribute/writing-docs/)