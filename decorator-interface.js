// Create interfaces using a pre-defined Interface
// constructor that accepts an interface name and
// skeleton methods to expose.
 
// In our reminder example summary() and placeOrder()
// represent functionality the interface should
// support
var reminder = new Interface("List", ["summary", "placeOrder"]);
 
var properties = {
  name: "Remember to buy the milk",
  date: "05/06/2016",
  actions:{
    summary: function() {
      return "Remember to buy the milk, we are almost out!";
   },
    placeOrder: function() {
      return "Ordering milk from your local grocery store";
    }
  }
};
 
// Now create a constructor implementing the above properties
// and methods
 
function Todo(config) {
 
  // State the methods we expect to be supported
  // as well as the Interface instance being checked
  // against
 
  Interface.ensureImplements(config.actions, reminder);
 
  this.name = config.name;
  this.methods = config.actions;
 
}
 
// Create a new instance of our Todo constructor
 
var todoItem = Todo(properties);
 
// Finally test to make sure these function correctly
 
console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());
 
// Outputs:
// Remember to buy the milk, we are almost out!
// Ordering milk from your local grocery store
