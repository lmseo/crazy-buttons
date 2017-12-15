(function ($, global){
  var arr = [];

  var slice = arr.slice;

  var sel,

  version = 1.0,

  doc = global.document;

    //return  a Crazy object to avoid having to use the New op
    var Crazy = function(selector){
      return new Crazy.init(selector);
    }

    //save all methods
    Crazy.prototype = {
      version: version,

      getVersion: function(){
        console.log(this.version);
      },
      getElements: function(){
        return this.elementsArray;
      },
      constructor: Crazy,

      getConstructor: function(){
        return Crazy;
      },

      selector:"",

      getSelector:function(){
        return this.selector;
      },
      setSelector:function(selector){
        return new Crazy.init(selector); 
      },
      displaySelector:function(){
        console.log(this.selector);
      },

      // The default length of a jQuery object is 0
      length: 0,

      toArray: function() {
        return slice.call( this.elementsArray );
      },
        // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function( num ) {
        return num != null ?

          // Return a 'clean' array
          ( num < 0 ? this.elementsArray[ num + this.elementsArray.length ] : this.elementsArray[ num ] ) :

          // Return just the object
          slice.call( this.elementsArray );
      },
      log: function(){
        if(console){
          console.log(this);
        }
        return this;
      }
    };
   //Initialize Crazy
    Crazy.init = function(selector){
      self = this;
      if ( !selector ) {
        return self;
      }else{
        if ( typeof selector === "string" ) {
          self.elements = $( selector );
          self.elementsArray = $( selector ).toArray();
          self.selector = selector;
          $.each(self.elementsArray, function(index, value){
            value.addEventListener("mouseenter", buttonsGo);
          });
        }
      }
      
    }
    
    //buttonsGo function that makes the button's position go crazy

    function buttonsGo(){
      self = this;
      setTimeout(function(){
        const btnPosition = self.getBoundingClientRect();
        const topOffset = 
          Math.abs((Math.random() * global.innerHeight) - btnPosition.height);
        const leftOffset = 
          Math.abs((Math.random() * global.innerWidth) - btnPosition.width);
        //
        self.style.transform = "translate3d(0,0,0)";
        self.style.top = topOffset + 'px';
        self.style.left = leftOffset + 'px';
      return self;
      },300);
      
    }

    Crazy.prototype.crazyButtons = function(wrapper, numberOfButtons, text, selector){
      var buttons, 
      self = this;
      if( !wrapper ){
        buttons = createButtons(numberOfButtons);
        if(Array.isArray(buttons)){
          for (var i = 0; i < buttons.length; i++) {
            doc.body.appendChild(buttons[i]);
          }
          return new Crazy.init(this.selector);
        }
      }else{   
        if ( typeof wrapper === "string" ) {
          self.wrapper = $(wrapper);
           buttons = createButtons(numberOfButtons);
           console.log(buttons.length);
          if(Array.isArray(buttons)){
            for (var i = 0; i < buttons.length; i++) {
              self.wrapper.append(buttons[i]);
            }
            return new Crazy.init(this.selector);
          }
        }  
      }
    }
    function createButtons(numberOfButtons, text, cssClass){
      var buttons = [];
      if( !numberOfButtons ){
        buttons[0] = doc.createElement('button');
        // Create a text node
        var t = doc.createTextNode("I'm dynamic"); 
        buttons[0].appendChild(t);     
        buttons[0].classList.add(
          'btn', 
          'btn-primary', 
          'crazy', 
          'centeBtn'
        );
        return buttons;
      }else{
        for (var i = 0; i < numberOfButtons; i++) {
          var button = doc.createElement('button');
          buttons[i] = button;
          var t = doc.createTextNode("I'm dynamic"); 
          buttons[i].appendChild(t);     
          buttons[i].classList.add(
            'btn', 
            'btn-primary', 
            'crazy', 
            'centeBtn'
          );
        }
        return buttons;
      }
      return null;

    }
    //new Crazy.init(selector) creates a Crazy object bc init.prototype points to Crazy.prototype
    Crazy.init.prototype = Crazy.prototype;
    //Attach Crazy and C$ to Window object
    global.Crazy = global.C$ = Crazy; 

}(jQuery, window));