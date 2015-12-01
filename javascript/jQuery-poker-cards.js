(function ($) {

    function PokerCard (element) {
      this.element = $(element);
      this.status = "front";
      this.initialWidth = 200;
      this.lastWidth = 200;
      this.initialFontSize = parseInt(this.element.css("font-size"));
      this.initialBorderRadius = parseInt(this.element.css("border-radius"));
      console.log(this.element.css('box-shadow'));
      this.initialBoxShadow = parseInt(this.element.css('box-shadow').split(" ")[6]);
    }


    PokerCard.prototype.flip = function(){
      $this = this.element;
      if(this.status === "front"){
        $this.find(".poker-inside").css("visibility","hidden");
        this.status = "back";
      }else{
        $this.find(".poker-inside").css("visibility","initial");
        this.status = "front";
      }
    };

    PokerCard.prototype.resize = function(){

      var that = this;
      var initialWidth = this.initialWidth;
      var lastWidth = this.lastWidth;
      var currentWidth = this.element.width();
      var currentRatio = (currentWidth / initialWidth).toFixed(3);
      var newFontSize = this.initialFontSize * currentRatio;
      var newBorderRadius = this.initialBorderRadius * currentRatio;
      var newBoxShadow = this.initialBoxShadow * currentRatio;
      console.log("initialBoxShadow "+this.initialBoxShadow);
      console.log("new box shadow "+newBoxShadow);

      if (currentWidth > lastWidth){
        changeSize(this, "font-size", "floor", newFontSize, 1);
        changeSize(this, "border-radius", "floor", newBorderRadius, 1);
        setBoxShadow(this, "floor", newBoxShadow, 1);
        this.lastWidth = currentWidth;
      }else if(currentWidth < lastWidth){
        changeSize(this, "font-size", "ceil", newFontSize, 1);
        changeSize(this, "border-radius", "ceil", newBorderRadius, 1);
        setBoxShadow(this, "ceil", newBoxShadow, 1);
        this.lastWidth = currentWidth;
      }

      function changeSize(thisObject, property, method, newSize, min){
        var currentSize = parseInt(thisObject.element.css(property));
        var targetSize = null;
        switch (method) {
          case "ceil": targetSize = Math.ceil(newSize); break;
          case "floor": targetSize = Math.floor(newSize); break;
          default: return null;
        }
        if (targetSize !== null && (targetSize > min && targetSize != currentSize)){
          thisObject.element.css(property, targetSize);
          thisObject.element.find(".poker-inside").css(property, targetSize);
          thisObject.lastWidth = currentWidth;
        }
      }

      function setBoxShadow(thisObject, method, newSize, min){
          var currentSize = parseInt(thisObject.element.css("box-shadow").split(" ")[6]);
          var targetSize = null;
          var property = null;
          switch (method) {
            case "ceil": targetSize = Math.ceil(newSize); break;
            case "floor": targetSize = Math.floor(newSize); break;
            default: return null;
          }
          if (targetSize !== null && (targetSize != currentSize)){
            property = "0 0 "+targetSize+"px rgba(0, 0, 0, 0.5)";
            console.log(property);
            if (targetSize > min){

              thisObject.element.css("box-shadow", property);
              thisObject.element.css("-webkit-box-shadow", property);
              thisObject.element.css("-moz-box-shadow", property);
            }else {
              property = "0 0 "+min+"px rgba(0, 0, 0, 0.5)";
              thisObject.element.css("box-shadow", property);
              thisObject.element.css("-webkit-box-shadow", property);
              thisObject.element.css("-moz-box-shadow", property);
            }
          }
      }
    };



    function Plugin(option) {
      return this.each(function () {
        var $this = $(this);
        var data  = $this.data('bs.poker');

        if (!data) $this.data('bs.poker', (data = new PokerCard(this)));
        if (typeof option == 'string') data[option]();
      });
    }

    $.fn.pokerCards = Plugin;


    var initializePokerDom = function(){
      $(".poker-card").each(function(index){
        var $this = $(this);
        var cardValue = $this.data("value");
        var cardSuit = $this.data("suit");
        var cardWidth = parseInt($(this).width()) || 200;
        var cardColor = $this.data("color");
        var backgroundColor = $this.data("background-color") || "blue";
        var backgroundImage = $this.data("background");
        var pokerCard = new PokerCard(this);

        var $pokerInside = $("<div class='poker-inside'></div>");
        if (cardColor) $pokerInside.css("color", cardColor);
        if (backgroundImage) $this.css("background-image", "url("+backgroundImage+")");


        var valueClass = {  "A":  ["center-poker poker-one poker-suit-big"],
                            "2":  ["center-poker poker-two-one", "center-poker poker-two-two"],
                            "3":  ["center-poker poker-three-one", "center-poker poker-three-two", "center-poker poker-three-three"],
                            "4":  ["left-poker poker-two-one", "left-poker poker-two-two", "right-poker poker-two-one", "right-poker poker-two-two"],
                            "5":  ["left-poker poker-two-one", "left-poker poker-two-two", "right-poker poker-two-one", "right-poker poker-two-two", "center-poker poker-one"],
                            "6":  ["left-poker poker-three-one", "left-poker poker-three-two", "left-poker poker-three-three", "right-poker poker-three-one", "right-poker poker-three-two", "right-poker poker-three-three"],
                            "7":  ["left-poker poker-three-one", "left-poker poker-three-two", "left-poker poker-three-three", "right-poker poker-three-one", "right-poker poker-three-two", "right-poker poker-three-three", "center-poker poker-two-one-offset"],
                            "8":  ["left-poker poker-three-one", "left-poker poker-three-two", "left-poker poker-three-three", "right-poker poker-three-one", "right-poker poker-three-two", "right-poker poker-three-three", "center-poker poker-two-one-offset",  "center-poker poker-two-two-offset"],
                            "9":  ["left-poker poker-four-one", "left-poker poker-four-two", "left-poker poker-four-three", "left-poker poker-four-four", "right-poker poker-four-one", "right-poker poker-four-two", "right-poker poker-four-three", "right-poker poker-four-four", "center-poker poker-one"],
                            "10": ["left-poker poker-four-one", "left-poker poker-four-two", "left-poker poker-four-three", "left-poker poker-four-four", "right-poker poker-four-one", "right-poker poker-four-two", "right-poker poker-four-three", "right-poker poker-four-four", "center-poker poker-two-one-offset-offset", "center-poker poker-two-two-offset-offset"]
                      };

        var numberClass = "poker-side-number";

        if(parseInt(cardValue) === 10) numberClass = numberClass + " poker-value-ten";
        $pokerInsideSide = $("<span class='"+numberClass+"'>"+cardValue+"</span><span class='poker-side-suit'>"+cardSuit+"</span>");
        $pokerInside.append("<div class='poker-inside-left'></div>");

        if(cardValue in valueClass){
          valueClass[cardValue].forEach(function(element, index, array){
            $pokerInside.append("<div class='poker-suit "+element+"'>"+cardSuit+"</div>");
          });
        }else{
          $pokerInside.append("<div class='poker-suit center-poker poker-one poker-suit-big'>"+cardSuit+"</div>");
        }

        $pokerInside.append("<div class='poker-inside-right'></div>");
        $pokerInside.find(".poker-inside-right").append($pokerInsideSide.clone());
        $pokerInside.find(".poker-inside-left").append($pokerInsideSide.clone());

        $this.append($pokerInside);

        $this.data('bs.poker', pokerCard);
        pokerCard.resize();


      });
    };

    $(document ).ready(function() {initializePokerDom();});

}(jQuery));
