/**
 * @fileoverview Require calling done() whenever using promises in specs
 * @author Brian Olore
 * @copyright 2015 Brian Olore. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/jasmine-done"),

  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("jasmine-done", rule, {
  valid: [
    {
      code: '                                                                               \
            it("passes if no then/catch/finally", function (done) {                         \
              Service.save();                                                               \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with then", function (done) {                                               \
              Service.save().then(function () {                                             \
                done();                                                                     \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with then and done called via then", function (done) {                      \
              Service.save().then(function () {                                             \
                something();                                                                \
              }).then(done);                                                                \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with catch and done called via then", function (done) {                     \
              Service.save().catch(function () {                                            \
                something();                                                                \
              }).then(done);                                                                \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with then and done called via finally", function (done) {                   \
              Service.save().then(function () {                                             \
                something();                                                                \
              }).finally(done);                                                             \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with catch", function (done) {                                              \
              Service.save().catch(function () {                                            \
                done();                                                                     \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with finally", function (done) {                                            \
              Service.save().finally(function () {                                          \
                done();                                                                     \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with catch, done function can have any name", function (foo) {              \
              Service.save().catch(function () {                                            \
                foo();                                                                      \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("with then, done function can have any name", function (foo) {               \
              Service.save().then(function () {                                             \
                foo();                                                                      \
              });                                                                           \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("calls $digest", function (done) {                                           \
              Service.save().then(function () {                                             \
                done();                                                                     \
              });                                                                           \
              $scope.$digest();                                                             \
            });                                                                             \
          '
    },
    {
      code: '                                                                               \
            it("calls $digest", function (done) {                                           \
              Service.save().then(function () {                                             \
                done();                                                                     \
              });                                                                           \
              httpBackend.flush();                                                          \
            });                                                                             \
          '
    }
  ],

  invalid: [
    {
      code: '                                                                               \
            it("requires a done function when there is a then", function() {                \
              Service.save("paperwork").then(function () {                                  \
                doSomething();                                                              \
              });                                                                           \
            });                                                                             \
          ',
      errors: [{message: 'Spec contains a then/catch/finally but doesn\'t execute a done() function'}]
    },
    {
      code: '                                                                               \
            it("requires a done function when there is a catch", function() {               \
              Service.save().catch(function () {                                            \
                doSomething();                                                              \
              });                                                                           \
            });                                                                             \
          ',
      errors: [{message: 'Spec contains a then/catch/finally but doesn\'t execute a done() function'}]
    },
    {
      code: '                                                                               \
            it("requires a done function when there is a finally", function() {             \
              Service.save().finally(function () {                                          \
                doSomething();                                                              \
              });                                                                           \
            });                                                                             \
          ',
      errors: [{message: 'Spec contains a then/catch/finally but doesn\'t execute a done() function'}]
    },
    {
      code: '                                                                               \
            it("should fail because done is called outside the then", function(done) {      \
              Service.save("paperwork").then(function () {                                  \
                somethingThatIsntDone()                                                     \
              });                                                                           \
              done();                                                                       \
            });                                                                             \
          ',
      errors: [{message: 'Spec contains a then/catch/finally but doesn\'t execute a done() function'}]
    }
  ]
});
