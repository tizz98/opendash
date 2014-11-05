function copy() {
	$('#copy_link').modal('show');
}

function changeColor() {
	$('#color_pick').modal('show');
}

function saveColor() {
	data['fg'] = $('.color #fg').val();
	data['bg'] = $('.color #bg').val();
	sendData(data);
}

function resetColor() {
	$('body').css('background-color', data['bg']);
	$('body').css('color', data['fg']);
}

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