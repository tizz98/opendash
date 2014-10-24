function sendData(data) {
	var url = '/d/create';
	getModOrder();

	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
	});
}

function changeLinks(url) {
	var menu_url = document.getElementById('menu_url');
	var modal_url = document.getElementById('modal_url');

	menu_url.innerHTML = url;

	modal_url.innerHTML = '<a href="/d/' + url + '">Copy me</a>';
}