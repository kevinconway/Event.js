/*jslint node: true, indent: 2, passfail: true */
/*globals describe, it */

(function (context, generator) {
  "use strict";

  generator.call(
    context,
    'tests/eventjs',
    ['expect', 'eventjs'],
    function (expect, EventMixin) {

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
    }
  );

}(this, (function (context) {
  "use strict";

  // Ignoring the unused "name" in the Node.js definition function.
  /*jslint unparam: true */
  if (typeof require === "function" &&
        module !== undefined &&
        !!module.exports) {

    // If this module is loaded in Node, require each of the
    // dependencies and pass them along.
    return function (name, deps, mod) {

      var x,
        dep_list = [];

      for (x = 0; x < deps.length; x = x + 1) {

        dep_list.push(require(deps[x]));

      }

      module.exports = mod.apply(context, dep_list);

    };

  }
  /*jslint unparam: false */

  if (context.window !== undefined) {

    // If this module is being used in a browser environment first
    // generate a list of dependencies, run the provided definition
    // function with the list of dependencies, and insert the returned
    // object into the global namespace using the provided module name.
    return function (name, deps, mod) {

      var namespaces = name.split('/'),
        root = context,
        dep_list = [],
        current_scope,
        current_dep,
        i,
        x;

      for (i = 0; i < deps.length; i = i + 1) {

        current_scope = root;
        current_dep = deps[i].split('/');

        for (x = 0; x < current_dep.length; x = x + 1) {

          current_scope = current_scope[current_dep[x]] =
                          current_scope[current_dep[x]] || {};

        }

        dep_list.push(current_scope);

      }

      current_scope = root;
      for (i = 1; i < namespaces.length; i = i + 1) {

        current_scope = current_scope[namespaces[i - 1]] =
                        current_scope[namespaces[i - 1]] || {};

      }

      current_scope[namespaces[i - 1]] = mod.apply(context, dep_list);

    };

  }

  throw new Error("Unrecognized environment.");

}(this))));
