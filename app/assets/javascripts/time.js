/*
	updateClock(h)
	where h is 12 or 24, updates the 
	clock ever 1000ms with setTimeout.
*/

function updateClock(h) {
	// create a new date object
	// and time variables
	var now = new Date();
	var time, hours, min, sec;

	// set the hours, min, sec
	// to respective values
	hours = now.getHours();
	min   = now.getMinutes();
	sec   = now.getSeconds();

	// if the h is 12 then we clear the timeout for the timer
	// for some reason, it won't work w/o doing this
	// then we make it 12 hour time
	if (h == '12') {
		data['time'] = '12';
		clearTimeout(timer);
		if (hours > 12) {
			hours -= 12;
		}
	} else if (h == '24') {
		// the time is default 24 hour so we don't have
		// to change anything but just clear the timeout
		data['time'] = '24';
		clearTimeout(timer);
	}

	// make the time look nice so we don't have an single
	// digits, it always leads with a 0 if less than 10
	if (parseInt(hours) < 10) { hours = "0" + hours; }
	if (parseInt(min) < 10) { min = "0" + min; }
	if (parseInt(sec) < 10) { sec = "0" + sec; }

	// format the time as one string and put it in
	// the time innerHTML
	time = hours + " " + min + " " + sec;
	document.getElementById('time').innerHTML = time;

	// create a global timer variable and do some
	// seemingly "hacky" stuff to get it to work nicely
	timer = setTimeout(function (){
		updateClock(h);
	}, 1000);
}
updateClock();