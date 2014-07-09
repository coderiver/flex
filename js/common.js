head.ready(function() {

// slider

	function slider() {
		if ($('.slider').length) {	
			$('.slider__pager ul li:first-child').addClass('is-active');

			// vars
			var w = $(window).width();
			var h = $(window).height();
			var slider = $('.slider');
			var item = $('.slider__list li');
			var item_content = $('.slider__content')
			var next = $('.slider__next');
			var prev = $('.slider__prev');
			
			// autoheight
			//slider.css('height', h);
			
			if (w >= 480) {
				item_content.css('width', (w*0.8 - 100));
			}

			// slider__item visibility
			item.css('width', 0);
			$('.slider__list li:first-child').css('width', '100%');
			
			// slider nav
			next.on('click', function(){
				if ($('.slider__list li.is-active').next('li').length) {
					$('.slider__list li.is-active').removeClass('is-active').next('li').addClass('is-active').
					animate({
						width: '100%'
					}, 500);
					$('.slider__pager li[class = is-active]').removeClass('is-active').next().addClass('is-active');
				};

				return false;
			});
			prev.on('click', function(){
				if ($('.slider__list li.is-active').prev('li').length) {
					$('.slider__list li.is-active').removeClass('is-active').
					animate({
						width: '0%'
					}, 500, function(){
						$(this).prev('li').addClass('is-active');
					});

					$('.slider__pager li[class = is-active]').removeClass('is-active').prev().addClass('is-active');

				};
				return false;
			});

			//slider pager
			
			$('.slider__pager li a').on('click', function(){
				var slide = $(this).attr('data-slide');
				$('.slider__pager li').removeClass('is-active');
				$(this).parent().addClass('is-active');
				$('.slider__list li').removeClass('is-active');
				$('.slider__list li[data-slide = '+slide+']').addClass('is-active').animate({
					width: '100%'
				}, 500);
				return false;
			});

			

		};
	}
	slider();

// scroll top

	function scrollUp() {
		var btn = $('.js-scroll-up');

		if($(window).scrollTop() + $(window).height() == $(document).height()) {
   			btn.addClass('is-animated');
   		}
   		else{
   			btn.removeClass('is-animated');
   		}

				 
	} 
	scrollUp();	

	$('.js-scroll-up').on('click', function(){
		$('html, body').animate({
    	  scrollTop: $('.out').offset().top
    	}, 500);
    	return false;
	});

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
	$('.out__inner').on('click', function(){
		$('.menu-btn').removeClass('is-active');
		$('.header-wrap').removeClass('is-open');
		$(this).removeClass('is-open').parent('.out').removeClass('is-open');
	});

// m-events

	function m_events(){
		if ($('.header__phone').css('display') == 'none') {
			$('.m-events__item:last-child').hide();
		}	
	}
	m_events();

// portfolio navigation

	function portfolioNav() {
		if ($('.js-portfolio').length) {
			$('.portfolio__dropdown').hide();

			var btn = $('.js-portfolio-nav a');


			btn.on('click', function(){
				var index = $(this).attr('href');
				if ($(this).hasClass('is-active')) {
					$('.portfolio__dropdown').slideUp();
					$(this).removeClass('is-active');
					
				}
				else{
					$('.portfolio__dropdown').slideUp();
					btn.removeClass('is-active');
					$(this).addClass('is-active');
					$('.'+index+'').slideDown();
				}

				return false;
			});

		}
	} 
	portfolioNav();

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

//resize function

	$(window).resize(function(){
		slider();
		header();
		m_events();
	});

//scroll function

	$(window).scroll(function(){
		scrollUp();
		header();
	})
	
});