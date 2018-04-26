---
layout: post
title:  "Introducing the Volt Compiler"
date:   2018-04-26 2:20:33 -0600
categories: jekyll update
---
# Welcome to the Volt Compiler!

## What is the Volt Compiler?

The [Volt Compiler][volt-compiler] was started by [dallen4][dallen4] with the purpose of bootstrapping the design process for the Security Rules language set forth by Google's [Firebase][firebase] platform. While this platform provides a plethora of cloud-based services for serverless application development, two of their newest services ([Cloud Firestore][firestore] and [Storage][storage]) depend on this robust, albeit verbose, Security Rules language for their security. Due to the amount of code and understanding required to make rules for common use cases concerning data validation and security, Volt users believe there is a way to make securing and validating your data easier.

## How is this accomplished?

This goal is achieved through the Volt Syntax (*.vlt). This syntax was designed to be lean, declarative, and easy to write (and read) while preserving key attributes and use cases of the Firebase Security Rules language. While the Rules syntax is (reasonably) easy to read, it is more cumbersome to write and requires a fair amount of contextual understanding of how the rules work to achieve permissions and security that are integral to most modern applications.

{% highlight %}

{% endhighlight %}

Check out the [Volt Wiki][volt-wiki] for more information about the syntax concepts and how to get the most out of your Volt experience. File all bugs/feature requests at the [Volt GitHub repo][volt-compiler].

[dallen4]: https://github.com/dallen4
[volt-compiler]:   https://github.com/dallen4/volt-compiler
[volt-wiki]: https://github.com/dallen4/volt-compiler/wiki
[firebase]: https://firebase.google.com/
[firestore]: https://firebase.google.com/docs/firestore
[storage]: https://firebase.google.com/docs/storage
