document.addEventListener("DOMContentLoaded", function () {
    const config = {
        threshold: 0.5
    };
    var lazyImages = [].slice.call( document.querySelectorAll(".lazy, [data-lazy='true']") );

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute("data-src");
                    lazyImage.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        }, config);
        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
    }
});

// var masonry = new MiniMasonry({
//     container: '.grid-posts .masonry',
//     gutter: 40,
//     // minify: false,
//     baseWidth: 300
// }); 


(function($){
	/* All Images Loaded */
	$(window).on('load', function(){   
        var document_width = $(document).width();

        if( theme_config.masonry == 'on' ){
            var $grid = $('.grid-posts').masonry({
                gutter: 0,
                itemSelector: 'article',
                horizontalOrder: true
            });
            setTimeout(function(){
                $grid.masonry('layout');
                $('[data-aos]').addClass('aos-animate');
            }, 500);
        }

        var referenceElement = document.getElementById('header');
        var header = document.getElementById('header');
        var backToTopButton = document.getElementById('back-to-top');
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) {
                    backToTopButton.classList.add('visible');
                    if( $('#header').hasClass('enable-sticky') ){
                        header.toggleAttribute('data-stuck', true);
                    }                    
                } else {
                    backToTopButton.classList.remove('visible');
                    header.toggleAttribute('data-stuck', false);
                }
            });
        }, {
            threshold: [1],
            rootMargin: '0px 0px 0px 0px'
        });
        
        observer.observe(referenceElement);

	});

	/* Dom Loaded */
	$(document).ready(function($){        

        var mfp_close_markup = '<span title="%title%" class="mfp-close">&times;</span>';
        var mfp_arrow_markup = '<span class="mfp-arrow mfp-arrow-%dir%"><svg class="icon ularge"><use xlink:href="'+site_url+'/assets/images/svg-icons.svg#%dir%-arrow"></use></svg></span>';

        /* Gallery Ghost v2.1 */

        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        })

        $('.kg-gallery-card').each(function(){
			$(this).find('img').wrap(function() {
				return '<a href="'+$(this).attr('src')+'" class="hover-effect" rel="gallery"></a>';
			});
			$(this).magnificPopup({
				type: 'image',
				gallery:{
					enabled: true,
					arrowMarkup: mfp_arrow_markup,
				},
				delegate: 'a',
				mainClass: 'my-mfp-zoom-in',
				removalDelay: 300,
				closeMarkup: mfp_close_markup
			});
		});

		/* Global */

		// Open mobile menu        

        $('#header div.menu-mobile, #header .open-menu').on('click', function(){
			$('html').toggleClass('epcl-menu-open');
        });
        $('.menu-overlay, .main-nav .close').on('click', function(){
			$('html').removeClass('epcl-menu-open');
        });

		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		});
        // fix back-to-top with scroll-snap-type
        $('#back-to-top').click(function(event) {
			event.preventDefault();
			$('#wrapper').animate({scrollTop: $('#header').offset().top}, 500);
			return false;
		});

		/* Global Lightbox */

		$('.lightbox').magnificPopup({
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
            arrowMarkup: mfp_arrow_markup,
			closeMarkup: mfp_close_markup,
			fixedContentPos: true
        });


        // Demo Only
        $('.epcl-demo-tool .link').on('click', function(e){
            var body_class = $(this).data('class');
            $('body').toggleClass( body_class );
            $(this).toggleClass('active');
            if( $('body').hasClass('disable-custom-colors') ){
                $('.epcl-category-overlay').hide();
            }else{
                $('.epcl-category-overlay').show();
            }
            if( $('body').hasClass('disable-decorations') ){
                $('.epcl-waves-page').hide();
            }else{
                $('.epcl-waves-page').show();
            }
            e.preventDefault();
        });
        $(' .epcl-demo-tool input[type=color]').on('input', function(e){
            var value = e.target.value;
            var data_class = $(this).data('class');
            var data_target = String( $(this).data('target') );
            var data_attr = String( $(this).data('attr') );
            if( data_class !== 'undefined' && data_attr !== 'undefined') {
                $(data_class).css(data_attr, value);
            } else {
                $(":root").css({
                    [data_target]: value
                });                
            }    
        });

	});

})(jQuery);

(function() {
    var supportsPassive = eventListenerOptionsSupported();  

    if (supportsPassive) {
      var addEvent = EventTarget.prototype.addEventListener;
      overwriteAddEvent(addEvent);
    }

    function overwriteAddEvent(superMethod) {
      var defaultOptions = {
        passive: true,
        capture: false
      };

      EventTarget.prototype.addEventListener = function(type, listener, options) {
        var usesListenerOptions = typeof options === 'object';
        var useCapture = usesListenerOptions ? options.capture : options;
        options = usesListenerOptions ? options : {};
        if( type == 'touchstart' || type == 'touchmove'){
            options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
        }        
        options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;

        superMethod.call(this, type, listener, options);
      };
    }

    function eventListenerOptionsSupported() {
      var supported = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function() {
            supported = true;
          }
        });
        window.addEventListener("test", null, opts);
      } catch (e) {}

      return supported;
    }

  })();