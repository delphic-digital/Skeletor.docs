
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

var index,
		store,
    data = $.getJSON('/lunr.json');

var debounce = function (fn) {
	var timeout
	return function () {
		var args = Array.prototype.slice.call(arguments),
			ctx = this

		clearTimeout(timeout)
		timeout = setTimeout(function () {
			fn.apply(ctx, args)
		}, 100)
	}
}

function getSnippet(str, val){
	//var splitted = str.substr(0,str.indexOf(val));
	var first = str.substr(0,str.indexOf(val)).slice(-100);
	var second = str.substr(str.indexOf(val)+val.length, 100);
	/*var first = '...'+splitted[0].slice(20);
	var second = splitted[1]+'...';*/
	var snippet = '...'+first + '<span class="search-highlight">'+val+'</span>'+second;
	return snippet;
}


index = lunr(function () {
	this.field('title', { boost: 10 });
	this.field('body');
	this.ref('href');
});

data.then(function(items){
	store = items
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
	$('.search-results').show().empty();

	for (i in results){
		//console.log(results[i].content)

		$('.search-results').append('<div class="search-result"><a href="'+results[i].uri+'" class="search-result__title">'+results[i].title+'</a><div class="search-result__snippet">'+getSnippet(results[i].content, query)+'</div>')
	}

	/*results.length ?
		results.map(function(result){
			console.log(result)
			//console.log(store[result.ref])
		}) : console.log('nothing found')*/

});