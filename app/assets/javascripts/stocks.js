 /*
	$('#sb').each(function(){ ... })
	~ detects when the value inside the search bar
	~ changes and then does a function
*/
 $('#sb').each(function() {
   var elem = $(this);
   var results_div = document.getElementById('stock_results');

   // Save current value of element
   elem.data('oldVal', elem.val());

   // Look for changes in the value
   elem.bind("propertychange keyup input paste", function(event){
      // If value has changed...
      if (elem.data('oldVal') != elem.val()) {
       // Updated stored value
       elem.data('oldVal', elem.val());       
       
	    	
	    	$.getJSON("/stocks.json", {
  				q: elem.val(),
  			}, function(data) {
          results_div.innerHTML = "";
  				for (var i = data.length - 1; i >= 0; i--) {
            var string = data[i].Symbol + " (" + data[i].Name + " - " + data[i].Exchange + ")";
            var node = document.createElement("P");
            var textnode = document.createTextNode(string);
            node.appendChild(textnode);
            results_div.appendChild(node);
          }; // end for loop
  			}); // end function with data

     }
   });
 });