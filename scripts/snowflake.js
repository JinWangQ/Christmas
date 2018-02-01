(function() {
//IIFE
    function Snowflake(elementName) 
     {

        var snowElement = document.getElementById(elementName)
        var canvasContext = snowElement.getContext("2d");

        var width = config.layer.width;
        var height = config.layer.height;

        //canvas size
        snowElement.width = width;
        snowElement.height = height;

        //# of snow
        var snowNumber = 80;

        //snow objs
        var snowArrObjs = initSnow(snowNumber, width, height);
        var snowArrNum = snowArrObjs.length;
        
        var render = function() {
            //clear rect
            canvasContext.clearRect(0, 0, width, height);
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].render(canvasContext);
            }
        }

        var update = function() {
            for (var i = 0; i < snowArrNum; ++i) {
                snowArrObjs[i].update();
            }
        }

        var renderAndUpdate = function() {
            render();
            update();
            requestAnimationFrame(renderAndUpdate);
        }

        renderAndUpdate();
    }

    function initSnow(snowNumber, width, height) {
        //snow options
        var options = {
            //radius
            minRadius: 3,
            maxRadius: 10,
            // range
            maxX: width,
            maxY: height,
            //speed
            minSpeedY: 0.05,
            maxSpeedY: 2,
            speedX: 0.05,
            //filter
            minAlpha: 0.5,
            maxAlpha: 1.0,
            minMoveX: 4,
            maxMoveX: 18
        }
        var snowArr = [];
        for (var i = 0; i < snowNumber; ++i) {
            snowArr[i] = new Snow(options);
        }
        return snowArr;
    }

    function Snow(snowSettings) {
        this.snowSettings = snowSettings;
        this.radius = randomInRange(snowSettings.minRadius, snowSettings.maxRadius);
        //initial position
        this.initialX = Math.random() * snowSettings.maxX;
        this.y = -(Math.random() * 500);
        //speed
        this.speedY = randomInRange(snowSettings.minSpeedY, snowSettings.maxSpeedY);
        this.speedX = snowSettings.speedX;
        //filter
        this.alpha = randomInRange(snowSettings.minAlpha, snowSettings.maxAlpha);
        //angle default 360
        this.angle = Math.random(Math.PI * 2);
        //distance
        this.x = this.initialX + Math.sin(this.angle);
        //x distance
        this.moveX = randomInRange(snowSettings.minMoveX, snowSettings.maxMoveX);
    }

    Snow.prototype.render = function(canvasContext) {
        canvasContext.beginPath();
        canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvasContext.closePath();
        canvasContext.fill();
    }

    Snow.prototype.update = function() {
        this.y += this.speedY;
        if (this.y > this.snowSettings.maxY) {
            this.y -= this.snowSettings.maxY;
        }
        this.angle += this.speedX;
        if (this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
        this.x = this.initialX + this.moveX * Math.sin(this.angle);
    }

    function randomInRange(min, max) {
        var random = Math.random() * (max - min) + min;
        return random;
    }

    window.Snowflake = Snowflake;

})();

