---
date: 2016-06-24T16:37:49-04:00
menu:
  main:
    parent: contribute
title: Writing docs
weight: 7
---

This documentation site is coded with [Hugo](http://gohugo.io/) static site generator. It's easy to contribute to by following these steps:

* [Install Hugo](http://gohugo.io/overview/installing/)
* Clone the [Skeletor.docs](https://github.com/delphic-digital/Skeletor.docs) repo.

From the command line, `cd` into your cloned directory and run `hugo server`.

Browse to localhost:1313 and the Skeletor documentation site should be up and running! The content directory contains all the markdown files that make up the pages. There is a special meta at the top for defining nav structure and page title.

After you commit, a script will auto deploy the changes to github pages for live website updates!