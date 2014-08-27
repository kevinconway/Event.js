========
Event.js
========

**Cross platform, asynchronous EventEmitter.**

.. image:: https://travis-ci.org/kevinconway/Event.js.png?branch=master
    :target: https://travis-ci.org/kevinconway/Event.js
    :alt: Current Build Status

What Is Event?
===============

Event.js is an implementation of the EventEmitter API that works in both
Node.js and the browser. It should be compatible with every JavaScript
inheritance utility (such as util.inherits). Alternatively, it also has its
own inheritance utilities built in powered by
`Modelo.js <https://github.com/kevinconway/Modelo.js>`_.

Show Me
=======

::

    var Person = Event.extend(),
        somePerson = new Person();

    somePerson.on("birthday", function () { console.log("Happy B-Day."); })

    somPerson.emit("birthday");

    // At some point later:
    // Console Output: "Happy B-Day."

For more detailed usage guides and API specifications, see the
`official EventEmitter documentation <http://nodejs.org/api/events.html>`_.

Setup
=====

Node.js
-------

This package is published through NPM under the name `eventjs`::

    $ npm install eventjs

Once installed, simply `Event = require("eventjs")`.

Browser
-------

This module uses browserify to create a browser compatible module. The default
grunt workflow for this project will generate both a full and minified browser
script in a build directory which can be included as a <script> tag::

    <script src="event.browser.min.js"></script>

The package is exposed via the global name `eventjs`.

Tests
-----

Running the `npm test` command will kick off the default grunt workflow. This
will lint using jslint, run the mocha/expect tests, generate a browser module,
and set up a browser test runner.

License
=======

Event
-----

This project is released and distributed under an MIT License.

::

    Copyright (C) 2013 Kevin Conway

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.

Contributors
============

Style Guide
-----------

All code must validate against JSlint.

Testing
-------

Mocha plus expect. All tests and functionality must run in Node.js and the
browser.

Contributor's Agreement
-----------------------

All contribution to this project are protected by the contributors agreement
detailed in the CONTRIBUTING file. All contributors should read the file before
contributing, but as a summary::

    You give us the rights to distribute your code and we promise to maintain
    an open source release of anything you contribute.
