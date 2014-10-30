function getNews() {
	$.get('http://content.guardianapis.com/search?api-key=626v3ysvkd46htvw9rj5sm4p&show-fields=shortUrl,headline,standfirst&order-by=newest&section=world', function ( data ){
		var results = data.response.results;
		var my_news = document.getElementById('news');
		var news = "";

		for (var i = 0; i <= 2; i++){
			news += '<div class="story"><h4><a href="' + results[i].fields.shortUrl + '" target=blank>' + results[i].fields.headline + '</a></h4>';
			if (results[i].fields.standfirst != null || results[i].fields.standfirst != undefined) {
				news += results[i].fields.standfirst;
			} 

			news += '</div><br>';
		}

		my_news.innerHTML = news;
	});
}
getNews();