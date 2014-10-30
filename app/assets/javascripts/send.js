function sendData(data) {
	var url = '/d/create';
	getModOrder();

	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
	});
}