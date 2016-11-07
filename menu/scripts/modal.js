!(function(window, document, undefined){
    'use strict';

    $('[data-modal-open]').on('click.moldalOpen', function(){
        var classes = [];
        if($(this).attr('data-modal-classes')){
            classes = $(this).attr('data-modal-classes').split(" ");
        }
        $.alert.show($('.template-modal .content-modal [data-modal="'+$(this).attr('data-modal-open')+'"]').html(), {classes: classes});
    });

    $('.close-modal').on('click', function(){
        $.alert.hide();
    });
})(window, document, undefined);

(function($){
    $.modal = {
        to: null,
        config: {
            close: true,
            classes: [],
            callback: null
        },
        show: function(content, config) {
            var config = $.extend({}, this.config, config);

            $('.modal').remove();

            var html = [
                '<div class="modal '+config.classes.join(' ')+'">',
                    '<div class="overlay-modal"></div>',
                    content,
                '</div>'
            ];

            this.$modal = $(html.join('')).appendTo('body:eq(0)');
            var $modal = this.$modal;

            TweenLite.set($modal, {display:'block', onComplete: function(){
                TweenLite.set($modal.find('.item-modal'), {display:'none'});
                TweenLite.from($modal.find('.overlay-modal'), .2, {opacity: 0, ease: Linear.easeNone});
                TweenLite.from($modal.find('.box-content-modal'), .4, {marginTop: -50, opacity: 0, ease: Power2.easeOut, onComplete: function(){
                    if ($.isFunction(config.callback)) {
                        config.callback();
                    }
                }});
            }});

            if (config.close) {
                $('.overlay-modal').on('click', function() { $.modal.hide(); });

                if (typeof config.close == 'number') {
                    this.to = setTimeout(this.hide.bind(this), config.close);
                }
            }
        },
        hide: function() {
            var $modal = this.$modal;
            TweenLite.to($modal, .2, {opacity: 0, onComplete: function(){ $modal.remove(); }});
        }
    };

    $.loading = {
        show: function() {
            var html = [
                '<div class="box-content-modal">',
                    '<div class="content-modal">',
                        '<div class="scroll-modal">',
                            '<div class="content-wait-generating-gif">',
                                '<h3><img src="../images/wait.gif" alt="Aguarde..."/></h3>',
                                '<p>Seu GIF está sendo gerado</p>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];

            $.modal.show(html.join(''), {close: false});
        },
        hide: function() {
            $.modal.hide();
        }
    };

    $.alert = {
        show: function (content, config) { // callback, classes and close
            var defaults = {classes: [], close: true};
            var config = $.extend({}, defaults, config);

            var html = [
                '<div class="box-content-modal">',
                    '<a href="javascript:void(0);" class="btn-close btn-close-modal"><span></span></a>',
                    '<a href="javascript:void(0);" class="btn-back"><span></span> Voltar</a>',
                    '<div class="content-modal">',
                        content,
                    '</div>',
                '</div>'
            ];

            $.modal.show(html.join(''), config);
            $('.btn-close-modal').on('click', function(){
                $.alert.hide();
            });
        },
        hide: function() {
            $.modal.hide();
        }
    };

    $.confirm = {
        show: function (content, btns, fn) {
            btns = btns.reverse();

            var htmlBtns = '';
            $.each(btns, function(i, btn){
                htmlBtns += '<button class="' + (btn.classes ? btn.classes : '') + '" style="' + (btn.css ? btn.css : '') + '">' + btn.value + '</button>';
            })

            var html = [
                '<div class="box-content-modal">',
                    '<a href="javascript:void(0);" class="btn-close btn-close-modal">X</a>',
                    '<div class="content-modal">',
                        '<div class="scroll-modal">',
                            content,
                            '<div class="modal-btns">' + htmlBtns + '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];

            $.modal.show(html.join(''));
            $('.modal-btns button').on('click', function(){
                var value = $(this).html();
                $.confirm.hide();
                fn(value);
            });
        },
        hide: function() {
            $.modal.hide();
            $('.modal.modal-innovations .btn-back').fadeOut();
        }
    };
})(jQuery);
