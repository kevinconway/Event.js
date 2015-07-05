/*
The MIT License (MIT)
Copyright (c) 2013 Kevin Conway

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*jslint node: true, continue: true, indent: 2, passfail: true */
"use strict";

module.exports = (function () {

  var Modelo = require('modelo'),
    defer = require('deferjs'),
    EventMixin;

  // Adds a listener to the list.
  // Private method hidden from api.
  function appendListener(event, listener, once) {

    this.events[event] = this.events[event] || [];
    this.events[event].push({
      "listener": listener,
      "once": !!once
    });

    this.emit('newListener', event, listener);

    if (this.events[event].length > this.maxListeners) {

      console.warn('warning: possible EventEmitter memory leak detected. ',
        this.events[event].length, ' listeners added. ',
        'Use emitter.setMaxListeners() to increase limit. ',
        this);

    }

  }

  function popListeners(event, listener) {

    var x, removed;

    this.events[event] = this.events[event] || [];

    for (x = this.events[event].length - 1; x >= 0; x = x - 1) {

      if (listener !== undefined &&
          this.events[event][x].listener !== listener) {

        continue;

      }

      removed = this.events[event].splice(x, 1);
      this.emit('removeListener', event, removed);

    }

  }

  // The EventMixin object is a Modelo object that provides asynchronous
  // events. While new instances of EventMixin can be created directly, it
  // is intended as more of a Mix-In object that can be added to any
  // inheritance chain.
  EventMixin = Modelo.define(function EventMixin() {

    this.events = {};
    this.maxListeners = 10;

  });

  // Adds a listener to the end of the listeners array for the specified event.
  // Returns emitter, so calls can be chained.
  EventMixin.prototype.addListener = function addListener(event, listener) {

    appendListener.call(this, event, listener, false);
    return this;

  };
  EventMixin.prototype.on = EventMixin.prototype.addListener;

  EventMixin.prototype.once = function once(event, listener) {

    appendListener.call(this, event, listener, true);

    return this;

  };

  // Remove a listener from the listener array for the specified event.
  // Returns emitter, so calls can be chained.
  EventMixin.prototype.removeListener = function removeListener(
    event,
    listener
  ) {

    // Insert empty object for listener when not given to prevent accidental
    // removal of all listeners.
    popListeners.call(this, event, listener || {});

    return this;

  };

  // Removes all listeners, or those of the specified event. It's not a good
  // idea to remove listeners that were added elsewhere in the code, especially
  // when it's on an emitter that you didn't create.
  // Returns emitter, so calls can be chained.
  EventMixin.prototype.removeAllListeners = function removeAllListeners(
    event
  ) {

    var keys,
      length,
      x;

    if (event === undefined) {

      keys = Object.keys(this.events);
      length = keys.length;
      for (x = 0; x < length; x = x + 1) {
        popListeners.call(this, keys[x]);
      }

    } else {

      popListeners.call(this, event);

    }

    return this;

  };

  // By default EventEmitters will print a warning if more than 10 listeners
  // are added for a particular event. This is a useful default which helps
  // finding memory leaks. Obviously not all Emitters should be limited to 10.
  // This function allows that to be increased. Set to zero for unlimited.
  EventMixin.prototype.setMaxListeners = function setMaxListeners(n) {

    this.maxListeners = n;

  };

  // Returns an array of listeners for the specified event.
  EventMixin.prototype.listeners = function listeners(event) {

    var results = [],
      x;

    this.events[event] = this.events[event] || [];

    for (x = 0; x < this.events[event].length; x = x + 1) {

      results.push(this.events[event][x].listener);

    }

    return results;

  };

  // Execute each of the listeners in order with the supplied arguments.
  // Returns true if event had listeners, false otherwise.
  EventMixin.prototype.emit = function emit(event) {

    var listenerArgs = [],
      length = arguments.length,
      x,
      numberListeners,
      remove = [];

    for (x = 1; x < length; x = x + 1) {
      listenerArgs[x - 1] = arguments[x];
    }

    this.events[event] = this.events[event] || [];
    numberListeners = this.events[event].length;

    function executeListener(listener, args) {

      listener.apply(this, args);

    }

    length = this.events[event].length;
    for (x = 0; x < length; x = x + 1) {

      defer(
        defer.bind(
          executeListener,
          this,
          this.events[event][x].listener,
          listenerArgs
        )
      );

      if (this.events[event][x].once === true) {

        remove.push(this.events[event][x].listener);

      }

    }

    length = remove.length;
    for (x = 0; x < length; x = x + 1) {

      this.removeListener(event, remove[x]);

    }

    return numberListeners > 0;

  };

  // Return the number of listeners for a given event.
  EventMixin.listenerCount = function listenerCount(emitter, event) {

    return emitter.listeners(event).length;

  };

  return EventMixin;

}());
