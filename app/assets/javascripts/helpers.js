/*
	copy()
	Shows the copy link modal
*/

function copy() {
	$('#copy_link').modal('show');
}

/*
	changeColor()
	Shows the modal for changing the bg
	and text colors
*/

function changeColor() {
	$('#color_pick').modal('show');
}

/*
	saveColor()
	Gets the values in the color picker
	fields and saves in the global data
*/

function saveColor() {
	data['fg'] = $('.color #fg').val();
	data['bg'] = $('.color #bg').val();
	sendData(data);
}

/*
	resetColor()
	Intended to be used where the bg and fg
	colors change as the user changes them and when
	they click discard changes, it will return them
	to their original colors as set in the global data
*/

function resetColor() {
	$('body').css('background-color', data['bg']);
	$('body').css('color', data['fg']);
}

/*
	On page load, create colorpickers for both
	the background and foreground (text color)
	divs
*/

$(function() {
	$('#color_bg').colorpicker({
		format: 'hex',
		color: '#' + data['bg'],
	});

	$('#color_fg').colorpicker({
		format: 'hex',
		color: '#' + data['fg'],
	});
});