function changePage(element, effect, callback) {
	element
	.addClass(effect)
	.one("animationend webkitAnimationEnd", function() {
		callback && callback();
	})
}

var Christmas = function() {
	var $pageA = $('.page-a');
	var $pageB = $('.page-b');
	
	/*Test for the first scene */
	// new pageA($pageA, function() {
	// 	setTimeout(function() {
	// 		alert('pageA finished')
	// 	},20000)
	// })

	/* Test for the second scene */
	// new pageB($pageB, function() {
	// 	setTimeout(function() {
	// 		alert("pageB finished")
	// 	},20000)
	// })

	var observer = new Observer();
	new pageA($pageA, function() {
		observer.publish("completeA");
	});

	observer.subscribe("completeA", function() {
		changePage($pageA, "effect-out", function() {
			observer.publish("pageB");
		})
	})

	observer.subscribe("pageB", function() {
		new pageB($pageB, function() {
			observer.publish("completeB");
		})
	})

}


$(function() {
	$("button").click(function() {
		Christmas()
	})
})