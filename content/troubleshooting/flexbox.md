---
date: 2016-09-01T11:49:49-04:00
menu:
  main:
    parent: troubleshooting
title: Flexbox
weight: 6
---

There are 3 different versions of flexbox. Skeletor can detect and adds a body class if flexbox is supported.

```CSS
display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
display: -ms-flexbox;      /* TWEENER - IE 10 */
display: -webkit-flex;     /* NEW - Chrome */
display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
```