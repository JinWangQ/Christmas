function pageB(element, callback) {

	var $boy = element.find(".christmas-boy");
	var $girl = element.find(".girl");
	var animationEnd = "animationend webkitAnimationEnd";
	var boyAction = {
		walk: function() {
			var dfd = $.Deferred();
			$boy.addClass('boy-walk');
			$boy.transition({"right": "4.5rem"}, 4000, "linear", function(){
				dfd.resolve()
			});
			return dfd;
		},
		stopWalk: function() {
			$boy.removeClass("boy-walk");
			$boy.addClass("boy-stand");
		},
		runWalk: function() {
            $boy.addClass("walk-run");
        },
		unwrapp: function() {
			var dfd = $.Deferred();
			$boy.addClass("boy-unwrapp");
			$boy.removeClass("boy-stand");
			$boy.one(animationEnd, function() {
				dfd.resolve();
			})
			return dfd;
		},
		strip: function(count) {
			$boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
		},
		hug: function() {
			$boy.addClass("boy-hug").one(animationEnd, function() {
				$(".christmas-boy-head").show()
			})
		}
	}

	var girlAction = {
		standUp: function() {
			var dfd = $.Deferred();
			setTimeout(function() {
				$girl.addClass("girl-standUp");
			}, 200)

			setTimeout(function() {
				$girl.addClass("girl-throwBook");
				dfd.resolve();
			}, 500)

			return dfd;
		},
		walk: function() {
			var dfd = $.Deferred();
			$girl.addClass("girl-walk");
			$girl.transition({"left":"4.5rem"}, 4000, "linear", function() {
				dfd.resolve()
			});
			return dfd;
		},
		stopWalk: function() {
			$girl.addClass("walk-stop")
				.removeClass("girl-standUp")
				.removeClass("girl-walk")
				.removeClass("girl-throwBook")
				.addClass("girl-stand")
		},
		choose: function(callback) {
			$girl.addClass("girl-choose").removeClass("walk-stop");
			$girl.one(animationEnd, function() {
				callback();
			})
		},
		weepWalk: function(callback) {
			$girl.addClass("girl-weep");
			$girl.transition({"left": "7rem"}, 1000, "linear", function() {
				$girl.addClass("walk-stop").removeClass("girl-weep")
				callback();
			});
		},
		hug: function() {
			$girl.addClass("girl-hug").addClass("walk-run")
		}
	}

	boyAction.walk()
		.then(function() {

			boyAction.stopWalk();
		})
		.then(function() {
			girlAction.standUp();
		})
		.then(function() {
			return girlAction.walk();
		})
		.then(function() {
			return girlAction.stopWalk();
		})
		.then(function() {

			return boyAction.unwrapp();
		})
		.then(function() {

			setTimeout(function() {
				boyAction.strip(1)
			}, 1000)
			setTimeout(function() {
				boyAction.strip(2) 
			}, 2000)
			setTimeout(function() {
				boyAction.strip(3)
			}, 3000)

			setTimeout(function() {
				boyAction.hug();
			}, 4000)
		})
		.then(function() {
			girlAction.choose(function() {
				girlAction.weepWalk(function() {
					girlAction.hug();
				})
			})
		})


	setTimeout(function() {
		callback();
	}, 18000)
}