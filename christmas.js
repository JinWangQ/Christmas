function changePage(element, effect, callback) {
	element
		.addClass(effect)
		.one("animationend webkitAnimationEnd", function() {
			callback && callback();
		})
}

function Hmlt5Audio(url, loop) {
	var audio = new Audio(url);
	audio.autoplay = true;
	audio.loop = loop || false;
	audio.play();
	return {
		end: function(callback) {
			audio.addEventListener('ended', function() {
				callback()
			}, false);
		}
	}
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
	var container = $(".container");
	container.css(config.layer);

	var audio1 = Hmlt5Audio('scene.mov')
	audio1.end(function() {
		Hmlt5Audio('circulation.mp3', true)
	})
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
	//new pageC();
}

$(function() {
	Christmas()
})