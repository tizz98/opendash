/*
	setTime(hours)
	where hours is either 12 or 24
	calls the updateClock function
	TODO: is this really necessary
	to have it call another func?
*/

function setTime(hours) {
	updateClock(hours);
}

/*
	changeStocks()
	shows the stocks modal that
	allows users to rearrange stocks
	and change them
*/

function changeStocks() {
	$('#stocks_modal').modal('show');
}

// make stocks edit icon do something when it is clicked
// this applies at page load
$(function() {

	$('.s_edit').click(function(event){
		// if the element has the fa-pencil class
		// this means that when the user clicks on it
		// it will allow them to edit it
		if ($(this).hasClass('fa-pencil')) {
			// remove the fa-pencil class and add the fa-save class
			$(this).removeClass('fa-pencil');
			$(this).addClass('fa-save');

			// gets the closest portlet then the first h3 child of it
			// i.e. the stock name and replaces the h3 with an input box
			// containing the stock name
			var elem = $(this).closest('.portlet').children('h3')[0];
			var text = elem.innerHTML;
			$(elem).replaceWith("<input type='edit' value='" + text + "'>");
		} else {
			// the element does not have the fa-pencil class so we presume
			// it has the fa-save class, indicating the user wishes to save
			// the stock they have entered in the input box

			// remove the fa-save class and add the fa-edit class
			$(this).removeClass('fa-save');
			$(this).addClass('fa-pencil');

			// gets the closest portlet then the first input child of it
			// i.e. the stock name and replaces the input box with an h3
			// containing the newly entered stock name
			var elem = $(this).closest('.portlet').children('input')[0];
			var text = $(elem).val();
			$(elem).replaceWith('<h3 class="portlet-content stock_name">' + text + '</h3>');
		}
	});

});

/*
	lockStocks()
	This function is used soley incase the user
	"accidently" leaves a stock input box blank which
	of course they would *never* do
*/

function lockStocks() {
	// we get all the elements associated with the s_edit classname
	// which are all of our stock elements
	var elems = document.getElementsByClassName('s_edit');

	// next we loop through each of the elements, presumeably four of them
	for (var i = 0; i < elems.length; i++) {

		// if the element has the class fa-pencil we will
		// presume that there is no input box and it is an h3 element
		// essentially the user has saved that stock
		if ($(elems[i]).hasClass('fa-pencil')) {
			// do nothing
			continue;
		} else {
			// otherwise lock what they have in there and save it
			$(elems[i]).removeClass('fa-save');
			$(elems[i]).addClass('fa-pencil');

			var elem = $(elems[i]).closest('.portlet').children('input')[0];
			var text = $(elem).val();

			// incase they leave the input box blank we get a random
			// stock from their previously saved stocks
			if (text == "" || text == null || text == undefined) {
				text = data['stocks'][getRandomInt(0,3)];
			}

			// lastly we replace the input element with our new h3 element which
			// allows the saveStocks function to go off without a hitch
			$(elem).replaceWith('<h3 class="portlet-content stock_name">' + text + '</h3>');
		}
	};
}

/*
	getRandomInt(min,max)
	returns an random integer where max and min are
	inclusive for the integer to be generated
*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
	saveStocks()
	First locks the stocks as described above then
	saves them to the global data
*/

function saveStocks() {
	lockStocks();

	// get all the h3 stock elements
	// and create an empty stocks array
	var elems = document.querySelectorAll('.column2 .portlet h3')
	var stocks = [];

	// loop through the elements and push
	// their innerHTML to the stocks array
	for (var i = 0; i < 4; i++) {
		stocks.push(elems[i].innerHTML);
	}

	// put the stocks array in the global data
	// used for storing the stocks
	// then send the data
	data['stocks'] = stocks;
	sendData(data);
}

/*
	resetStocks()
	returns the stocks to their original ones
	as saved in the global data, this doesn't 
	matter if the person is in the middle of editing them
	or not
*/

function resetStocks() {
	// get the global data stocks
	// get all the portlet stock elements
	var stocks = data['stocks'];
	var elems = document.querySelectorAll('.column2 .portlet');

	// loop through all the stock elements
	for (var i = 0; i < 4; i++) {
		// elem is the portlets first child, whether it's input or h3
		// then get the appropriate stock from the global data
		// and put the new h3 element in for the previous element
		var elem = elems[i].children[1];
		var text = data['stocks'][i];
		$(elem).replaceWith('<h3 class="portlet-content stock_name">' + text + '</h3>');
	};
}

/*
	getModOrder()
	Turned out to be waaay easier than first thought.
	Gets the order of the modules for the dashboard
*/

function getModOrder() {
	// gets all the elements associated with the modules
	// we want to get and create an empty array
	var elems = document.querySelectorAll('.column .portlet .mod');
	var modOrder = [];

	// loop through each of the lements pushing their
	// id into the modOrder array, we use the same module ids
	// in the rails backend to refer to these modules
	for (var i = 0; i < elems.length; i++) {
		modOrder.push(elems[i].id);
	};

	// set the global data with the new modOrder array
	data['modOrder'] = modOrder;
}