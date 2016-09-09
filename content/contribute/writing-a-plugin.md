---
date: 2016-06-24T16:37:49-04:00
menu:
  main:
    parent: contribute
title: Creating a plugin
weight: 5
---

Creating a plugin for Skeletor is easy. There is a plugin factory included in `Skeletor.core`.


## Requirements

* You have cloned the Skeletor.framework repo. If you have not see [Get Started](../get-started).


## Creating the repository

You're going to want to create a submodule of the Skeletor.framework. This is really just for organization purposes, and to easily include `Skeletor.core` as a dependency.

* Start off with creating a new repo for your plugin in github, for instance named `delphic-digital/Skeletor.breadcrumb`. Make sure you initiliaze it with readme file.
* `cd` into the working directory of `Skeletore.framework` and add your new repo as
a submodule: `git submodule https://github.com/delphic-digital/Skeletor.breadcrumb.git Skeletor.plugins/Skeletor.breadcrumb`

That's it! Your new repo should be cloned into the `Skeletor.plugins` directory ready for development. You can check in your changes to that sub module like a normal git commit, but you will also have to commit the sub module update to the parent `skeletor.framework` repo.

There is a sample plugin repo at [delphic-digital/Skeletor.pluginTemplate](https://github.com/delphic-digital/Skeletor.pluginTemplate) with files to get you started.


## Creating your plugin

Skeletor.core includes a plugin factory. The plugin factory requires a few things to be defined in your plugin prior to calling the plugin factory function.

1. Your plugin's constructor, calling `__super__`
2. A `DEFAULTS` static property on your plugin's constructor
3. A `VERSION` static property on your plugin's constructor


Here is an example of creating a `breadcrumb` plugin.

```
//skeletor.breadcrumb.js

define(['jquery', 'skeletor.core'],function ($, Skeletor){
    function Breadcrumb(element, options) {
        Breadcrumb.__super__.call(this, element, options, Breadcrumb.DEFAULTS);

        Breadcrumb.VERSION = '0.0.1';

        Breadcrumb.DEFAULTS = {
          cssClass = 'breadcrumb'
        };

        Skeletor.Plugin.create('breadcrumb', Breadcrumb, {
            _init: function(element) {
            	this.$element = $(element);
            }
        });
    }
})
```

First, we declare a `Breadcrumb` constructor, and VERSION and DEFAULTS properties. We then invoke the static `Skeletor.Plugin.create` function for Skeletor's core. Through prototypal inheritance, this function extends the `Breadcrumb` prototype with the `Plugin` prototype. Additionally, it creates our jQuery plugin interface.

To create a breadcrumb instance, you merely need to use:

```
var $breadcrumb = new Skeletor.Breadcrumb($('.breadcrumb__list'));
```

## Passing options to a plugin.

You can extend the default options on plugin in typical jQuery format. Pass your options as the second argument.

```
var $breadcrumb = new Skeletor.Breadcrumb($('.breadcrumb__list'), {
   size: 'large',
   spacer: '|'
});
```

Your options are passed through to the `options` object inside your plugin and extend the defaults. you can also overwrite the defaults.

```
//skeletor.breadcrumb.js

define(['jquery', 'skeletor.core'],function ($, Skeletor){
    function Breadcrumb(element, options) {
        Breadcrumb.__super__.call(this, element, options, Breadcrumb.DEFAULTS);

        Breadcrumb.VERSION = '0.0.1';

        Breadcrumb.DEFAULTS = {
          cssClass = 'breadcrumb'
        };

        Skeletor.Plugin.create('breadcrumb', Breadcrumb, {
            _init: function(element) {
            	this.$element = $(element);
            	console.log(this.options.cssClass)
            	console.log(this.options.spacer)
            	console.log(this.options.large)
            }
        });
    }
})
```


## Invoking methods on a plugin.

The plugin factory facilitates invoking methods via the plugin interface. This means that once a plugin is initialized, public methods can be invoked by passing the name of the method as the first parameter to the plugin function.

Public methods are methods defined on the object passed into the `Skeletor.Plugin.create` factory method that aren't preceded by an *underscore* character. Methods preceded by an *underscore* are considered private methods.

Using our `breadcrumb` example above, here's what public methods would look like:

```
//skeletor.breadcrumb.js

define(['jquery', 'skeletor.core'],function ($, Skeletor){
    function Breadcrumb(element, options) {
        Breadcrumb.__super__.call(this, element, options, Breadcrumb.DEFAULTS);

        Breadcrumb.VERSION = '0.0.1';

        Breadcrumb.DEFAULTS = {
          cssClass = 'breadcrumb'
        };

        Skeletor.Plugin.create('breadcrumb', Breadcrumb, {
            _init: function(element) {
                this.$element = $(element);
            },
            enable: function() {
                this.$element.removeAttr('disabled');
            },
            disable: function() {
                this.$element.attr('disabled', 'disabled');
            },
            isEnabled: function() {
                return !this.$element[0].hasAttribute('disabled');
            }
        });
    }
})
```

In the above example, the `enable` and `disable` functions are public. To invoke the method, simply call it on the saved instance:

```
var $breadcrumb = new Skeletor.Breadcrumb($('.breadcrumb__list'));

$breadcrumb.disable();
```

Next: [Registering a plugin](/contribute/registering-a-plugin/)