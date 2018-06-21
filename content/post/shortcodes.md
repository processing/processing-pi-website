---
title: "Shortcodes"
date: 2016-08-30T16:01:23+08:00
lastmod: 2018-02-01T18:01:23+08:00
draft: false
tags: ["shortcodes"]
categories: ["shortcodes"]
hiddenFromHomePage: true


---

# buttons

{{< button text="Button" link="#" >}}

{{< button type="secondary" text="Button" link="#" >}}

{{< button type="outline" text="Button" link="#" >}}

{{< button type="secondary outline" text="Button" link="#" >}}

{{< button type="small" text="Button" link="#" >}}

{{< button type="secondary small" text="Button" link="#" >}}

{{< button type="big" text="Button" link="#" >}}

{{< button type="secondary big" text="Button" link="#" >}}

{{< button type="large" text="Button" link="#" >}}

{{< button type="secondary large" text="Button" link="#" >}}

{{< button type="upper" text="Button" link="#" >}}

{{< button type="secondary upper" text="Button" link="#" >}}

{{< button type="upper outline" text="Button" link="#" >}}

{{< button type="secondary upper outline" text="Button" link="#" >}}

{{< button type="round" text="Button" link="#" >}}

{{< button type="secondary round" text="Button" link="#" >}}

{{< button type="round outline" text="Button" link="#" >}}

{{< button type="secondary round outline" text="Button" link="#" >}}

{{< button type="inverted" text="Button" link="#" >}}

# Optional typography

Muted Text

```markdown
{{%/* muted */%}}
Some text  • For your information • Not as noticeable
{{%/* /muted */%}}
```
Result: 

{{% muted %}}
Some text  • For your information • Not as noticeable
{{% /muted %}}

=======
# Columns 

{{% row %}}

{{% columns 4 %}}
Default message without title.
This is my text and a link to [Google](google.com)
{{% /columns %}}


{{% columns 4 %}}
Default message without title.
This is my text and a link to [Google](google.com)
{{% /columns %}}


{{% columns 4 %}}
Default message without title.
This is my text and a link to [Google](google.com)
{{% /columns %}}

{{% /row %}}

# center, right, left

```
## default
![img](/path/to/img.gif "img")

{{%/* center */%}}
## center
![img](/path/to/img.gif "img")
{{%/* /center */%}}

{{%/* right */%}}
## right
![img](/path/to/img.gif "img")
{{%/* /right */%}}

{{%/* left */%}}
## left
![img](/path/to/img.gif "img")
{{%/* /left */%}}
```
<!--more-->

## default
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")

{{% center %}}
## center
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /center %}}

{{% right %}}
## right
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /right %}}

{{% left %}}
## left
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /left %}}

---

## figure with class 

```
{{%/* figure src="/path/to/img.gif" title="default" alt="img" */%}}
{{%/* figure class="text-center" src="/path/to/img.gif" title="center" alt="img" */%}}
{{%/* figure class="text-right" src="/path/to/img.gif" title="right" alt="img" */%}}
{{%/* figure class="text-left" src="/path/to/img.gif" title="left" alt="img" */%}}
```

{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default" alt="img" %}}
{{% figure class="text-center" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="center" alt="img" %}}
{{% figure class="text-right" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="right" alt="img" %}}
{{% figure class="text-left" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="left" alt="img" %}}

---

```
{{%/* center */%}}

## hybrid in center
{{%/* figure src="/path/to/img.gif" title="default" alt="img" */%}}
{{%/* figure class="text-right" src="/path/to/img.gif" title="right" alt="img" */%}}

{{%/* left */%}}
{{%/* figure src="/path/to/img.gif" title="default in left" alt="img" */%}}
{{%/* /left */%}}

{{%/* /center */%}}
```

{{% center %}}
## hybrid in center
{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default" alt="img" %}}
{{% figure class="text-right" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="right" alt="img" %}}
{{% left %}}
{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default in left" alt="img" %}}
{{% /left %}}
{{% /center %}}

===

# Messages / alerts 

{{% message %}}
Default message without title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message title="Message with title" %}}
Default message with a title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message type="warning" title="Warning!" %}}
Warning message with a title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message warning%}}
Warning message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message type="success" title="Success!" %}}
Success message with a title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message success%}}
Success message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message type="focus" title="Focus!" %}}
Focus message with a title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message focus%}}
Focus message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message type="error" title="Error!" %}}
Error message with a title.
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message error%}}
Error message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message black%}}
Black background message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

{{% message inverted %}}
Inverted  background message without the title
This is my text and a link to [Google](google.com)
{{% /message %}}

---

<style>
.post-content img {
  height: 64px;
}
</style>
