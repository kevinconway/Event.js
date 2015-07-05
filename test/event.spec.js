/*jslint node: true, indent: 2, passfail: true */
/*globals describe, it */

"use strict";

var expect = require('expect.js'),
  EventMixin = require('../event/event.js');

describe('Event.js', function () {

  it('loads in the current environment', function () {

    expect(EventMixin).to.be.ok();

  });

  describe('The addListener method', function () {

    it('creates a listener array', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      expect(e.events.test).to.be.ok();
      expect(e.events.test.length).to.be(1);

    });

    it('return emitter', function () {

      var e = new EventMixin(),
        reference;

      reference = e.addListener('test', function () { return null; });
      expect(reference).to.be(e);

    });

    it('emits a newListener event', function (done) {

      var e = new EventMixin();
      e.addListener('newListener', function () { done(); });

    });

    it('adds listeners that are called more than once', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      expect(e.events.test[0].once).to.be(false);

    });

    it('is aliased by the on method', function () {

      expect(EventMixin.prototype.on).to.be(EventMixin.prototype.addListener);

    });

  });

  describe('The once method', function () {

    it('creates a listener array', function () {

      var e = new EventMixin();
      e.once('test', function () { return null; });
      expect(e.events.test).to.be.ok();
      expect(e.events.test.length).to.be(1);

    });

    it('return emitter', function () {

      var e = new EventMixin(),
        reference;

      reference = e.once('test', function () { return null; });
      expect(reference).to.be(e);

    });

    it('emits a newListener event', function (done) {

      var e = new EventMixin();
      e.once('newListener', function () { done(); });

    });

    it('adds listeners that are called only once', function () {

      var e = new EventMixin();
      e.once('test', function () { return null; });
      expect(e.events.test[0].once).to.be(true);

    });

  });

  describe('The removeListener method', function () {

    it('removes a listener from an array', function () {

      var e = new EventMixin(),
        noop = function () { return null; };
      e.addListener('test', noop);
      e.removeListener('test', noop);
      expect(e.events.test.length).to.be(0);

    });

    it('emits the removeListener event', function (done) {

      var e = new EventMixin(),
        noop = function () { return null; };
      e.addListener('test', noop);
      e.addListener('removeListener', function () { done(); });
      e.removeListener('test', noop);

    });

    it('does not remove all listeners by accident', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      e.addListener('test', function () { return null; });
      e.removeListener('test');
      expect(e.events.test.length).to.be(2);

    });

  });

  describe('The removeAllEvents method', function () {

    it('removes all listeners for an event', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      e.addListener('test', function () { return null; });
      e.removeAllListeners('test');
      expect(e.events.test.length).to.be(0);

    });

    it('does not remove listeners for untargetd events', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      e.addListener('test2', function () { return null; });
      e.removeAllListeners('test');
      expect(e.events.test2.length).to.be(1);

    });

    it('removes all listeners when no event given', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      e.addListener('test2', function () { return null; });
      e.removeAllListeners();
      expect(e.events.test.length).to.be(0);
      expect(e.events.test2.length).to.be(0);

    });

  });

  describe('The listeners method', function () {

    it('returns an array of listeners', function () {

      var e = new EventMixin(),
        noop = function () { return null; },
        listeners;

      e.addListener('test', noop);
      listeners = e.listeners('test');
      expect(listeners[0]).to.be(noop);

    });

  });

  describe('The emit method', function () {

    it('triggers listeners more than once', function (done) {

      var e = new EventMixin(),
        state = {"count": 0};
      e.addListener('test', function () { state.count = state.count + 1; });
      e.addListener('done', function () {
        expect(state.count).to.be(2);
        done();
      });
      e.emit('test');
      e.emit('test');
      e.emit('done');

    });

    it('only triggers once listeners once', function (done) {

      var e = new EventMixin(),
        state = {"count": 0};
      e.once('test', function () { state.count = state.count + 1; });
      e.once('done', function () {
        expect(state.count).to.be(1);
        done();
      });
      e.emit('test');
      e.emit('test');
      e.emit('done');

    });

    it('passes arguments to the listeners', function (done) {

      var e = new EventMixin();

      e.once('test', function (a, b, c) {
        expect(a).to.be(true);
        expect(b).to.be(false);
        expect(c).to.be(null);
      });
      e.once('done', function () { done(); });
      e.emit('test', true, false, null);
      e.emit('done');

    });

  });

  describe('The listenerCount method', function () {

    it('return the listener count', function () {

      var e = new EventMixin();
      e.addListener('test', function () { return null; });
      expect(EventMixin.listenerCount(e, 'test')).to.be(1);

    });

  });

});

