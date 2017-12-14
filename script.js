(function (doc, global){
    //return  a Crazy object to avoid having to use the New op
    var Crazy = function(selector){
      return new Crazy.init(selector);
    }
    //save all methods
    Crazy.prototype = {};

    //Initialize Crazy
    Crazy.init = function(selector){
      self = this;
      self.myBtns = doc.querySelectorAll(selector);
      self.myBtns.forEach(function(btn){
        btn.addEventListener("mouseenter", self.buttonsGo);
      });
    }
    //Cray method that makes the button's position go crazy

    Crazy.prototype.buttonsGo = function(){
      const btnPosition = this.getBoundingClientRect();
      const topOffset = 
        Math.abs((Math.random() * global.innerHeight) - btnPosition.height);
      const leftOffset = 
        Math.abs((Math.random() * global.innerWidth) - btnPosition.width);
      //
      this.style.transform = "translate3d(0,0,0)";
      this.style.top = topOffset + 'px';
      this.style.left = leftOffset + 'px';
    }
    //new Crazy.init(selector) creates a Crazy object bc init.prototype points to Crazy.prototype
    Crazy.init.prototype = Crazy.prototype;
    //Attach Crazy and C$ to Window object
    global.Crazy = global.C$ = Crazy; 

}(document, window));

//run Crazy function by passing a string selector 
C$(".btn");

