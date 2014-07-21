$(document).ready(function() {



// sticky header

	function header() {
		var scroll_top = $(window).scrollTop();
		if(scroll_top > 1) {
   			$('.header').addClass('is-fixed');
   		}
   		else{
   			$('.header').removeClass('is-fixed');
   		}
   		if ($('.wrapper').css('overflow') == 'hidden') {
   			$('.header-wrap').css('top', scroll_top);
   			$('.header').removeClass('is-fixed');
   		}
   		else{
   			$('.header-wrap').css('top', 0).removeClass('is-open');
   			$('.out__inner').removeClass('is-open');
   			$('.out_mobile').removeClass('is-open');
   			$('.menu-btn').removeClass('is-active');
   		}
	} header();	

// sidebar
	
	$('.menu-btn').on('click', function(){
		$(this).addClass('is-active');
		$('.out_mobile').addClass('is-open');
		$('.out__inner').addClass('is-open');
		$('.header-wrap').addClass('is-open');
		return false;
	});
	$('.out__inner').on('touchstart click', function(){
		$('.menu-btn').removeClass('is-active');
		$('.header-wrap').removeClass('is-open');
		$(this).removeClass('is-open').parent('.out').removeClass('is-open');
	});

	$('.js-close-sidebar').on('click', function(){
		$('.menu-btn').removeClass('is-active');
		$('.header-wrap').removeClass('is-open');
		$('.out__inner').removeClass('is-open').parent('.out').removeClass('is-open');
	});

	$('.out__inner').swipe({
		swipeLeft: function(event, direction, distance, duration, fingerCount) {
		    $('.menu-btn').removeClass('is-active');
			$('.header-wrap').removeClass('is-open');
			$(this).removeClass('is-open').parent('.out').removeClass('is-open');
		},
		swipeRight: function(event, direction, distance, duration, fingerCount) {
		    
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold: 0
	});


// validation
	
	function validate() {
		$('.js-validate').each(function(){
			if ($(this).length > 0) {
				jQuery.validator.setDefaults({
				  debug: true,
				  success: "valid"
				});

				$(this).validate({
					errorClass: 'is-error',
					rules: {
						name: {
							minlength: 2
						},
						company: {
							minlength: 2
						},
						comment: {
							minlength: 2
						},
						email: {
							email: true
						},
						tel: {
							minlength: 2,
							number: true
						}
					}
				});
			}
		});
	}
		
	validate();



//resize function

	$(window).resize(function(){
		header();
	});

//scroll function

	$(window).scroll(function(){
		header();
	})
	
});