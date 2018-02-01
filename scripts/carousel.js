var slice = Array.prototype.slice
/**
 * slice string into j, start from the second one, index[1]
 * @param {string} a [string to be sliced]
 * @param {number} i [start index]
 * @param {number} j [number of slices]
 * @return {string}
 */
function toArray(a, i, j) {
    return slice.call(a, i || 0, j || a.length);
}
/**
 * return true if type of v is not undefined
 * @param {Mixed}
 * @return {Boolean}
 */
function isDefined(v) {
    return typeof v !== 'undefined';
}

/**
 * 拷贝对象，跳过已存在的
 * @param  {[string]} o []
 * @param  {[string]} c []
 * @return {[string]}   [description]
 */
function applyIf(o, c) {
    if (o) {
        for (var p in c) {
            //ignore those existed
            if (!isDefined(o[p])) {
                o[p] = c[p];
            }
        }
    }
    return o;
}

applyIf(String, {format: function(format) {
        var args = toArray(arguments, 1);//get arguments after str
        return format.replace(/\{(\d+)\}/g, function(m, i) {// replace
            return args[i];
        });}
});

function Carousel(carousel, options) {
    var imgUrls = options.imgUrls;
    var $carousel = carousel;
    var $spinner = carousel.find("#spinner");
    var angle = 0;
    var numpics = imgUrls.length;
    var rotate = 360 / numpics;
    var start = 0;
    var current = 1;
    var $contentElements;

    this.numpics = numpics;

    /**
     * create string
     * @param  {[string]} imgUrl [description]
     * @return {[string]}        [description]
     */
    function createStr(imgUrl) {
        var str = '<figure style="width:{0}; transform:rotateY({1}deg) translateZ({2}) ;position:absolute;">' + '<img src="{3}" style="width:100%;height:100%;">' + '</figure>';

        return String.format(str,
            "2rem",
            start,
            "2.5rem",
            imgUrl
        )
    }

    /**
     * initial style
     * @return {[type]} [description]
     */
    function initStyle() {
        $carousel.css({
            "transform": "scale(0.3)",
            "-webkit-perspective": "500",
            "-moz-perspective": "500px",
            "position": "absolute",
            "left": "6.8rem",
            "top": "4.5rem"
        });
        $spinner.css({
            "width": "2rem",
            "transform-style": "preserve-3d",
            "transition": "1s"
        })
    }

    /**
     * create html marker
     * @return {[type]} [description]
     */
    function render() {
        var contentStr = '';
        $.each(imgUrls, function(index, url) { //create html marker for each urls
            contentStr += createStr(url);
            start = start + rotate;
        })
        $contentElements = $(contentStr);
        $spinner.append($contentElements)
    }

    initStyle();
    render();


    //spin times
    var currIndex;

    this.run = function(count, callback) {
        currIndex = count;
        //360
        //480
        //600
        angle = (count - 1) * rotate + 360
        $spinner
            .css("-moz-transform", "rotateY(-" + angle + "deg)")
            .css("transform", "rotateY(-" + angle + "deg)")
            .one("transitionend webkitTransitionend", function() {
               callback()
            })
    }
    this.reset = function() {
        var $img = $contentElements.find("img");
        $img.transition({"scale": 1}, 400, "linear");
        //$spinner.css("transform", "rotateY(0deg)")
    }
    this.destroy = function() {
        $spinner.remove();
    }

    this.selected = function(callback) {
        var $img = $contentElements.find("img");
        var count = $img.length;
        $img.transition({
            "scale": 1.5
        }, 1000, "linear", function() {
            if (count===1) {
                callback();
                return
            }
            count--;
        });
    }
}