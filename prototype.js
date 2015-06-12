// build our blueprint object
var MyBluePrint = function MyBluePrintObject() {
  
  this.someFunction = function someFunction() {
    alert('some function');
  };
  
  this.someOtherFunction = function someOtherFunction() {
    alert('some other function');
  };
  
  this.showMyName = function showMyName() {
    alert(this.name);
  };
  
};
 
function MyObject() {
  this.name = 'testing';
}
MyObject.prototype = new MyBluePrint();
 
// example usage
var testObject = new MyObject();
testObject.someFunction(); // alerts "some function"
testObject.someOtherFunction(); // alerts "some other function"
testObject.showMyName(); // alerts "testing"
