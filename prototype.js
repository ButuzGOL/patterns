var vehicle = {
  getModel: function() {
    console.log("The model of this vehicle is.." + this.model);
  }
};
 
var car = Object.create(vehicle, {
  "id": {
    value: 1,
    // writable:false, configurable:false by default
    enumerable: true
  },
 
  "model": {
    value: "Ford",
    enumerable: true
  }
 
});
