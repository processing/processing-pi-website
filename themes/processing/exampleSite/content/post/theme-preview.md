---
title: "Theme preview"
date: 2017-08-23T18:03:09+08:00
lastmod: 2017-08-23T18:03:09+08:00
draft: false
tags: ["preview", "Theme preview", "tag-3"]
categories: ["Theme preview", "category-2", "category-3"]

weight: 10

---

# 1. Headers

# H1
## H2
### H3
#### H4
##### H5
###### H6

## 2. Markdown functions

 `*` or `_` To _underline_

 `**` or `__` to **emphasize** or __emphasize__

 `~~` to ~~Strikethrough~~

Superscript and subscript X<sup>2</sup> / X<sub>2</sub>

Key select <kbd>Ctrl</kbd>

Link [Processing](https://Processing.org)

Reference to another section within document [click](#section-07)

*Note：you can customize paragraph anchors by using `{#section-id}`*

References: <sup>[[1]](#ref01)</sup>

## 3. Lists

Lists

### 3.1 Unordered lists

* Item
  - Item
  - Item
* Item
  1. Item
  2. Item
* Item

### 3.2 Ordered lists

1. Item
  1. Item
  2. Item
2. Item
  - Item
  - Item
3. Item

### 3.4 ToDO lists

- [ ] Cmd Markdown
  - [ ] Task 1
  - [ ] Task 2
  - [x]  [Task lists](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
- [ ] More tasks
  - [ ] Task 3
  - [x] All done!

## 4. Quotes

> Read this please
>
> <cite>-- Source </cite>

## 5. Highlighter

Code highlighting

```javascript
// Initialize video.js player
if (document.getElementById('my-player') !== null) {
  /* eslint-disable no-undef */
  videojs('#my-player', {
    aspectRatio: '16:9',
    fluid: true,
  });
}
```

## 6. HR

---

Horizontal line via CSS

## 7. Images {#section-07}

See image below👇

![hugo even showcase](https://raw.githubusercontent.com/olOwOlo/hugo-theme-even/master/images/showcase.png "showcase.png")

Here's a shortcode for centered image👇

{{% figure class="center" src="https://raw.githubusercontent.com/olOwOlo/hugo-theme-even/master/images/showcase.png" alt="hugo even showcase" title="showcase.png" %}}

## 8. Tables

Markdown tables 👇

| Tables        | Are           | Cool  |
| :------------ |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## 9. YouTube

Via shortcode

{{% youtube "PBsUD40nPkI" %}}

## References

1. <a id="ref01">[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)</a>
