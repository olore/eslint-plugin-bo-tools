/**
 * @fileoverview Prefer moment() over new Date()
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

  // any helper functions should go here or else delete this section

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {

    'Identifier': function (node) {
    if (node.name == 'Date') {
      context.report(node, 'Prefer moment() over new Date()');
    }
    }
  };

};

module.exports.schema = [
  // fill in your schema
];
