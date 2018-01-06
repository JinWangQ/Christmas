function pageA(element) {
	this.$root = element;
	this.$boy = element.find(".chs-boy");
	this.run()
}

pageA.prototype.next = function(options) {
	var dfd = $.Deferred();
	this.$boy.transition(options.style,options.time,"linear",function() {dfd.resolve()});
	return dfd;
}

pageA.prototype.stopWalk = function() {
	this.$boy.removeClass("chs-boy-deer")
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
	}) 
}