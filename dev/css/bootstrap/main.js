$(document).ready(function($) {

	"use strict";

	var loader = function() {
		
		setTimeout(function() { 
			if($('#pb_loader').length > 0) {
				$('#pb_loader').removeClass('show');
			}
		}, 700);
	};
	loader();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.pb_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();
	
	// slick sliders
	var slickSliders = function() {
		$('.single-item').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  autoplay: false,
	  	autoplaySpeed: 2000,
	  	nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	arrows: true,
	  	draggable: false,
	  	adaptiveHeight: true
		});

		$('.single-item-no-arrow').slick({
			slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  autoplay: true,
	  	autoplaySpeed: 2000,
	  	nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	arrows: false,
	  	draggable: false
		});

		$('.multiple-items').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  dots: true,
		  infinite: true,
		  
		  autoplay: true,
	  	autoplaySpeed: 2000,

		  arrows: true,
		  nextArrow: '<span class="next"><i class="ion-ios-arrow-right"></i></span>',
	  	prevArrow: '<span class="prev"><i class="ion-ios-arrow-left"></i></span>',
	  	draggable: false,
	  	responsive: [
		    {
		      breakpoint: 1125,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 900,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 580,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});

		$('.js-pb_slider_content').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.js-pb_slider_nav',
		  adaptiveHeight: false
		});
		$('.js-pb_slider_nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.js-pb_slider_content',
		  dots: false,
		  centerMode: true,
		  centerPadding: "0px",
		  focusOnSelect: true,
		  arrows: false
		});

		$('.js-pb_slider_content2').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.js-pb_slider_nav2',
		  adaptiveHeight: false
		});
		$('.js-pb_slider_nav2').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.js-pb_slider_content2',
		  dots: false,
		  centerMode: true,
		  centerPadding: "0px",
		  focusOnSelect: true,
		  arrows: false
		});
	};
	slickSliders();

	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		$(".smoothscroll[href^='#'], #probootstrap-navbar ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();
		 	var hash = this.hash;
		 		
		 	$('html, body').animate({

		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });
		});
		$("#probootstrap-navbar ul li a[href^='#']").on('click', function(e){
			if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});

		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();

	var offCanvasNav = function() {
		var toggleNav = $('.js-pb_nav-toggle'),
				offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		if( toggleNav.length > 0 ) {
			toggleNav.click(function(e){
				$(this).toggleClass('active');
				offcanvasNav.addClass('active');
				e.preventDefault();
			});
		}
		offcanvasNav.click(function(e){
			if (offcanvasNav.hasClass('active')) {
				offcanvasNav.removeClass('active');
				toggleNav.removeClass('active');
			}
			e.preventDefault();
		})
	};
	offCanvasNav();

	var ytpPlayer = function() {
		if ($('.ytp_player').length > 0) { 
			$('.ytp_player').mb_YTPlayer();	
		}
	}
	ytpPlayer();


	


});

/////////////////////////////////////////////////////////////////////////////////////////////

