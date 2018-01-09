function pageB(element, callback) {

	var $boy = element.find(".christmas-boy");
	var $girl = element.find(".girl");
	var $carousel =element.find("#carousel")
	var animationEnd = "animationend webkitAnimationEnd";

	var boyAction = {
		walk: function() {
			var dfd = $.Deferred();
			$boy.addClass('boy-walk');
			$boy.transition({
				"right": "4.5rem"
			}, 4000, "linear", function(){
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
			$girl.transition({
				"left":"4.5rem"
			}, 3000, "linear", function() {
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
			$girl.transition({
				"left": "7rem"
			}, 1000, "linear", function() {
				$girl.addClass("walk-stop").removeClass("girl-weep")
				callback();
			});
		},
		hug: function() {
			$girl.addClass("girl-hug").addClass("walk-run")
		},
		reset: function() {
			$girl.removeClass("girl-choose");
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
			return rotation3d();
		})
		.then(function() {

			girlAction.weepWalk(function() {
				girlAction.hug();
				boyAction.hug();
				(function() {
					callback && callback()
				}).defer(1000)
			})
		})

   function rotation3d() {
        var dfd = $.Deferred();
        setTimeout(function() {
        	createGift(dfd);
        },500)
        return dfd;
	}

    function createGift(dfd) {
        var carousel = createCarousel();
        var start = 1;
        var end = carousel.numpics;
        var play = function() {
            //get giftd
            carouselGift(start, carousel, function() {
                ++start;
                next();
            });
        };
        //check 
        var next = function() {
            //3 times
            if (start > end) {
                carousel.destroy();
                setTimeout(function() {
                	dfd.resolve();
                },1000)
                return
            }
            setTimeout(function() {
            	play();
            },1000)
        };
        play();
	}

    /**
     * get gift
     * 
     */
    function carouselGift(count, carousel, complete) {
        //run 3 times
        carousel.run(count);
        //choose action
        girlAction.choose(function() {
            //select pic
            carousel.selected(function() {
                //girl's action reset
                girlAction.reset();
                boyAction.strip(count);

                setTimeout(function() {
                    complete();
                }, 1000)
            });
        })
    }


    //创建3d旋转
    function createCarousel() {
        //3d旋转
        var carousel = new Carousel($carousel, {
            imgUrls: [
                "http://img.mukewang.com/5662e26f00010dea14410901.png",
                "http://img.mukewang.com/5662e2960001f16314410901.png",
                "http://img.mukewang.com/5662e29a0001905a14410901.png"
            ]
        });
        return carousel;
    }


	setTimeout(function() {
		callback();
	}, 18000)
}