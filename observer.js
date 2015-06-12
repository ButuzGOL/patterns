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
