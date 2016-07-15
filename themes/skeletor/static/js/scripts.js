
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

$('.js-toggle-sidebar').click(function(e){
	e.preventDefault();
	$('body').toggleClass('sidebar-toggle');
});

function highlight(content,what) {
	var pattern = new RegExp("(" + what + ")", "gim");
	    replaceWith = '<span class="search-highlight">$1</span>',
	    beginning = content.substr(0, content.search(pattern)+what.length).slice(-(50+what.length)),
	    end = content.substr(content.search(pattern)+what.length, (50-what.length));

	content = ((beginning[0].toUpperCase() == beginning[0])?beginning:'...'+beginning) + ((end.substring(end.length-1)) == "."?end:end+'...');

	var highlighted = content.replace(pattern,replaceWith);

	//console.log(content)

	return highlighted;
	}

var debounce = function (fn) {
	var timeout;
		return function () {
		var args = Array.prototype.slice.call(arguments),
			  ctx = this

		clearTimeout(timeout)
		timeout = setTimeout(function () {
			fn.apply(ctx, args)
		}, 100)
	}
}

var index,
		store,
    data = $.getJSON(window.baseurl+'/lunr.json');

function getSnippet(content, val){
	var highlighted =  highlight(content, val);
	return highlighted;
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


$('.search-input').on('keyup', debounce(function () {
	//if ($(this).val().length < 3) return;
	// Get query
	var query = $(this).val();
	if(query.length>2){
		var results = index.search(query)
		.filter(function(result){ //console.log(result)
			return result.score > .00005;
		})
		.map(function (result) {
			return store.filter(function (q) { return q.uri === result.ref })[0]
		})

		//console.log(results)
		var length = results.length;

		if(length==0){
			$('.search-results-title').html('No Search Results Found')
		}else{
			$('.search-results-title').html(length + ' Search Result')
		}

		if(length>1){
			$('.search-results-title').append('s');
		}



	}else{
		//$('.search-results-container').hide();
		//$('.search-results').empty();
	}


	if(!query || query=='' || query.length<3){
		$('.search-results-container').hide();
	}else{
		$('.search-results-container').show();
		$('.search-results').empty();

		for (i in results){
		//console.log(results[i].content)

		$('.search-results').append('<a href="'+window.baseurl+results[i].uri+'" class="search-result"><div  class="search-result__title">'+results[i].title+'</div><div class="search-result__snippet">'+getSnippet(results[i].content, query)+'</div></a>')

		if(i != results.length-1){
			$('.search-results').append('<hr>');
		}
	}
	}




	/*results.length ?
		results.map(function(result){
			console.log(result)
			//console.log(store[result.ref])
		}) : console.log('nothing found')*/

}));