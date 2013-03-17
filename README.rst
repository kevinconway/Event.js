========
Event.js
========

**Cross platform, asynchronous events for JavaScript.**

*Status: Stable*

What Is Event?
===============

Event.js is a Modelo.js mix-in object that adds asynchronous event handling to
JavaScript objects.

Show Me
=======

::

    var Person = Event.extend(),
        somePerson = new Person;

    somePerson.on("birthday", function () { console.log("Happy B-Day."); })

    somPerson.trigger("birthday");

    // At some point later:
    // Console Output: "Happy B-Day."

For more detailed usage guides and API specifications, see the docs directory.

Setup Instructions
==================

This library is designed to operate in multiple JavaScript environments without
requiring change to the code base. To accomplish this, all modules have been
wrapped in a specialized module pattern that will detect the current
environment and choose the most appropriate loading mechanism for dependencies.

Currently support platforms are Node.js, browser via <script>, and AMD via
RequireJS.

Node.js
-------

This package is published through NPM under the name `eventjs` and can be
installed with::

    $ npm install eventjs

This should automatically install all dependencies (modelo, deferjs).

This package can then be loaded with `require('eventjs')`.

Browser (<script>)
------------------

Developers working with a normal browser environment can use regular script
tags to load the package. This package has dependencies on these other
packages:

-   `Modelo <https://github.com/kevinconway/Modelo.js>`_

-   `Defer <https://github.com/kevinconway/Defer.js>`_

The load order should be something like this::

    <script src="modelo.js"></script>
    <script src="defer.js"></script>
    <script src="event.js"></script>

The package loads into a global variable named `Event`.

Browser (AMD)
-------------

Developers working with RequireJS can also load this package with `require()`.

One thing to note, however, is that this package has its own dependencies that
must also be available through `require()`. Developers with NPM installed can
make use of the pre-configured dependency options by doing the following::

    $ npm install eventjs
    $ cd node_modules/eventjs/
    $ npm install

Now when you reference `eventjs` as a dependency it should properly load
its own dependencies.

If you require something more specific then you can edit the dependency options
for this package by looking for the following line 33 which should be::

    amd: ['./node_modules/modelo/modelo.js', './node_modules/deferjs/defer.js']

Simply change these paths to match where you have placed the corresponding
files.

License
=======

Event
-----

This project is released and distributed under an MIT License.

::

    Copyright (C) 2013 Kevin Conway

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to
    deal in the Software without restriction, including without limitation the
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    sell copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.

Contributors
============

Style Guide
-----------

This library needs to be not only cross-platform compatible but also backwards
compatible as much as possible when it comes to browser environments. For this
reason, all code in this repository must validate with JSLint.

Testing
-------

Test coverage is essential to backing up the claim that this library is
compatible across all JavaScript environments. Unit tests are this repository's
guarantee that all components function as advertised in the environment. For
this reason, all code this repository must be tested using the chosen unit
testing library: Mocha.js. The chosen assertion library to use with Mocha
for this project is Expect.js. Mocha and Expect have been chosen for their
cross-platform compatibility.

For convenience and portability, both Mocha and Express are included in this
repository. For further convenience, browser based test runners have also been
included for both <script> and AMD loading.

Contributor's Agreement
-----------------------

All contribution to this project are protected by the contributors agreement
detailed in the CONTRIBUTING file. All contributors should read the file before
contributing, but as a summary::

    You give us the rights to distribute your code and we promise to maintain
    an open source release of anything you contribute.