jQuery(document).ready(function ($) {
    //check if a .cd-tour-wrapper exists in the DOM - if yes, initialize it
    $('.cd-tour-wrapper').exists() && initTour();

    function initTour() {
        var tourWrapper = $('.cd-tour-wrapper'),
            tourSteps = tourWrapper.children('li'),
            stepsNumber = tourSteps.length,
            coverLayer = $('.cd-cover-layer'),
            tourStepInfo = $('.cd-more-info'),
            tourTrigger = $('#cd-tour-trigger');

        //create the navigation for each step of the tour
        createNavigation(tourSteps, stepsNumber);

        tourTrigger.on('click', function () {
            //start tour
            if (!tourWrapper.hasClass('active')) {
                //in that case, the tour has not been started yet
                tourWrapper.addClass('active');
                showStep(tourSteps.eq(0), coverLayer);
            }
        });

        //change visible step
        tourStepInfo.on('click', '.cd-prev', function (event) {
            //go to prev step - if available
            (!$(event.target).hasClass('inactive')) && changeStep(tourSteps, coverLayer, 'prev');
        });
        tourStepInfo.on('click', '.cd-next', function (event) {
            //go to next step - if availablenext
            (!$(event.target).hasClass('inactive')) && changeStep(tourSteps, coverLayer, 'next');
        });

        //close tour
        tourStepInfo.on('click', '.cd-close', function (event) {
            closeTour(tourSteps, tourWrapper, coverLayer);
        });

        //detect swipe event on mobile - change visible step
        tourStepInfo.on('swiperight', function (event) {
            //go to prev step - if available
            if (!$(this).find('.cd-prev').hasClass('inactive') && viewportSize() == 'mobile') changeStep(tourSteps, coverLayer, 'prev');
        });
        tourStepInfo.on('swipeleft', function (event) {
            //go to next step - if available
            if (!$(this).find('.cd-next').hasClass('inactive') && viewportSize() == 'mobile') changeStep(tourSteps, coverLayer, 'next');
        });

        //keyboard navigation
        $(document).keyup(function (event) {
            if (event.which == '37' && !tourSteps.filter('.is-selected').find('.cd-prev').hasClass('inactive')) {
                changeStep(tourSteps, coverLayer, 'prev');
            } else if (event.which == '39' && !tourSteps.filter('.is-selected').find('.cd-next').hasClass('inactive')) {
                changeStep(tourSteps, coverLayer, 'next');
            } else if (event.which == '27') {
                closeTour(tourSteps, tourWrapper, coverLayer);
            }
        });
    }

    function createNavigation(steps, n) {
        var tourNavigationHtml = '<div class="cd-nav">' + '<ul class="cd-tour-nav"><li><a href="#0" class="cd-next" style="color: #262f36">' + ' &#187;</a></li>' + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + '<li><a href="#0" class="cd-prev" style="color: #262f36">&#171; </a></li></ul></div><a href="#0" class="cd-close">Close</a>';

        steps.each(function (index) {
            var step = $(this),
                stepNumber = index + 1,
                nextClass = (stepNumber < n) ? '' : 'inactive',
                prevClass = (stepNumber == 1) ? 'inactive' : '';
            var nav = $(tourNavigationHtml).find('.cd-next').addClass(nextClass).end().find('.cd-prev').addClass(prevClass).end().find('.cd-actual-step').html(stepNumber).end().appendTo(step.children('.cd-more-info'));
        });
    }

    function showStep(step, layer) {
        step.addClass('is-selected').removeClass('move-left');
        //smoothScroll(step.children('.cd-more-info'));
        showLayer(layer);
    }

    //function smoothScroll(element) {
        //(element.offset().top < $(window).scrollTop()) && $('body,html').animate({ 'scrollTop': element.offset().top }, 100);
        //(element.offset().top + element.height() > $(window).scrollTop() + $(window).height()) && $('body,html').animate({ 'scrollTop': element.offset().top + element.height() - $(window).height() }, 100);
    //}

    function showLayer(layer) {
        layer.addClass('is-visible').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            layer.removeClass('is-visible');
        });
    }

    function changeStep(steps, layer, bool) {
        var visibleStep = steps.filter('.is-selected'),
            delay = (viewportSize() == 'desktop') ? 300 : 0;
        visibleStep.removeClass('is-selected');
        console.log(visibleStep);
        (bool == 'next') && visibleStep.addClass('move-left');

        setTimeout(function () {
            (bool == 'next')
                ? showStep(visibleStep.next(), layer)
                : showStep(visibleStep.prev(), layer);
        }, delay);

        if (visibleStep[0].firstElementChild.innerHTML === "Step 1" && visibleStep[0].className === "cd-single-step move-left") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#section-features").offset().top
            }, 2000);
        }
        else if (visibleStep[0].firstElementChild.innerHTML === "Step 2" && visibleStep[0].className === "cd-single-step") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#firstSection").offset().top
            }, 2000);
        }
        else if (visibleStep[0].firstElementChild.innerHTML === "Step 2" && visibleStep[0].className === "cd-single-step move-left") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#makeTransaction").offset().top
            }, 2000);
        }
        else if (visibleStep[0].firstElementChild.innerHTML === "Step 3" && visibleStep[0].className === "cd-single-step") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#section-features").offset().top
            }, 2000);
        }
        else if (visibleStep[0].firstElementChild.innerHTML === "Step 3" && visibleStep[0].className === "cd-single-step move-left") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#lastTransactions").offset().top
            }, 2000);
        }
        else if (visibleStep[0].firstElementChild.innerHTML === "Step 4" && visibleStep[0].className === "cd-single-step") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#makeTransaction").offset().top
            }, 2000);
        }
    }

    function closeTour(steps, wrapper, layer) {
        steps.removeClass('is-selected move-left');
        wrapper.removeClass('active');
        layer.removeClass('is-visible');
    }

    function viewportSize() {
        /* retrieve the content value of .cd-main::before to check the actua mq */
        return window.getComputedStyle(document.querySelector('.cd-tour-wrapper'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    }
});

//check if an element exists in the DOM
jQuery.fn.exists = function () { return this.length > 0; }