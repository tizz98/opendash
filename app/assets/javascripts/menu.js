/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.getElementById( 'content' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();

function edit() {
	$('#edit').hide();
	$('#save').show();
	var objs = document.querySelectorAll('.column .portlet .row.mod')
	
	for (var i in objs) {
		$(objs[i]).addClass('portlet-content');
		$(objs[i]).addClass('editable');
	}
}

function save() {
	$('#edit').show();
	$('#save').hide();
	var objs = document.querySelectorAll('.column .portlet .row.mod')
	
	for (var i in objs) {
		$(objs[i]).removeClass('portlet-content');
		$(objs[i]).removeClass('editable');
	}

	sendData(data);
}

function es_init() {
	$('#edit').show();
	$('#save').hide();
	var objs = document.querySelectorAll('.column .portlet .row')
	
	for (var i in objs) {
		$(objs[i]).removeClass('portlet-content');
	}
}
es_init();