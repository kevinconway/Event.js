/*jslint node: true, indent: 2, passfail: true */
/*globals describe, it */

"use strict";

var expect = require('expect.js'),
  EventMixin = require('../event/event.js');

describe('Event.js', function () {

  it('loads in the current environment', function () {

    expect(EventMixin).to.be.ok();

  });

  it('exposes a specification compliant interface', function () {

    expect(typeof EventMixin).to.be("function");

    expect(typeof EventMixin.extend).to.be("function");

  });

  it('registers and triggers events', function (done) {

    var t = new EventMixin(),
      test_value = {};

    t.on('test', function () {
      test_value.test = true;
      expect(test_value.test).to.be(true);
      done();
    });

    expect(test_value.test).to.be(undefined);

    t.trigger('test');

    expect(test_value.test).to.be(undefined);

  });

  it('executes callbacks in the correct context', function (done) {

    var t = new EventMixin(),
      test_value = {};

    t.on('test', function () {
      this.test = true;
      expect(test_value.test).to.be(true);
      done();
    }, test_value);

    expect(test_value.test).to.be(undefined);

    t.trigger('test');

    expect(test_value.test).to.be(undefined);

  });

  it('removes events', function (done) {

    var t = new EventMixin(),
      test_value = {},
      callback = function () {
        test_value.test = true;
        expect(test_value.test).to.be(true);

        t.off('test', callback);

        expect(test_value.test).to.be(true);

        test_value.test = false;

        expect(test_value.test).to.be(false);

        t.on('test', function () {

          expect(test_value.test).to.be(false);

          done();

        });

        t.trigger('test');

      };

    t.on('test', callback);

    expect(test_value.test).to.be(undefined);

    t.trigger('test');

    expect(test_value.test).to.be(undefined);

  });

  it('removes events of the same callback but different context correctly', function () {

    var t = new EventMixin(),
      callback = function () { return null; },
      fakeCtx = function () { return null; };

    t.on('test', callback, fakeCtx);
    t.on('test', callback, fakeCtx);
    t.on('test', callback);
    t.on('test', callback);

    expect(t.events.test.length).to.be(4);

    t.off('test', callback, fakeCtx);
    expect(t.events.test.length).to.be(2);

    t.off('test', callback);
    expect(t.events.test.length).to.be(0);

  });

});

