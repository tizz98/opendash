/*
	getWeather(location, units, initial)
	location is used for the location we want weather for
	units is either c or f, celcius or fahrenheit
	initial is used for if this function is being called
	for the first time on page load or a different time
	mainly we just don't want to change the global data for loc
	on page load
*/

function getWeather(location, units, initial) {
	// if the units are undefined or nothing or f then we
	// use fahrenheit
	if (units == undefined || units == '' || units == 'f') {
		// set the temp global data to f and create the url
		data['temp'] = 'f';
		var url = "http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='f'&format=json";
	} else if (units == 'c') {
		// if the units are c then we use celcius
		// set the global data for temp to c and create the url
		data['temp'] = 'c';
		var url = "http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'&format=json";
	} else {
		// if we get some really weird units passed into this function
		// we want to know...
		console.log('weird units passed into weather');
		console.log(typeof(units) + "...units is " + units);
	}

	// so we use getJSON from jQuery to request the url
	// based on the units and location we want then we use
	// my_data because we don't want to screw with the gloal data
	$.getJSON( url, function( my_data ) {
		// create an object so it's cleaner to work
		// with the results
		var obj = my_data.query.results;

		// if the object is null (essentially the results)
		// then we're going to show an error div, otherwise
		// we're good to go, show the ok div and hide the error div
		// incase there was an error before but we corrected it now
		if (obj == null) {
			$("#g_weather").hide();
			$('#b_weather').show();
			return;
		} else {
			$("#g_weather").show();
			$("#b_weather").hide();
		}

		// create a forecast variable so we aren't
		// chaining too many things
		var forecast = obj.channel.item.forecast;

		// keep the getWeather function reusable
		// this is also so that we're storing a nice location
		// because the user can enter just about anything and yahoo
		// will give us an actual location so we want that location
		// and not what the user input
		if (!initial) {
			location = obj.channel.location.city;

			if (obj.channel.location.region != "") {
				location += ", " + obj.channel.location.region;
			}

			location += ", " + obj.channel.location.country;

			data['loc'] = location;
		}

		// now we loop through the forecasts for
		// today, tomorrow and the day after tomorrow
		// TODO: rewrite a reusable function so that
		// we don't have 3 different ones that essentially
		// do the same thing
		for (var i = 0; i <= 2; i++) {
			if (i === 0) {
				// get the high, low, code and condition
				// send that info into setToday
				var high = forecast[0].high;
				var low  = forecast[0].low;
				var code = forecast[0].code;
				var cond = forecast[0].text;
				setToday(high, low, cond, code);
			} else if (i === 1) {
				// get the high, low, code and condition
				// send that info into setTmw
				var high = forecast[1].high;
				var low  = forecast[1].low;
				var code = forecast[1].code;
				var cond = forecast[1].text;
				setTmw(high, low, cond, code);
			} else if (i === 2) {
				// get the high, low, code and condition
				// send that info into setDat
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

/*
	getWWL(units,send,loc,initial)
	units is either c or f
	send is true or false, whether to send the data or not
	loc is the location we want
	initial is used to see if the is the onpageload call
	of this function

	Warning: This function is very convoluted and honestly I'm
	having a hard time remembering how it actually works...
*/

function getWWL(units,send,loc,initial) {
	// We want to send the data
	if (send == true) {
		// if the location is automatic
		if (loc == 'auto') {
			// we use jQuery to request some info from an api
			// to get the users location
			$.get("http://ipinfo.io", function(response) {
				// format the location then send it into the getWeather function
			    var location = response.city + ", " + response.region;
			    getWeather(location,units,initial);
			}, "jsonp")
			.done(function(){
				// after that's all done we send the global data
				sendData(data);
			});
		} else {
			// if the location is NOT automatic

			// we create a function variable for the sendData function
			var sendTheData = function() {
					var url = '/d/create';
					getModOrder();
					
					$.ajax({
					  type: "POST",
					  url: url,
					  data: data,
					});
			}

			// we create a function variable for the getWeather function
			// but we've added some goodies to check when it's actually done
			// running, using jQuery's Deferred
			var getTheWeather = function () {
				// we use r as the Deferred variable, the rest of the function unless
				// commented otherwise is the same as the above getWeather function...
				var r = $.Deferred();

				var location = loc;

				if (units == undefined || units == '' || units == 'f') {
					data['temp'] = 'f';
					var url = "http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='f'&format=json";
				} else if (units == 'c') {
					data['temp'] = 'c';
					var url = "http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid in (select woeid from geo.places(1) where text='" + location + "') and u='c'&format=json";
				} else {
					console.log('weird units passed into weather');
					console.log(typeof(units) + "...units is " + units);
				}

				$.getJSON( url, function( my_data ) {
					var obj = my_data.query.results;

					if (obj == null) {
						$("#g_weather").hide();
						$('#b_weather').show();
						return;
					} else {
						$("#g_weather").show();
						$("#b_weather").hide();
					}

					var forecast = obj.channel.item.forecast;

					// keep the getWeather function reusable
					if (!initial) {
						location = obj.channel.location.city;

						if (obj.channel.location.region != "") {
							location += ", " + obj.channel.location.region;
						} else {
							location += ", " + obj.channel.location.country;
						}

						data['loc'] = location;
					}

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
				}).done(function(){
					// when the getJSON is done, we resolve r
					r.resolve();
				});
				// then after that we return r to indicate 
				// getTheWeather is finished running
				return r;
			} // end of getTheWeather

			// we call getTheWeather and when it's done
			// we call sendTheData... if it's called before
			// getTheWeather is done, because this is all async
			// it messes stuff up like you wouldn't believe...
			getTheWeather().done(sendTheData);
		}
	} else {
		// we're not sending the data
		if (loc == 'auto') {
			// if the location is auto we get it from the api
			// the get the weather
			$.get("http://ipinfo.io", function(response) {
			    var location = response.city + ", " + response.region;
			    getWeather(location,units,initial);
			}, "jsonp");
		} else {
			// otherwise we just get the weather
			getWeather(loc,units,initial)
		}
	}

}

/*
	setToday(high,low,cond,code)
	high is the high for the day
	low is the low for the day
	cond is the short description for the condition
	code is the code that yahoo uses to describe the condition
	we use this code to set the icons for the weather
*/

function setToday (high, low, cond, code) {
	// create variables of all the objects for high, low, icon & cond
	var my_high = document.querySelector("#today .high");
	var my_low  = document.querySelector('#today .low');
	var my_icon = document.querySelector('#today .icon');
	var my_cond = document.querySelector('#today .cond');

	// create the icon variable that uses the WeatherIcon function
	// to set the correct icon per the weather code
	var icon = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	// set the innerHTML for the high, low, icon & condition
	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
}

/*
	setTmw(high,low,cond,code)
	high is the high for the day
	low is the low for the day
	cond is the short description for the condition
	code is the code that yahoo uses to describe the condition
	we use this code to set the icons for the weather
*/

function setTmw(high, low, cond, code) {
	// create variables of all the objects for high, low, icon & cond
	var my_high = document.querySelector("#tmw .high");
	var my_low  = document.querySelector('#tmw .low');
	var my_icon = document.querySelector('#tmw .icon');
	var my_cond = document.querySelector('#tmw .cond');

	// create the icon variable that uses the WeatherIcon function
	// to set the correct icon per the weather code
	var icon    = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	// set the innerHTML for the high, low, icon & condition
	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
}

/*
	setDat(high,low,cond,code)
	high is the high for the day
	low is the low for the day
	cond is the short description for the condition
	code is the code that yahoo uses to describe the condition
	we use this code to set the icons for the weather
*/

function setDat(high, low, cond, code, day) {
	// create variables of all the objects for high, low, icon & cond
	var my_high = document.querySelector("#dat .high");
	var my_low  = document.querySelector('#dat .low');
	var my_icon = document.querySelector('#dat .icon');
	var my_cond = document.querySelector('#dat .cond');

	// use the name of the day instead of something longer like
	// "Day After Tomorrow"
	var my_day  = document.getElementById('dat_name');

	// create the icon variable that uses the WeatherIcon function
	// to set the correct icon per the weather code
	var icon    = '<i class ="wi ' + weatherIcon(code) + '"></i>';

	// set the innerHTML for the high, low, icon & condition
	my_high.innerHTML = high;
	my_low.innerHTML  = low;
	my_icon.innerHTML = icon;
	my_cond.innerHTML = cond;
	my_day.innerHTML  = day;
}


// show the weather modal to allow them to change
// their location or set it back to auto
function changeWeather() {
	$('#weather_modal').modal('show');
}


/*
	editWeather(auto)
	auto is used if we want to set 
	the global data for loc to auto, we don't 
	need to do any error checking in for this
*/

function editWeather(auto) {
	// if auto == true
	if (auto) {
		// get rid of the error div
		$('#error').css('display', 'none');

		// check to see if the global data is already
		// auto because we don't want to create a new
		// dashboard if it's the same
		if (data['loc'] != 'auto') {
			// create setData var function because of
			// async shenanigans...
			var setData = function() {
				// use r as the Deferred
				var r = $.Deferred();

				// set the global data for loc to auto
				data['loc'] = 'auto';

				// resolve and return r
				// to indicate we're done here
				r.resolve();
				return r;
			}

			// create a sendTheData var function
			// for same async shenanigan reasons
			var sendTheData = function() {
				var url = '/d/create';
				getModOrder();

				$.ajax({
				  type: "POST",
				  url: url,
				  data: data,
				});
			}

			// when setData is done we send it
			setData().done(sendTheData);
		}

		// lastly we hide the weather modal
		// we manually do this because if there's an error we don't
		// want the modal to go away
		$('#weather_modal').modal('hide');
	} else {
		// otherwise if auto == false
		// we set loc to the value of the weather
		// input box
		var loc = $('#w_sb').val();

		// error checking the loc variable
		if (loc == '' || loc == null || loc == undefined) {
			// display the error div
			$('#error').css('display', 'block');
		} else {
			// hide the error div incase the user
			// fixed a previous error
			$('#error').css('display', 'none');

			// get the weather with the new location
			// getWWL(units,send,loc,initial)
			getWWL(data['temp'],true,loc,false);

			// lastly hide the weather modal manually
			$('#weather_modal').modal('hide');
		}
	}
}