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
	var $pageC = $('.page-c');
	
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

	//scene A
	var observer = new Observer();
	new pageA($pageA, function() {
		observer.publish("completeA");
	});
	//A->B
	observer.subscribe("completeA", function() {
		changePage($pageA, "effect-out", function() {
			observer.publish("pageB");
		})
	})
	// scene B
	observer.subscribe("pageB", function() {
		new pageB($pageB, function() {
			observer.publish("completeB");
		})
	})
	// B->C
	observer.subscribe("completeB", function() {
		changePage($pageC, "effect-in", function() {
			observer.publish("pageC");
		})
	})

	observer.subscribe("pageC", function() {
		new pageC();
	})

	// Test for the thrid scene
	// new pageC();

}


$(function() {
	$("button").click(function() {
		Christmas()
	})
})