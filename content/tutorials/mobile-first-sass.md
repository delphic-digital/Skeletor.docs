---
date: 2016-07-01T09:39:50-04:00
menu:
  main:
    parent: tutorials
title: Mobile first sass
weight: 5
---

We found using a traditional mobile first structure within each component partial is better for maintainability than inlining media queries into each class. This way, there is only one of each breakpoints defined in each component, instead of scattered throughout. This makes a big difference on large scale sites.

```scss
.main-nav {

  &__list {}
  &__item {}

  @include breakpoint($medium){
    &__list {}
    &__item {}
  }
}
```

instead of


```scss
.main-nav {

  @include breakpoint($medium){}

  &__list {
    @include breakpoint($medium){}
  }

  &__item {
    @include breakpoint($medium){}
  }
}
```
