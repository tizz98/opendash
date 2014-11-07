/*
	getNews()
	Uses the guardian news api to 
	get the most recent news stories
*/

function getNews() {
	// Using jQuery's get function to get the latest world news and return the following fields
	// shortUrl => ex: http://gu.com/p/4366b
	// headline => ex: Ghosts overrun London
	// standfirst => ex: Lorem ipsum lorem ipsum lorem ipsum......
	$.get('http://content.guardianapis.com/search?api-key=626v3ysvkd46htvw9rj5sm4p&show-fields=shortUrl,headline,standfirst&order-by=newest&section=world', function ( data ){
		// create a results variable for simpler access to the info
		// get the new element and create an empty variable
		// to store the new html
		var results = data.response.results;
		var my_news = document.getElementById('news');
		var news = "";

		// loop through all the news stories but only get the first 3
		for (var i = 0; i <= 2; i++){
			// generate the headline that links to the story
			// using it's given shortUrl
			news += '<div class="story"><h4><a href="' + results[i].fields.shortUrl + '" target=blank>' + results[i].fields.headline + '</a></h4>';
			
			// check to see if the story has a standfirst (body text)
			// if it does we append it to the news variable, we don't have
			// to format it's html because thats what it's already formatted as
			if (results[i].fields.standfirst != null || results[i].fields.standfirst != undefined) {
				news += results[i].fields.standfirst;
			} 

			// finishing touches for the story's html
			news += '</div><br>';
		}

		// set the news div innerHTML to our
		// newly generated news html
		my_news.innerHTML = news;
	});
}
getNews();