/*
	sendData(data)
	sends the global data to the 
	create url to create a new dashboard with
	the data
*/

function sendData(data) {
	// set the url and get the
	// modules order incase they have changed
	var url = '/d/create';
	getModOrder();

	// send a post request to our rails application
	// with the global data
	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
	});
}