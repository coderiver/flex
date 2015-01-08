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

 // nav scroll

    function scrollNav(){
        $('.js-section').each(function(){
            var pos = $(this).offset().top;
            var id = $(this).attr('id');
            if( $(window).scrollTop() >= (pos - 111)){
                $('.menu ul li a').removeClass('is-active');
                $('[href = #'+id+']').addClass('is-active');
            }
        });
    }

    $(".menu a").click(function (){
        var page = $(this).attr("href");
    
        $('html, body').animate({
            scrollTop: $(page).offset().top - 110
        }, 500);
        return false;
    });

    $(".works-link").click(function (){
        var page = $(this).attr("href");
    
        $('html, body').animate({
            scrollTop: $(page).offset().top - 110
        }, 500);
        return false;
    });

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
	// function validate() {
	// 	$('.js-validate').each(function(){
	// 		if ($(this).length > 0) {
	// 			jQuery.validator.setDefaults({
	// 			  debug: true,
	// 			  success: "valid"
	// 			});

	// 			$(this).validate({
	// 				errorClass: 'is-error',
	// 				rules: {
	// 					name: {
	// 						minlength: 2
	// 					},
	// 					company: {
	// 						minlength: 2
	// 					},
	// 					comment: {
	// 						minlength: 2
	// 					},
	// 					email: {
	// 						email: true
	// 					},
	// 					tel: {
	// 						minlength: 2,
	// 						number: true
	// 					}
	// 				}
	// 			});
	// 		}
	// 	});
	// }
		
	// validate();

// select
    function select() {
        $(".js-select").each(function(){
            var select_list = $(this).find(".js-select-list");
            var text = select_list.find("li").first().text();
            select_list.hide();
            $(this).click(function(event){
                if ($(this).hasClass("is-active")) {
                    $(this).removeClass("is-active");
                    select_list.slideUp("fast");
                }
                else {
                    $(".js-select").removeClass("is-active");
                    $(".js-select-list").hide();
                    select_list.slideDown("fast");
                    $(this).addClass("is-active");
                }
                event.stopPropagation();
            });
            select_list.find("li").click(function(event) {
                var id = $(this).attr("data-id");
                var text = $(this).text();
                $(this).parent().parent().find(".js-select-text").text(text);
                $(this).parent().parent().find(".js-select-input").val(id);
                $(this).parent().hide();
                $(this).parents(".js-select").removeClass("is-active");
                event.stopPropagation();
                return false;
            });
        });

    }
    select();
    $('.js-select').click(function(event){
        event.stopPropagation();
    });

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

//resize function

	$(window).resize(function(){
		header();
	});

//scroll function

	$(window).scroll(function(){
		header();
		scrollNav();
	});

	$(document).click(function(e){
		$(".js-select-list").slideUp("fast");
	});
	
});