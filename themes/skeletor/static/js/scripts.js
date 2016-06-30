
hljs.initHighlightingOnLoad();

//sidebar dropdown menu
$('#sidebar .sub-menu > a').click(function () {
	// Close previous open submenu
	var last = $('.sub.open', $('#sidebar'));
	$(last).slideUp(200);
	$(last).removeClass("open");
	$(last).parent().removeClass("open");

	// Toggle current submenu
	var sub = $(this).next();
	var parent = $(this).parent();
	if (sub.is(":visible")) {
		parent.removeClass("open")
		sub.slideUp(200);
		$(sub).removeClass("open")
	} else {
		parent.addClass("open")
		sub.slideDown(200);
		$(sub).addClass("open")
	}
});

$('.js-toggle-search').click(function(e){
	e.preventDefault();
	$('.search-form').fadeToggle(150);
	$('.search-input').focus();
	$('.search-results-container').hide();
})

var index,
		store,
    data = $.getJSON('/lunr.json');

function getSnippet(str, val){
	var first = str.substr(0,str.indexOf(val)).slice(-100);
	var second = str.substr(str.indexOf(val)+val.length, 100);
	var snippet = '...'+first + '<span class="search-highlight">'+val+'</span>'+second;
	return snippet;
}


index = lunr(function () {
	this.field('title', { boost: 10 });
	this.field('body');
	this.ref('href');
});

data.then(function(items){
	store = items;
	for (item in items) {
		var doc = {
			'title': items[item].title,
			'body': items[item].content,
			'href': items[item].uri
		};
		index.add(doc);
	}
});





$('.search-input').on('keyup', function () {
	// Get query
	var query = $(this).val();
	var results = index.search(query).map(function (result) {
		return store.filter(function (q) { return q.uri === result.ref })[0]
	})

	//console.log(results)
	if(!query || query==''){
		$('.search-results-container').hide();
	}else{
		$('.search-results-container').show();
		$('.search-results').empty();
	}
	var length = results.length;

	if(length==0){
		$('.search-results-title').html('No Search Results Found')
	}else{
		$('.search-results-title').html(length + ' Search Result')
	}

	if(length>1){
		$('.search-results-title').append('s');
	}




	for (i in results){
		//console.log(results[i].content)

		$('.search-results').append('<a href="'+results[i].uri+'" class="search-result"><div  class="search-result__title">'+results[i].title+'</div><div class="search-result__snippet">'+getSnippet(results[i].content, query)+'</div></a>')

		if(i != results.length-1){
			$('.search-results').append('<hr>');
		}
	}

	/*results.length ?
		results.map(function(result){
			console.log(result)
			//console.log(store[result.ref])
		}) : console.log('nothing found')*/

});