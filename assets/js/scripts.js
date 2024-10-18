//@prepros-prepend preload-css.min.js
//@prepros-prepend jquery.min.js
//@prepros-prepend jquery-migrate.js
//@prepros-prepend jquery.magnific-popup.min.js
//@prepros-prepend masonry.pkgd.min.js
//@prepros-prepend functions.min.js

/* Custom Code changes here */
//@prepros-prepend nodecursor-jquery.min.js
( function($) {
    // init plugin
    NodeCursor({
        cursor : true, 
        node : true, 
        cursor_velocity : 1, 
        node_velocity : 0.15, 
        native_cursor : 'none', 
        element_to_hover : '.nodeHover', 
        cursor_class_hover : 'disable', 
        node_class_hover : 'expand', 
        hide_mode : true, 
        hide_timing : 2000, 
    });

})(jQuery);
