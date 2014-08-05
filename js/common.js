$(document).ready(function() {
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};
// pages transition

(function() {

			var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } );

			$('a').click(function(ev) {
				if($(this).attr('target')=='_blank'){

				}
				else{
					ev.preventDefault();
					var inner_link = $(this).attr('rel');
					if (inner_link == 'internal') {
					}
					else{

						loader.show();
		
						var route = $(this).attr('href');
						
						setTimeout( function() {
							
							window.location.href = route;
						}, 1000 );
					}
				}
				
			});
		

	})();



// dropzone submit

Dropzone.options.myDropzone = {

  // Prevents Dropzone from uploading dropped files immediately
  autoProcessQueue: false,

  init: function() {
    var submitButton = document.querySelector(".js-submitall")
        myDropzone = this; // closure

    submitButton.addEventListener("click", function() {
      myDropzone.processQueue(); // Tell Dropzone to process all queued files.
    });

    // You might want to show the submit button only when 
    // files are dropped here:
    this.on("addedfile", function() {
      // Show submit button here and/or inform user to click it.
    });

  }
};


// slider

	function slider_width() {
		if ($('.slider').length) {
			// vars
			var w = $(window).width(),
					h = $(window).height(),
					slider = $('.slider'),
					item = $('.slider__list li'),
					item_content = $('.slider__content'),
					pager_link = slider.find('.slider__pager a');
			if (w >= 480) {
				item_content.css('width', (w*0.8 - 100));
			}
			else{
				item_content.css('width', (w - 40));
			}
			// slider__item visibility
			item.css('width', 0);
			item.removeClass('is-active');
			pager_link.removeClass('is-active').first().addClass('is-active');
			pager_link.removeAttr('data-direction');
			slider.find('.slider__pager a:not(:first)').attr('data-direction', 'next');
			slider.find('.slider__prev').addClass('is-hidden');
			slider.find('.slider__next').removeClass('is-hidden');
			$('.slider__list li:first-child').css('width', '100%').addClass('is-active');
		}
	} 
	slider_width();

	function slider() {
		if ($('.slider').length) {	
			$('.slider__pager ul li:first-child').addClass('is-active');
			// vars
			var slider = $('.slider'),
					item = $('.slider__list li'),
					next = $('.slider__next'),
					prev = $('.slider__prev');
			// slider nav first/last hidden
			if ($('.slider__list li.is-active').next('li').length) {
				next.removeClass('is-hidden');	
			}
			else{
				next.addClass('is-hidden');
			}
			if ($('.slider__list li.is-active').prev('li').length) {
				prev.removeClass('is-hidden');	
			}
			else{
				prev.addClass('is-hidden');
			}
			//slider nav
			var pager = $('.slider__pager'),
					pager_link = pager.find('a');
			pager_link.on('click', function(){
				var slide = $(this).data('slide');
				pager_link.removeClass('is-active');
				$(this).nextAll().attr('data-direction', 'next');
				$(this).prevAll().attr('data-direction', 'prev');
				$(this).addClass('is-active');
				pager_data = $(this).attr('data-direction');
				if (pager_data == 'prev') {
					$(this).removeAttr('data-direction');
					$('.slider__list li.is-active').animate({
						width: '0%'
					}, 500);
					$('.slider__list li[data-slide = '+slide+']').addClass('is-active').css('width', '100%');
				};
				if (pager_data == 'next') {
					$(this).removeAttr('data-direction');
					$('.slider__list li').removeClass('is-active');
					$('.slider__list li[data-slide = '+slide+']').addClass('is-active').animate({
						width: '100%'
					}, 500);
				};
				next.removeClass('is-hidden');
				prev.removeClass('is-hidden');
				if (pager_link.first().hasClass('is-active')) {
					prev.addClass('is-hidden');
				};
				if (pager_link.last().hasClass('is-active')) {
					next.addClass('is-hidden');
				};
				return false;
			});
			next.on('click', function(){
				prev.removeClass('is-hidden');
				var active = $('.slider__pager a.is-active');
				active.next().trigger('click');
				return false;
			});
			prev.on('click', function(){
				next.removeClass('is-hidden');
				var active = $('.slider__pager a.is-active');
				active.prev().trigger('click');
				return false;
			});
			slider.swipe({
				swipeLeft: function(e) {
				    next.trigger('click');
				},
				swipeRight: function(e) {
				    prev.trigger('click');
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold: 0
			});
		};
	}
	slider();

// scroll top

	function scrollUp() {
		var btn = $('.js-scroll-up');

		if($(window).scrollTop() + $(window).height() >= ($(document).height() - 50)) {
   			btn.addClass('is-animated');
   		}
   		else{
   			btn.removeClass('is-animated');
   		}

				 
	} 
	scrollUp();	

	$('.js-scroll-up').on('click', function(){
		$('html, body').animate({
    	  scrollTop: $('body').offset().top
    	}, 500);
    	return false;
	});

// sidebar
	var wrap_header = $('.wrap-header'),
			wrap_header_in = wrap_header.find('.wrap-header__in'),
			wrap_in = $('.wrap-in'),
			menu_btn = $('.menu-btn');
	
	menu_btn.on('click', function(){
		var scroll_top = $(document).scrollTop();
		$(this).addClass('is-active');
		wrap_header.addClass('is-open').css('top', scroll_top);
		wrap_in.addClass('is-open');
		return false;
	});

	$('body').on('scroll touchmove mousewheel', function(e){
	  if ($('.wrap-header').hasClass('is-open')) {
	  	e.preventDefault();
	  	e.stopPropagation();
	  	return false;
	  };
	})
	wrap_in.on('touchstart click', function(){
		menu_btn.removeClass('is-active');
		wrap_header.removeClass('is-open');
		wrap_in.removeClass('is-open');
	});

	$('.js-close-sidebar').on('click', function(){
		menu_btn.removeClass('is-active');
		wrap_header.removeClass('is-open');
		wrap_in.removeClass('is-open');
	});

	$('.wrap-in').swipe({
		swipeLeft: function(event, direction, distance, duration, fingerCount) {
		  menu_btn.removeClass('is-active');
		  wrap_header.removeClass('is-open');
		  wrap_in.removeClass('is-open');
		},
		swipeRight: function(event, direction, distance, duration, fingerCount) {
		    
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold: 0
	});

// m-events

	function m_events(){
		if ($('.out').css('cursor') == 'default') {
			$('.m-events__item:last-child').hide();
		}
		else{
			$('.m-events__item:last-child').show();
		}	
	}
	m_events();

// portfolio navigation

	function filters() {
		if ($('.js-filters').length) {
			$('.filters__dropdown').hide();

			var btn = $('.js-filters-nav a');
			var link = $('.filters__dropdown a');

			btn.on('click', function(){
				var index = $(this).attr('href');
				if ($(this).hasClass('is-active')) {
					$('.filters__dropdown').slideUp();
					$(this).removeClass('is-active');
					
				}
				else{
					$('.filters__dropdown').slideUp();
					btn.removeClass('is-active');
					$(this).addClass('is-active');
					$('.'+index+'').slideDown();
					link.removeClass('is-active').removeClass('no-active');
				}

				return false;
			});

			link.on('click', function(){
				if ($(this).hasClass('is-active')) {
					link.removeClass('no-active is-active');
				}
				else{
					link.addClass('no-active');
					link.removeClass('is-active');
					$(this).removeClass('no-active').addClass('is-active');
				}
				return false;
			});
			link.hover(function(){
				link.addClass('no-active');
				$(this).removeClass('no-active');
				$('.filters__dropdown a.is-active').removeClass('no-active');
			}, function(){
				link.removeClass('no-active');
				$('.filters__dropdown li').each(function(){
					if ($(this).find('a').hasClass('is-active')) {
						link.addClass('no-active');
						$(this).find('a').removeClass('no-active');
					};
				});

			});

			
			

		}
	} 
	filters();

// popup
	
	$('.js-like-btn').on('click', function(){
		$('.js-popup').addClass('is-open');
		$('.wrapper').addClass('has-blur');
		return false;
	});

	$('.popup-wrap').on('click', function(event){
		$('.wrapper').removeClass('has-blur');
		$('.js-popup').removeClass('is-open');
	});
	$('.popup').on('click', function(event){
		event.stopPropagation();
	});			

// slick gallery
	if ($('.js-gallery').length) {
		$('.js-gallery').slick({
			dots: true
		});
	};

	function gallery(){
		if ($('.js-gallery-2').length) {
			var gallery = $('.js-gallery-2');
			var	index = gallery.find('.gallery__index');
					
			var number = $('.js-gallery2 div').length;
			gallery.find('.gallery__total').text(number);

			$('.js-gallery2').slick({
				dots: false,
				onInit: function(){
					$('.js-gallery-2').find('.gallery__index').html( 1 );
				},
				onAfterChange: function(){
					var currIndex1 = $('.js-gallery2').slickCurrentSlide();
					$('.js-gallery-2').find('.gallery__index').html( currIndex1 + 1 );
				}
			});

			var prev = gallery.find('.gallery__prev'),
				next = gallery.find('.gallery__next');
				
			prev.on('click', function(){
				$(this).parents('.gallery').find('.js-gallery2').slickPrev();
				var currIndex2 = $(this).parents('.gallery').find('.js-gallery2').slickCurrentSlide();
				index.html( currIndex2 + 1 );
			});
			next.on('click', function(){
				$(this).parents('.gallery').find('.js-gallery2').slickNext();
				var currIndex3 = $(this).parents('.gallery').find('.js-gallery2').slickCurrentSlide();
				index.html( currIndex3 + 1 );
			});
				
		};
	}
	gallery();

	function gallery2(){
		if ($('.js-gallery-3').length) {
			var gallery = $('.js-gallery-3');
			var	index = gallery.find('.gallery__index');
					
			var number = $('.js-gallery3 div').length;
			gallery.find('.gallery__total').text(number);

			$('.js-gallery3').slick({
				dots: false,
				onInit: function(){
					$('.js-gallery-3').find('.gallery__index').html( 1 );
				},
				onAfterChange: function(){
					var currIndex1 = $('.js-gallery3').slickCurrentSlide();
					$('.js-gallery-3').find('.gallery__index').html( currIndex1 + 1 );
				}
			});

			var prev = gallery.find('.gallery__prev'),
				next = gallery.find('.gallery__next');
				
			prev.on('click', function(){
				$(this).parents('.gallery').find('.js-gallery3').slickPrev();
				var currIndex2 = $(this).parents('.gallery').find('.js-gallery3').slickCurrentSlide();
				index.html( currIndex2 + 1 );
			});
			next.on('click', function(){
				$(this).parents('.gallery').find('.js-gallery3').slickNext();
				var currIndex3 = $(this).parents('.gallery').find('.js-gallery3').slickCurrentSlide();
				index.html( currIndex3 + 1 );
			});
				
		};
	}
	gallery2();
	
	

// article nav position

	function article_nav() {
		if ($('.article-nav').length) {

			var nav = $('.article-nav'),
				top = ($('.topper').outerHeight() + 166),
				point2 = $('.footer').offset().top,
				scroll_top = ($(window).scrollTop() + $(window).height());
				nav.css('top', top);
				
				if ( (scroll_top - 250) > top ) {
					nav.addClass('is-fixed');
				}
				else{
					nav.removeClass('is-fixed');
				}
				
				if (scroll_top >= point2 ) {
					nav.addClass('no-fixed');
					nav.removeClass('is-fixed');
				}
				else{
					nav.removeClass('no-fixed');
				}
		}
	} 
	article_nav();

// tabs
	
	function tab() {
       $(".js-tab").each(function(){
         var tab_link = $(this).find("a");
         var tab_item = $(this).find("li");
         var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
         tab_cont.hide();
         tab_item.first().addClass("is-active");
         $(this).parents(".js-tab-group").find(".js-tab1").show();
         tab_link.on("click", function() {
             var index = $(this).attr("href");
             tab_item.removeClass("is-active");
             $(this).parent().addClass("is-active");
             tab_cont.hide();
             $(this).parents(".js-tab-group").find("."+index).show();
             return false;
          });
       });
  	}
  	tab();	

 // range slider
 
 	$( "#slider-range" ).slider({
      range: true,
      min: 5000,
      max: 30000,
      values: [ 5000, 30000 ],
      step: 1000,
      slide: function( event, ui ) {
        $( "#amount" ).val( "От $" + ui.values[ 0 ] + " до $" + ui.values[ 1 ]);
        var maximum = 30000;
        if (maximum == ui.values[ 1 ]) {
        	$( "#amount" ).val( "От $" + ui.values[ 0 ] + " до $" + ui.values[ 1 ] + "+");
        };
      }
    });
    $( "#amount" ).val( "От $" + $( "#slider-range" ).slider( "values", 0 ) +
      " до $" + $( "#slider-range" ).slider( "values", 1 ) + " +" ); 	
    $( "#slider-range" ).find('.ui-slider-handle:last-child').addClass('is-last');


// validation
	var form_validate = $('.js-validate');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				borderColorOnError : 'transparent',
				onSuccess : function() {
				  $('.progress-button-imitation').hide();
				  $('.progress-button').show().trigger('click');
				  return false;
				}
			});
		});
	};
	
	

// animation bg portfolio_inner

	!function($){
  	window.requestAnimationFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
        window.setTimeout(fn, 1000 / 60);
    }
  }();

  $(function() {
    if (el = document.getElementById('spotlight')) {      

      	(function render(){
        	var o = document.documentElement.scrollTop || document.body.scrollTop
          	, n = Math.max(Math.min(o / 375, 1), 0);

        	el.style.backgroundColor = "rgba(198, 40, 58, " + n + ")";

        	requestAnimationFrame(render);
      	}());
    	}
  	});
	}(jQuery);

	// header
	function header () {
		var header = $('.wrap-header');
		$(document).scroll(function () {
			var scroll_top = $(document).scrollTop();
			if (scroll_top > 0) {
				header.addClass('is-shadow');
			}
			else {
				header.removeClass('is-shadow');
			}
		});
	}
	header();

//resize function

	$(window).resize(function(){
		m_events();
		slider_width();
	});

//scroll function

	$(window).scroll(function(){
		scrollUp();
		article_nav();
	})

	

	
});



