---
date: 2016-06-24T16:37:49-04:00
menu:
  main:
    parent: contribute
title: Getting started
toc: true
weight: 3
---

The Skeletor code is separated into multiple Git repos.

## [delphic-digital/Skeletor](https://github.com/delphic-digital/Skeletor)
This is the main Skeletor boilerplate code and contains all the base files, structure and gulp tasks.

## [delphic-digital/Skeletor.framework](delphic-digital/Skeletor.framework)
This is the parent repo for Skeletor's javascript framework and contains sub repos of all the javascript components.

### To get started...

Clone the Skeletor.framework. This should fetch all the sub repositories also. You should end up with a repo structured like this:

```bash
Skeletor.framework
|-- Skeletor.core
|   |-- # This is the main Skeletor JavaScript file that contains the namespace,
|       # and other utility functions to create plugins
|-- Skeletor.plugins
|   |-- # These are plugins such as accordions and modals
|-- Skeletor.sass
|   |-- # These are specifically sass plugins
|-- Skeletor.util
|   |-- # These are utilities such as feature detects and the component loader
```