/**
 * @fileoverview Prefer then()/catch() over passing 2 functions to a then()
 * @author Brian Olore
 * @copyright 2015 Brian Olore. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  function debug() {
    console.log(arguments[0], arguments[1]);
  }

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  var withinThen = false;

  return {
    'CallExpression': function (node) {
      if (node.callee 
          && node.callee.property 
          && node.callee.property.name 
          && node.callee.property.name === 'then') {
        if (node.arguments.length == 2) {
          context.report(node, 'Use catch() with then() instead of passing 2nd function.');
        }
      }
    }

  };

};

module.exports.schema = [
  // fill in your schema
];
