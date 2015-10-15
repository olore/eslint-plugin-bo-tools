/**
 * @fileoverview Prefer moment() over new Date()
 * @author Brian Olore
 * @copyright 2015 Brian Olore. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-new-date"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var preferMomentError = [{ message: 'Prefer moment() over new Date()' }];

ruleTester.run("no-new-date", rule, {

  valid: [
    {
      code: 'var something = "this is not a new Date()";', 
    },
    {
      code: 'var iPrefer = moment();', 
    }
  ],

  invalid: [
    {
      code: 'var d = new Date();',
      errors: preferMomentError
    },

    {
      code: 'var something = "abc";      \
          var d = new Date(123);         \
      ',
      errors: preferMomentError
    }
  ]
});
