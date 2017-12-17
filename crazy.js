(function ($, global){
  var arr = [],

  slice = arr.slice,

  buttonTypes = {
    primary: 'btn-primary',
    success: 'btn-success',
    info: 'btn-info',
    warning: 'btn-warning'
  },

  buttonDefaultCSS = [
    'btn',
    'btn-primary',
    'crazy', 
    'centeBtn'
  ],

  buttonDefaultText = [
    'I\'m dynamic',
    'Catch me',
    'Click me',
    'Rrrrrg', 
    'Not again!',
    'Go away!!',
    'You didn\'t see me'
  ],

  sel,

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
        console.log( this.version );
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
      setSelector:function( selector ){
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
      //log: Chainable method 
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
    //crazyButtons chainable method creates buttons dynamically
    //wrapper: element to attach buttons
    //numberOfButtons: # of buttons
    //text: Button text. If empty random
    //cssClasses: Button css classes. If empty use default
    Crazy.prototype.crazyButtons = function( wrapper, numberOfButtons, text, cssClasses ){
      var buttons, 
      self = this;
      //HANDLE: Don't create more than 100 buttons
      if( numberOfButtons > 100){
        numberOfButtons = 100;
        console.log( 'no more than: ' + numberOfButtons)
      }
      if( !wrapper ){
        buttons = createButtons( numberOfButtons, text, cssClasses);
        if( Array.isArray( buttons ) ){
          for ( var i = 0; i < buttons.length; i++ ) {
            doc.body.appendChild(buttons[i]);
          }
          return new Crazy.init(this.selector);
        }
      }else{   
        if( typeof wrapper === "string" ) {
          self.wrapper = $(wrapper);
          buttons = createButtons( numberOfButtons, text, cssClasses );
          if(Array.isArray(buttons)){
            for (var i = 0; i < buttons.length; i++) {
              self.wrapper.append(buttons[i]);
            }
            return new Crazy.init( this.selector );
          }
        }  
      }
      return self;
    }
    function createButtons(numberOfButtons, text, cssClasses){
      var buttons = [];
      var btnCssClasses = [];
      var btnCssClassesStr = '';
      // HANDLE: var text (""), (null), (undefined), (false)
      if(!text){
        text = false;
      }else{
        if(typeof text === "string"){
          text = text;
        }else{
          text = false;
        }
      }
      // HANDLE: var cssClasses (""), (null), (undefined), (false)
      if(!cssClasses){
        btnCssClasses = buttonDefaultCSS.slice();
      }else{
        //HANDLE: cssClasses str add to default css array
        if(typeof cssClasses === "string"){
          btnCssClasses = buttonDefaultCSS.slice();
          btnCssClasses.push(cssClasses);
          console.log(cssClasses);
        //HANDLE: cssClasses is Array replaces default css array
        }else if(Array.isArray(cssClasses)){
          btnCssClasses = cssClasses.slice();
        }
      }
      // HANDLE: var numberOfButtons (""), (null), (undefined), (false)
      if( !numberOfButtons ){
        numberOfButtons = 1;
      }
      //creates str with all the css classes
      btnCssClasses.forEach(function(el){
        btnCssClassesStr += el + ' ' ;
      });
      //Create buttons
      for (var i = 0; i < numberOfButtons; i++) {
        var btnText = text;
        var button = doc.createElement('button');
        buttons[i] = button;
        //HANDLE: If text not str or not set pick a random from Array
        if(btnText === false){
          btnText = buttonDefaultText[Math.floor(Math.random() * buttonDefaultText.length)];
        }
        var t = doc.createTextNode(btnText); 
        buttons[i].appendChild(t); 
          
        buttons[i].className = btnCssClassesStr;
      }
      return buttons;
    }
    //new Crazy.init(selector) creates a Crazy object bc init.prototype points to Crazy.prototype
    Crazy.init.prototype = Crazy.prototype;
    //Attach Crazy and C$ to Window object
    global.Crazy = global.C$ = Crazy; 

}(jQuery, window));