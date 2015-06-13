# Patterns
A Collection of JavaScript patterns

### Module pattern
```javascript
var basketModule = (function() {
  // privates
 
  var basket = [];
 
  function doSomethingPrivate() {
    //...
  }
 
  function doSomethingElsePrivate() {
    //...
  }
 
  // Return an object exposed to the public
  return {
 
    // Add items to our basket
    addItem: function(values) {
      basket.push(values);
    },
 
    // Get the count of items in the basket
    getItemCount: function() {
      return basket.length;
    },
 
    // Public alias to a private function
    doSomething: doSomethingPrivate,
 
    // Get the total value of items in the basket
    getTotal: function() {
      var q = this.getItemCount();
      var p = 0;
 
      while(q--) {
        p += basket[q].price;
      }
 
      return p;
    }
  };
})();

// Usage:

// basketModule returns an object with a public API we can use
 
basketModule.addItem({
  item: "bread",
  price: 0.5
});
 
basketModule.addItem({
  item: "butter",
  price: 0.3
});
 
// Outputs: 2
console.log(basketModule.getItemCount());
 
// Outputs: 0.8
console.log(basketModule.getTotal());
 
// However, the following will not work:
 
// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// the public API
console.log(basketModule.basket);
 
// This also won't work as it only exists within the scope of our
// basketModule closure, but not the returned public object
console.log(basket);
```

### Singleton pattern
```javascript
var mySingleton = (function() {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod() {
      console.log("I am private");
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
 
      // Public methods and variables
      publicMethod: function() {
        console.log("The public can see me!");
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function() {
 
      if (!instance) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();
 
// Usage:
 
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
```

### Observer pattern
```javascript
// build the Subject base class
var Subject = (function(window, undefined) {

  function Subject() {
    this._list = [];
  }

  // this method will handle adding observers to the internal list
  Subject.prototype.observe = function observeObject(obj) {
    console.log('added new observer');
    this._list.push(obj);
  };
  
  Subject.prototype.unobserve = function unobserveObject(obj) {
    for(var i = 0, len = this._list.length; i < len; i++) {
      if (this._list[i] === obj) {
        this._list.splice(i, 1);
        console.log('removed existing observer');
        return true;
      }
    }
    return false;
  };
  
  Subject.prototype.notify = function notifyObservers() {
    var args = Array.prototype.slice.call(arguments, 0);
    for(var i = 0, len = this._list.length; i < len; i++) {
      this._list[i].update.apply(null, args);
    }
  };

  return Subject;

})(window);

// setup an object that fetchs stocks
function StockGrabber() {
  
  var subject = new Subject();
  
  this.addObserver = function addObserver(newObserver) {
    subject.observe(newObserver);
  };
  
  this.removeObserver = function removeObserver(deleteObserver) {
    subject.unobserve(deleteObserver);
  };
  
  this.fetchStocks = function fetchStocks() {
    // fake fetching the stocks
    var stocks = {
      aapl: 167.00,
      goog: 243.67,
      msft: 99.34
    };
    
    // notify our observers of the stock change
    subject.notify(stocks);
  };
  
}

// define a couple of different observers
var StockUpdaterComponent = {
  update: function() {
    console.log('"update" called on StockUpdater with: ', arguments);
  }
};
var StockChartsComponent = {
  update: function() {
    console.log('"update" called on StockCharts with: ', arguments);
  }
};

// Usage:

var stockApp = new StockGrabber();
stockApp.addObserver(StockUpdaterComponent);
stockApp.fetchStocks(); // console logs: "update" called on StockUpdater with...
stockApp.addObserver(StockChartsComponent);
stockApp.fetchStocks(); // console logs: "update" called on StockUpdater with... "update" called on StockCarts with...
stockApp.removeObserver(StockUpdaterComponent);
stockApp.fetchStocks(); // console logs: "update" called on StockCharts with...
stockApp.removeObserver(StockChartsComponent);
stockApp.fetchStocks(); // does nothing; no observers
```

### Mediator pattern
```javascript
var Mediator = (function(window, undefined) {
 
  function Mediator() {
    this._topics = {};
  }
 
  Mediator.prototype.subscribe = function mediatorSubscribe(topic, callback) {
    if (!this._topics.hasOwnProperty(topic)) {
      this._topics[topic] = [];
    }
 
    this._topics[topic].push(callback);
    return true;
  };
 
  Mediator.prototype.unsubscribe = function mediatorUnsubscrive(topic, callback) {
    if (!this._topics.hasOwnProperty(topic)) {
      return false;
    }
 
    for(var i = 0, len = this._topics[ topic ].length; i < len; i++) {
      if (this._topics[topic][i] === callback) {
        this._topics[topic].splice(i, 1);
        return true;
      }
    }
 
    return false;
  };
 
  Mediator.prototype.publish = function mediatorPublish() {
    var args = Array.prototype.slice.call(arguments);
    var topic = args.shift();
 
    if (!this._topics.hasOwnProperty(topic)) {
      return false;
    }
 
    for(var i = 0, len = this._topics[topic].length; i < len; i++) {
      this._topics[topic][i].apply(undefined, args);
    }
    return true;
  };
 
  return Mediator;
 
})(window);
 
// example subscriber function
var Subscriber = function ExampleSubscriber(myVariable) {
  console.log(myVariable);
};
 
// example usages
var myMediator = new Mediator();
myMediator.subscribe('some event', Subscriber);
myMediator.publish('some event', 'foo bar'); // console logs "foo bar"
```

