function updateClock(h) {
	var now = new Date();
	var time, hours, min, sec;

	hours = now.getHours();
	min   = now.getMinutes();
	sec   = now.getSeconds();

	if (h == '12') {
		data['time'] = '12';
		clearTimeout(timer);
		if (hours > 12) {
			hours -= 12;
		}
	} else if (h == '24') {
		data['time'] = '24';
		clearTimeout(timer);
	}

	if (parseInt(hours) < 10) { hours = "0" + hours; }
	if (parseInt(min) < 10) { min = "0" + min; }
	if (parseInt(sec) < 10) { sec = "0" + sec; }

	time = hours + " " + min + " " + sec;

	document.getElementById('time').innerHTML = time;

	timer = setTimeout(function (){
		updateClock(h);
	}, 1000);
}
updateClock();