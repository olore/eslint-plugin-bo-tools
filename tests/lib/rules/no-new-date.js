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
ruleTester.run("no-new-date", rule, {

  valid: [
    {
      code: "var something = 'this is not a new Date()';", 
    }
  ],

  invalid: [
    {
      code: "var d = new Date();",
      errors: [{
        message: "Prefer moment() over new Date()"
        //type: "Me too"
      }]
    },
    {
      code: "var something = 'this is not a new Date()'; \
          var butThisIs = new Date();",

      errors: [{
        message: "Prefer moment() over new Date()"
        //type: "Me too"
      }]
    }
  ]
});
