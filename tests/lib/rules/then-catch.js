/**
 * @fileoverview Prefer then()/catch() over passing 2 functions to a then()
 * @author Brian Olore
 * @copyright 2015 Brian Olore. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/then-catch"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errorMessage = [{ message: 'Use catch() with then() instead of passing 2nd function.' }];

ruleTester.run("then-catch", rule, {

  valid: [
    {
      code: 'somePromise                      \
        .then(function() {                    \
          something();                        \
        })                                    \
        .catch(function() {                   \
          fail();                             \
        });',
    },

    {
      code: 'fnThatReturnsPromise()           \
        .then(function() {                    \
          something();                        \
        })                                    \
        .catch(function() {                   \
          fail();                             \
        });',
    }
  ],

  invalid: [
    {
      code: 'somePromise                      \
        .then(                                \
          function() {/*success*/},           \
          function() { /*fail*/}              \
        );',

      errors: errorMessage
    },

    {
      code: 'fnThatReturnsPromise()           \
        .then(                                \
          function() {/*success*/},           \
          function() { /*fail*/}              \
        );',

      errors: errorMessage
    },

    {
      code: 'fnThatReturnsPromise().then(succFn, failFn);',

      errors: errorMessage
    }
  ]
});
