var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = {};
function onYouTubeIframeAPIReady() {
    player._sliderLiveMobile = new YT.Player($('#section-live .player-mobile')[0], {
        height: '390',
        width: '640',
        playerVars: { rel: 0, showinfo : 0 }
    });
}

;(function($){
    $.fn.isOnScreen = function(p){
        var $this   = $(this),
            $window = $(window);

        var windowHeight    = $(window).height();
        var scrollTop       = $(window).scrollTop();
        var top             = $(this).offset().top;
        var height          = $(this).height();

        return ((scrollTop + windowHeight - p) >= top && scrollTop < (top + height));
    };
})(jQuery);

var IsMobile = {
    ANDROID:    navigator.userAgent.match(/Android/i),
    BLACKBERRY: navigator.userAgent.match(/BlackBerry/i),
    IOS:        navigator.userAgent.match(/iPhone|iPad|iPod/i),
    OPERA:      navigator.userAgent.match(/Opera Mini/i),
    WINDOWS:    navigator.userAgent.match(/IEMobile/i)
};

IsMobile.any = function() {
    return (IsMobile.ANDROID || IsMobile.BLACKBERRY || IsMobile.IOS || IsMobile.OPERA || IsMobile.WINDOWS) || window.innerWidth < 1024;
};

!(function(window, document, undefined){
    'use strict';

    var $window = $(window),
        wW = $window.width(),
        wH = $window.height();

    svg4everybody();

    if(wW < 768){
        $('.section').height(wH-$('#header').height());

        if(wH < 500){
             $('.section').css('height', 500);
        }
    }

    $(window).on('resize', function(){
        if(wW < 768){
            $('.section').height(wH-$('#header').height());

            if(wH < 500){
                 $('.section').css('height', 500);
            }
        }
    });

    if (IsMobile.any()) {
        $('body').addClass('mobile');
    } else {
        $('body').addClass('desktop');
    }

    $('#header .menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile-links').toggleClass('show');
        $('#header').toggleClass('show-menu');
        $('body').toggleClass('overflow');
    });

    Pace.on('done', function(){
        var overlayPace = $('.overlay-pace');

        if ($(window).width() > 767){
            $('main').fullpage({
                touchSensitivity: 20,
                scrollingSpeed: 1000,
                paddingTop: 110,
                afterLoad: function(anchorLink, index){
                    if(anchorLink === 'footer'){
                        $('.box-btn-scroll a').addClass('prev');
                    } else {
                        var $this = $('[data-anchor="'+anchorLink+'"]');
                        $this.prev().find('[data-animated]').removeAttr('data-animated');
                        $this.next().find('[data-animated]').removeAttr('data-animated');

                        moveMenuBorder(anchorLink);

                        if (wW > 767) {
                            Animator.onScroll();
                        }

                        $('.box-btn-scroll a').removeClass('prev');
                    }
                },
                normalScrollElements: '.modal .scroll-text'
            });
        }

        TweenLite.to(overlayPace, .3, {opacity: 0, onComplete: function(){
            TweenLite.set(overlayPace, {display: 'none'});
        }});
    });

    $('.btn-virtual-experience').on('click', function(e){
        e.preventDefault();
        $(this).closest('.cover').fadeOut();

        $(this).closest('section').addClass('active-virtual');
    });

    $('#section-virtual-experience .btn-close').on('click', function(e){
        $(this).closest('section').removeClass('active-virtual');
        $(this).closest('section').find('.cover').fadeIn();
    });

    $('.slider-cars-desktop').slick({
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.container-dots .dots'),
        nextArrow : $('#section-cars .slick-next'),
        prevArrow : $('#section-cars .slick-prev'),
        responsive: [
          {
              breakpoint: 1009,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
          }
        ]
    });

    $('.slider-cars-mobile').slick({
        slidesToShow: 1,
        infinite: true,
        slidesToScroll: 1,
        dots: false
    });

    var slideLive = $('.slider-videos-live').slick({
        slidesToShow: 9,
        infinite: true,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        nextArrow : $('#section-live .slick-next'),
        prevArrow : $('#section-live .slick-prev'),
        responsive: [
          {
              breakpoint: 1009,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
          }
        ]
    });

    slideLive.on('afterChange', function(slick, currentSlide){
        $('.slider-videos-live').find('.slick-slide').removeClass('left');
        $('.slider-videos-live').find('.slick-active').last().addClass('left');
        $('.slider-videos-live').find('.slick-active').last().prev().addClass('left');
    });

    setTimeout(function(){
        $('.slider-videos-live').find('.slick-slide').removeClass('left');
        $('.slider-videos-live').find('.slick-active').last().addClass('left');
        $('.slider-videos-live').find('.slick-active').last().prev().addClass('left');
    }, 1000);



    $('.slider-attractions').slick({
        infinite: true,
        arrows: true,
        dots: false,
        asNavFor: '.slider-attractions-text'
    });

    $('.slider-attractions-text').slick({
        infinite: true,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.slider-attractions'
    });

    $('[data-modal-open]').on('click.moldalOpen', function(){
        player._modalPlayer = new YT.Player($('.modal #player-modal')[0], {
            height: '390',
            width: '640',
            playerVars: { rel: 0, showinfo : 0 }
        });

        player._modalPlayerCarMo = new YT.Player($('.modal #player-modal-mobile')[0], {
            height: '390',
            width: '640',
            playerVars: { rel: 0, showinfo : 0 }
        });

        player._modalPlayerInnovations = new YT.Player($('.modal.modal-innovations .player-video')[0], {
            height: '390',
            width: '640',
            playerVars: { rel: 0, showinfo : 0 }
        });

        $('.modal.modal-innovations .slider-innovations-desktop .slider-container').slick({
            slidesToShow: 3,
            infinite: true,
            slidesToScroll: 1,
            dots: true,
            arrows: true
        });

        $('.modal.modal-innovations .slider-innovations-mobile .slider-container').slick({
            slidesToShow: 1,
            infinite: true,
            slidesToScroll: 1,
            dots: true,
            arrows: false
        });

        $('.modal .slider-images-modal').slick({
            slidesToShow: 5,
            infinite: true,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            responsive: [
                {
                  breakpoint: 1009,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
              }
            ]
        });

        $('.modal .content-slider-mobile .slider').slick({
            slidesToShow: 2,
            infinite: true,
            slidesToScroll: 1,
            dots: true,
            arrows: false
        });
    });

    $('body').on('click', '.modal.modal-innovations .slider-innovations .item', function(){
        var $this = $(this);

        if($this[0].hasAttribute('data-video-id')){
            var videoId = $this.attr('data-video-id');
            var title = $this.find('p').text();
            var desc = $this.attr('data-desc');

            player._modalPlayerInnovations.cueVideoById(videoId);
            player._modalPlayerInnovations.playVideo();
            $('.modal.modal-innovations .txt-slider').fadeOut(function(){
                $('.modal.modal-innovations .container-player h3').text(title);
                $('.modal.modal-innovations .container-player p').text(desc);
                $('.modal.modal-innovations .container-player').fadeIn();
            });
            $('.modal.modal-innovations .btn-back').fadeIn();
        }
    });

    $('body').on('click', '.modal .slider-images-modal .item', function(){
        var $this = $(this);

        $('.modal .slider-images-modal .item').removeClass('active');
        $this.addClass('active');

        if($this[0].hasAttribute('data-video-id')){
            var videoId = $(this).attr('data-video-id');
            player._modalPlayer.cueVideoById(videoId);
            player._modalPlayer.playVideo();
            $('.modal #player-modal').fadeIn();
        } else {
            //$('.modal .media-stage').addClass('loading');
            var imgUrl = $(this).attr('data-img-url');
            $('.modal .media-stage .img-container').css('background-image', 'url(' + imgUrl + ')');

            $('.modal #player-modal').fadeOut(function(){
                player._modalPlayer.stopVideo();
            });
        }
    });

    $('body').on('click', '.modal-cars .slider .item', function(){
        var $this = $(this);

        $('.modal .modal-cars .slider .item').removeClass('active');
        $this.addClass('active');

        if($this[0].hasAttribute('data-video-id')){
            var videoId = $(this).attr('data-video-id');
            player._modalPlayerCarMo.cueVideoById(videoId);
            player._modalPlayerCarMo.playVideo();
            $('.modal #player-modal-mobile').fadeIn();
            $('.modal-cars .content-slider-mobile .media-stage .img-container').hide();
        } else {
            //$('.modal .media-stage').addClass('loading');
            var imgUrl = $(this).attr('data-img-url');
            $('.modal-cars .content-slider-mobile .media-stage .img-container').fadeIn();
            $('.modal-cars .content-slider-mobile .media-stage .img-container').css('background-image', 'url(' + imgUrl + ')');

            $('.modal #player-modal-mobile').fadeOut(function(){
                player._modalPlayerCarMo.stopVideo();
            });
        }
    });

     $('body').on('click', '.modal .btn-datasheet', function(e){
        e.preventDefault();
        $('.modal .slider').fadeOut(function(){
            $('.modal .datasheet').fadeIn();
        });

        $('.modal .btn-back').fadeIn().addClass('btn-back-datasheet');
     });

     $('body').on('click', '.modal .btn-back-datasheet', function(e){
        e.preventDefault();
        $('.modal .datasheet').fadeOut(function(){
            $('.modal .slider').fadeIn();
        });

        $('.modal .btn-back').fadeOut();
     });

     $('body').on('click', '.modal.modal-innovations .btn-back', function(e){
        e.preventDefault();
        $('.modal.modal-innovations .container-player').fadeOut(function(){
            $('.modal.modal-innovations .txt-slider').fadeIn();
            player._modalPlayerInnovations.stopVideo();
        });
        $('.modal.modal-innovations .btn-back').fadeOut();
     });

    $('.btn-view-more').on('click', function(e){
        e.preventDefault();

        $(this).parent().toggleClass('closed');

        $('.slider-videos').slick('reinit');
    });

    $('body').on('click', '.content-live .btn-play', function(){
        var $this = $(this);
        var videoUrl = $this.attr('data-video-url');

        $.alert.show($('.template-modal .content-modal [data-modal="player-ao-vivo"]').html(), {classes: ['modal-player'], callback: function(){
            $('.modal .player-video-aovivo').attr('src', videoUrl);
        }});
    });

    $('body').on('click', '.slider-videos-live .item', function(){
        var $this = $(this);
        var videoId = $this.find('a').attr('data-video-id');
        var title = $this.find('h2').text();
        var desc = $this.find('p').text();

        $('[data-modal="player-video"]').find('h3').text(title);
        $('[data-modal="player-video"]').find('p').text(desc);

        $.alert.show($('.template-modal .content-modal [data-modal="player-video"]').html(), {classes: ['modal-player']});

        player._modalPlayerSingle = new YT.Player($('.modal.modal-player .player-video')[0], {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: { rel: 0, showinfo : 0 },
            events: {
                'onReady': function(){
                    player._modalPlayerSingle.playVideo();
                }
            }
        });
    });

    $('#header .menu a').on('click', function(e){
        var section = $(this).attr('href').replace('#', '');

        moveMenuBorder(section);
    });

    $('.box-btn-scroll a').on('click', function(e){
        e.preventDefault();

        if($(this).hasClass('prev')){
            $.fn.fullpage.moveTo('ao-vivo', 0);
        } else {
           $.fn.fullpage.moveSectionDown();
        }
    });

    $(window).on('resize orientationchange', function(){
        var activeMenu = $('#header .menu .active a').attr('href').replace('#', '');
        moveMenuBorder(activeMenu);
    });


    if($('.mobile-item-slider').is(':visible')){
        $('#section-live .center-container').slick({
            infinite: true,
            arrows: true,
            dots: false
        });
    }

    $('.mobile-item-slider .btn-play').on('click', function(){
        var $this = $(this);
        var videoId = $this.attr('data-video-id');
        var title = $this.closest('.txt').find('h2').text();
        var desc = $this.closest('.txt').find('p').text()

        $('.container-player h2').text(title);
        $('.container-player p').text(desc);
        $('.container-player').fadeIn();
        player._sliderLiveMobile.cueVideoById(videoId);
        player._sliderLiveMobile.playVideo();
    });

    $('#section-live .container-player .btn-close').on('click', function(e){
        e.preventDefault();

        $(this).closest('.container-player').fadeOut();
        player._sliderLiveMobile.stopVideo();
    });

    $('body').on('click', '.menu-mobile-links a', function(e){
        var $this = $(this);
        var anchor = $this.attr('href').replace('#', '');
        var pos = $('[data-anchor="'+anchor+'"]').offset().top - $('#header .top').height();

        e.preventDefault();
        TweenLite.to($window, 2, {scrollTo: {y: pos, autoKill: false}, ease: Power2.easeOut, onComplete: function(){
            $('.menu-mobile-links').removeClass('show');
            $('.box-menu-mobile button').removeClass('is-active');
        }});
    });

    $('#header .top a').on('click', function(e){
        e.preventDefault();
        if($('.mobile').length > 0) {
            TweenLite.to($window, 2, {scrollTo: {y: 0, autoKill: false}, ease: Power2.easeOut, onComplete: function(){
                $('.menu-mobile-links').removeClass('show');
                $('.box-menu-mobile button').removeClass('is-active');
            }});
        } else {
            $.fn.fullpage.moveTo(1, 0);
        }
    });

    $('#section-live .more-content').on('click', function(e){
        var $this = $(this);
        var parent = $this.closest('.section');
        var pos = $this.closest('.section').next().offset().top - $('#header .top').height();
        TweenLite.to($window, 2, {scrollTo: {y: pos, autoKill: false}, ease: Power2.easeOut, onComplete: function(){
        }});
        e.preventDefault();
    });

    $('body').on('click', '.modal-cars .nav-tabs a', function(e){
        var $this = $(this);
        var dataTab = $this.attr('data-tab');

        e.preventDefault();
        $('.modal-cars .nav-tabs li').removeClass('active');
        $this.closest('li').toggleClass('active');
        $this.closest('.txt-info').find('.content [data-tab]').hide();
        $this.closest('.txt-info').find('.content [data-tab="'+dataTab+'"]').fadeIn();
    });

})(window, document, undefined);

function moveMenuBorder(activeSection){
    var menuItem = $('.menu a[href="#'+activeSection+'"]').closest('li');

    if(menuItem.length > 0){
        var borderPosition = menuItem.position().left;

        $('.border').css('left', borderPosition+'px');
        $('#header .menu li').removeClass('active');
        menuItem.addClass('active');
    }
}
