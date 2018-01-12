function pageC() {

    this.$window   = $(".page-c .window");
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    this.$sceneBg  = this.$window.find(".window-scene-bg");
    this.$closeBg  = this.$window.find(".window-close-bg");

    // bg changing, the shadow of the couple 
    this.$sceneBg.transition({
        opacity: 0,
    }, 3000);
    this.$closeBg.css("transform", "translateZ(0)")
    this.$closeBg.transition({
        opacity: 1
    }, 5000);

    this.closeWindow(function() {
        Snowflake("snowflake");
    });
}

pageC.prototype.closeWindow = function(callback) {
     var count=1;
    var complete=function(){
        ++count;
        if(count==2){
            callback && callback();
        }
    }
    var bind=function(element){
        //close window: rotateY(0)
        element.addClass("close").one("animationend webkitAnimationEnd",function(event){
        complete()    
        })
    }
    bind(this.$leftWin)
    bind(this.$rightWin)
}