
// courtesy: https://gist.github.com/repeatingbeats/799136
process.env.NODE_ENV = 'test';
 
var testCase = require('nodeunit').testCase;
 
exports.common = {

  setUp: function commonSetup(cb) {
    //require('../../start.js').runOnNode;
    cb();
  },
 
  testRunOnNode: function testRunOnNode(test) {
    console.log(arguments.callee.name);
    test.done();
  },
 
}


exports.master = testCase({
 
  setUp: function masterSetup(cb) {
    console.log(arguments.callee.name);
    cb();
  },
 
  tearDown: function masterTearDown(cb) {
    console.log(arguments.callee.name);
    cb();
  },
 
  masterTestOne: function masterTestOne(test) {
    console.log(arguments.callee.name);
    test.done();
  },
  
  /*
  nestedGroup: testCase({
 
    setUp: function masterNestedSetup(cb) {
      console.log(arguments.callee.name);
      cb();
    },
 
    tearDown: function masterNestedTearDown(cb) {
      console.log(arguments.callee.name);
      cb();
    },
 
    masterNestedTestOne: function masterNestedTestOne(test) {
      console.log(arguments.callee.name);
      test.done();
    },
 
    masterNestedTestTwo: function masterNestedTestTwo(test) {
      console.log(arguments.callee.name);
      test.done();
    },
 
  }),
 
  masterTestThree: function masterTestThree(test) {
    console.log(arguments.callee.name);
    test.done();
  }
  */
 
});
 
exports.slave = {
 
  slaveTestOne: function slaveTestOne(test) {
    console.log(arguments.callee.name);
    test.done();
  },
 
  slaveTestTwo: function slaveTestTwo(test) {
    console.log(arguments.callee.name);
    test.done();
  }
}