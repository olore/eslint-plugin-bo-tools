module.exports = function (context) {

  'use strict';

  var withinIt = false;
  var withinThenOrCatchOrFinally = false;
  var calledDoneFn = false;
  var doneFnName;
  var applyOrDigestOrFlushCalled = false;
  var itContainedThenOrCatchOrFinally = false;

  function debug() {
    //console.log(arguments[0]);
  }

  function isIt(node) {
    return node.callee && node.callee.name === 'it';
  }

  function getDoneFnName(node) {
    if (node.arguments.length === 2) {
      var fe = node.arguments[1];
      if (fe.type === 'FunctionExpression') {
        if (fe.params && fe.params[0]) {
          return fe.params[0].name;
        }
      }
    }
  }

  function reset() {
    withinIt = false;
    itContainedThenOrCatchOrFinally = false;
    withinThenOrCatchOrFinally = false;
    calledDoneFn = false;
    doneFnName = undefined;
    applyOrDigestOrFlushCalled = false;
  }

  return {

    'Identifier': function (node) {
      if (node.name === 'then' ||
          node.name === 'catch' ||
          node.name === 'finally') {
        withinThenOrCatchOrFinally = true;
        if (withinIt) {
          itContainedThenOrCatchOrFinally = true;
        }
        debug('IN a then');
      } else {

        if (withinThenOrCatchOrFinally) {
          if (doneFnName && node.name === doneFnName) {
            debug('Called done function: ' + doneFnName);
            calledDoneFn = true;
          }
        }

        if (node.name === '$apply' ||
            node.name === '$digest' ||
            node.name === 'flush') {

          if (calledDoneFn) {
            debug(node.name + ' called');
            applyOrDigestOrFlushCalled = true;
          }
        }
      }
    },

    'CallExpression:exit': function (node) {
      if (isIt(node)) {
        debug('exiting an it');
        if (itContainedThenOrCatchOrFinally) {

          if (!calledDoneFn) {
            context.report(node, 'Spec contains a then/catch/finally but doesn\'t execute a done() function');
          }
          //if (calledDoneFn && !applyOrDigestOrFlushCalled) {
          //  context.report(node, 'Spec contains a then/catch/finally but doesn\'t execute $apply(), $digest(), or httpBackend.flush() function');
          //}
        }
      }

      if (node.callee && node.callee.property) {
        if (node.callee.property.name === 'then') {
          debug('exiting a THEN');
          withinThenOrCatchOrFinally = false;
        }
      }

    },

    'CallExpression': function (node) {
      var runningTests = context.getFilename() === '<input>';

      if (runningTests || context.getFilename().indexOf('-spec.js') > 0) {

        if (isIt(node)) {
          debug('entered an it');
          reset();
          withinIt = true;
          doneFnName = getDoneFnName(node);

          // lots of false positives until
          //TODO: support  }).then(done);

          // lots of false positives until
          //TODO: support a function that eventually calls $apply(), $digest(), flush()

          //TODO: handle then/catch/finally in a beforeEach/afterEach

        } else {

          if (withinIt && withinThenOrCatchOrFinally) {
            if (node.callee && node.callee.name) {
              if (node.callee.name === doneFnName) {
                debug('Called done function');
                calledDoneFn = true;
              }
            }
          }

        }
      }
    }
  };
};
