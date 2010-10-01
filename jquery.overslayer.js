/*
 * Overslayer, the badass overlayer
 * Just a simple overlayer with callbacks
 *
 * Author: Yves Van Broekhoven & Simon Menke
 * Date: 2010-09-29
 * Version: 0.1
 *
 */

(function($){
  
  var _open, _close;
  
  $.fn.overslayer = function(options){
    
    // Extend options
    var opts = options ? $.extend({}, $.fn.overslayer.defaults, options) : $.fn.overslayer.defaults;
    
    return this.each(function(){
      $this = $(this);
      this.overslayer_options = opts;
      $this.click(function(e){
        e.preventDefault();
        $.fn.overslayer.open.call(this);
      });
      
    });
    
  };
  
  /*
   * Default options
   * @options opts [Function] beforeOpen (null) Function runs before the overlayer opens
   * @options opts [Function] beforeOpenAsync (null) Function runs before the overlayer opens and triggers the open function when done
   * @options opts [Function] beforeClose (null) Function runs before the overlayer closes
   * @options opts [Function] beforeCloseAsync (null) Function runs before the overlayer closes and triggers the close function when done
   * @options opts [Function] afterOpen (null) Function runs after the overlay opened
   * @options opts [Function] afterClose (null) Function runs after the overlay closed
   * @options opts [Object] closeOnClick (true) Clicked this element(s) to close the overlayer
   */
  $.fn.overslayer.defaults = {
    beforeOpen: null,
    beforeOpenAsync: null,
    beforeClose: null,
    beforeCloseAsync: null,
    afterOpen: null,
    afterClose: null,
    closeOnClick: '#overslayer',
    fx: 'fade'
  };
  
  
  /*
   * Open the overlayer
   * @param [Object] opts
   * @see $.fn.overslayer.defaults
   */
  $.fn.overslayer.open = function(opts){

    if (this.overslayer_options) {
      opts = opts ? $.extend({}, this.overslayer_options, opts) : this.overslayer_options;
    } else {
      opts = opts ? $.extend({}, $.fn.overslayer.defaults, opts) : $.fn.overslayer.defaults;
    }
    

    // Before open
    if ($.isFunction(opts.beforeOpen)) {
      opts.beforeOpen();
    };
    
    // Before open with callback
    if ($.isFunction(opts.beforeOpenAsync)) {
      opts.beforeOpenAsync(function(content){
        opts.content = content;
        _open(opts);
      });
    } else {
      _open(opts);
    };
    
  };
  
  
  /*
   * Closes the overlayer
   * @param [Object] opts
   * @see $.fn.overslayer.defaults
   */
  $.fn.overslayer.close = function(opts){
    
    if (this.overslayer_options) {
      opts = opts ? $.extend({}, this.overslayer_options, opts) : this.overslayer_options;
    } else {
      opts = opts ? $.extend({}, $.fn.overslayer.defaults, opts) : $.fn.overslayer.defaults;
    }
    
    // Before close
    if ($.isFunction(opts.beforeClose)) {
      opts.beforeClose();
    };
    
    // Before open with callback
    if ($.isFunction(opts.beforeCloseAsync)) {
      opts.beforeCloseAsync(function(){
        _close(opts);
      });
    } else {
      _close(opts);
    };
    
  };
  
  
  /*
   * The actually creation of the overlayer
   * @private
   *
   * @param [Object] opts
   * @see $.fn.overslayer.defaults
   */
  _open = function(opts){
    
    // Create overlayer
    var overlay = $('<div id="overslayer"></div>');
    if (opts.content) {
      overlay.html(opts.content);
    }
    // Attach close event
    $(opts.closeOnClick).live('click', function(event){
      event.preventDefault();
      $.fn.overslayer.close(opts);
    });
    
    // Open the bitch
    if ($('#overslayer').length <= 0) {
      overlay.appendTo('body').hide();
      if (opts.fx) {
        overlay.fadeIn(300, function(){
          // After open callback
          if ($.isFunction(opts.afterOpen)) {
            opts.afterOpen();
          }
        
        });
      } else {
        overlay.show();
        // After open callback
        if ($.isFunction(opts.afterOpen)) {
          opts.afterOpen();
        }
        
      }
    }

  };
  
  
  /*
   * The actually close of the overlayer
   * @private
   *
   * @param [Object] opts
   * @see $.fn.overslayer.defaults
   */
  _close = function(opts){
    $('#overslayer').fadeOut(300, function(){
      
      $(this).remove();
      
      // After close callback
      if ($.isFunction(opts.afterClose)) {
        opts.afterClose();
      }
      
    });
  }
  
})(jQuery);