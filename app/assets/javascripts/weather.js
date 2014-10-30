function getWeather(location, units) {
	if (location == undefined) {
		var location = document.getElementById("loc2").value;
	}

	if (units == undefined || units == '' || units == 'f') {
		data['temp'] = 'f';
		var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='f'&format=json";
	} else if (units == 'c') {
		data['temp'] = 'c';
		var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'&format=json";
	} else {
		console.log('weird units passed into weather');
		console.log(typeof(units) + "...units is" + units);
	}

	$.getJSON( url, function( data ) {
		var obj = data.query.results;
		var forecast = obj.channel.item.forecast;

		for (var i = 0; i <= 2; i++) {
			if (i === 0) {
				var high = forecast[0].high;
				var low  = forecast[0].low;
				var code = forecast[0].code;
				var cond = forecast[0].text;
				setToday(high, low, cond, code);
			} else if (i === 1) {
				var high = forecast[1].high;
				var low  = forecast[1].low;
				var code = forecast[1].code;
				var cond = forecast[1].text;
				setTmw(high, low, cond, code);
			} else if (i === 2) {
				var high = forecast[2].high;
				var low  = forecast[2].low;
				var code = forecast[2].code;
				var cond = forecast[2].text;
				var day  = forecast[2].day;
				setDat(high, low, cond, code, day);
			}
		};

	});
}

function getWWL(units,send) {
	if (send == true) {
		$.get("http://ipinfo.io", function(response) {
		    var location = response.city + ", " + response.region;
		    getWeather(location, units);
		}, "jsonp")
		.done(function(){
			sendData(data);
		});
	} else {
		$.get("http://ipinfo.io", function(response) {
		    var location = response.city + ", " + response.region;
		    getWeather(location, units);
		}, "jsonp");
	}

}

function setToday (high, low, cond, code) {
	var my_high = document.querySelector("#today .high");
	var my_low  = document.querySelector('#today .low');
	var my_icon = document.querySelector('#today .icon');
	var my_cond = document.querySelector('#today .cond');
	var icon    = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
}

function setTmw(high, low, cond, code) {
	var my_high = document.querySelector("#tmw .high");
	var my_low  = document.querySelector('#tmw .low');
	var my_icon = document.querySelector('#tmw .icon');
	var my_cond = document.querySelector('#tmw .cond');
	var icon    = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
}

function setDat(high, low, cond, code, day) {
	var my_high = document.querySelector("#dat .high");
	var my_low  = document.querySelector('#dat .low');
	var my_icon = document.querySelector('#dat .icon');
	var my_cond = document.querySelector('#dat .cond');
	var my_day  = document.getElementById('dat_name');
	var icon    = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
	my_day.innerHTML  = day;
}