### Prototype pattern
```javascript
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
```

### Command pattern
```javascript
var carManager = {

  // request information
  requestInfo: function(model, id) {
    return "The information for " + model + " with ID " + id + " is foobar";
  },

  // purchase the car
  buyVehicle: function(model, id) {
    return "You have successfully purchased Item " + id + ", a " + model;
  },

  // arrange a viewing
  arrangeViewing: function(model, id) {
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  }

};

carManager.execute = function ( name ) {
  return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};

// Usage:

carManager.execute("arrangeViewing", "Ferrari", "14523");
carManager.execute("requestInfo", "Ford Mondeo", "54323");
carManager.execute("requestInfo", "Ford Escort", "34232");
carManager.execute("buyVehicle", "Ford Escort", "34232");
```

### Facade pattern
```javascript
var module = (function() {
  var _private = {
    i: 5,
    get: function() {
      console.log("current value:" + this.i);
    },
    set: function(val) {
      this.i = val;
    },
    run: function() {
      console.log("running");
    },
    jump: function(){
      console.log("jumping");
    }
  };
  return {
    facade: function(args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  }
}());

// Usage:

module.facade({ run: true, val: 10 });
```

### Factory pattern
```javascript
function CarDoor(options) {
  this.color = options.color || 'red';
  this.side = options.side || 'right';
  this.hasPowerWindows = options.hasPowerWindows || true;
}
 
function CarSeat(options) {
  this.color = options.color || 'gray';
  this.material = options.material || 'leather';
  this.isReclinable = options.isReclinable || true;
}
 
function CarPartFactory() {}
CarPartFactory.prototype.createPart = function createCarPart(options) {
  var parentClass = null;
  
  if (options.partType === 'door') {
    parentClass = CarDoor;
  } else if (options.partType === 'seat') {
    parentClass = CarSeat;
  }
  
  if (parentClass === null) {
    return false;
  }
  
  return new parentClass( options );
}
 
// example usage
var myPartFactory = new CarPartFactory();
var seat = myPartFactory.createPart({
  partType: 'seat',
  material: 'leather',
  color: 'blue',
  isReclinable: false
});
 
// outputs: true
console.log(seat instanceof CarSeat);
 
// outputs a CarSeat object with material "leather", color "blue", isReclinable "false"
console.log(seat);
```

### Mixin pattern
```javascript
// Define a simple Car constructor
var Car = function(settings) {
  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";
};
 
// Mixin
var Mixin = function() {};
 
Mixin.prototype = {
 
  driveForward: function() {
    console.log("drive forward");
  },

  driveBackward: function() {
    console.log("drive backward");
  },

  driveSideways: function() {
    console.log("drive sideways");
  }
 
};
 
 
// Extend an existing object with a method from another
function augment(receivingClass, givingClass) {
 
  // only provide certain methods
  if (arguments[2]) {
    for(var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  // provide all methods
  else {
    for (var methodName in givingClass.prototype) {

      // check to make sure the receiving class doesn't
      // have a method of the same name as the one currently
      // being processed
      if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }

      // Alternatively (check prototype chain as well):
      // if (!receivingClass.prototype[methodName]) {
      //   receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      // }
    }
  }
}
 
 
// Augment the Car constructor to include "driveForward" and "driveBackward"
augment(Car, Mixin, "driveForward", "driveBackward");
 
// Create a new Car
var myCar = new Car({
  model: "Ford Escort",
  color: "blue"
});
 
// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();
 
// Outputs:
// drive forward
// drive backward
 
// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment(Car, Mixin);
 
var mySportsCar = new Car({
  model: "Porsche",
  color: "red"
});
 
mySportsCar.driveSideways();
 
// Outputs:
// drive sideways
```

### Decorator pattern
```javascript
// A vehicle constructor
function Vehicle(vehicleType) {
  // some sane defaults
  this.vehicleType = vehicleType || "car";
  this.model = "default";
  this.license = "00000-000";
}
 
// Test instance for a basic vehicle
var testInstance = new Vehicle("car");
console.log(testInstance);
 
// Outputs:
// vehicle: car, model:default, license: 00000-000
 
// Lets create a new instance of vehicle, to be decorated
var truck = new Vehicle("truck");
 
// New functionality we're decorating vehicle with
truck.setModel = function(modelName) {
  this.model = modelName;
};
 
truck.setColor = function(color) {
  this.color = color;
};
 
// Test the value setters and value assignment works correctly
truck.setModel("CAT");
truck.setColor("blue");
 
console.log(truck);
 
// Outputs:
// vehicle:truck, model:CAT, color: blue
 
// Demonstrate "vehicle" is still unaltered
var secondInstance = new Vehicle("car");
console.log(secondInstance);
 
// Outputs:
// vehicle: car, model:default, license: 00000-000
```

## Resources
- [Learning JavaScript Design Patterns (A book by Addy Osmani)](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [JavaScript Design Patterns](https://carldanley.com/javascript-design-patterns/)
- [http://www.dofactory.com/javascript/design-patterns](http://www.dofactory.com/javascript/design-patterns)

## License

MIT © [ButuzGOL](https://butuzgol.github.io)
