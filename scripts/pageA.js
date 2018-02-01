function pageA(element, callback) {
	this.$root = element;
	this.$boy = element.find(".chs-boy");
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
	this.run();
	setTimeout(function() {
		callback();
	}, 20000);
}

pageA.prototype.next = function(options) {
	var dfd = $.Deferred();
	this.$boy.transition(options.style,options.time,"linear",function() {dfd.resolve()});
	return dfd;
}

pageA.prototype.stopWalk = function() {
	this.$boy.removeClass("chs-boy-deer")
}

pageA.prototype.openWindow = function(callback) {
	var count = 1;
	var complete = function() {
		++count
		if (count===2) {
			callback && callback();
		}
	}
	var bind = function(data) {
		data.one("transitioned webkittransitionEnd", function(event) {
			data.removeClass("window-transition")
			complete()
		})
	}
	bind(this.$leftWin.addClass("window-transition").addClass("hover"))
	bind(this.$rightWin.addClass("window-transition").addClass("hover"))
}

pageA.prototype.run = function(callback) {
	var that = this;
	var next = function() {
		return this.next.apply(this,arguments)
	}.bind(this)

	next({
		"time": "10000",
		"style": {
			"top": "4rem",
			"right": "16rem",
			"scale": "1.2"
		}
	})
	.then(function() {
		return next({
			"time": "500",
			"style": {
				"rotateY": "-180",
				"scale": "1.5"
			}
		})
	})
	.then(function() {
		return next({
			"time": "7000",
			"style": {
				"top": "7.8rem",
				"right": "1.2rem"
			}
		})
	})
	.then(function() {
		that.stopWalk();
		that.openWindow(function() {
			alert("window opened")
		})
	}) 
}