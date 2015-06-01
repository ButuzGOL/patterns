var basketModule = (function() {
  var basket = [];
    return {
        addItem: function(values) {
            basket.push(values);
        },
        getItemCount: function() {
            return basket.length;
        },
        getTotal: function() {
           var q = this.getItemCount(),p=0;
            while(q--){
                p+= basket[q].price; 
            }
            return p;
        }
    }
}());
