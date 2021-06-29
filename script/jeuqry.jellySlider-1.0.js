(function(){
    $.fn.jellySlider = function(options){
        this.each(function(){
            var el = $(this);
            var _ = {
                this: el,
                list: el.find('.jelly-list'),
                slides: el.find('.jelly-slide'),
                currentSlide: 0,
                currentPosition: 0,
                options: {
                    arrows: true,
                    navigations: true,
                    loop: true,
                    speed: 500,
                    fade: false, 
                    vertical: false,
                },
                btnPrev: el.find('.jelly-prev').length ? el.find('.jelly-prev') : null,
                btnNext: el.find('.jelly-next').length ? el.find('.jelly-next') : null,
                init: function(){
                    _.this.addClass('jelly-activated');
                    _.list.css({
                        transition: _.options.speed + 'ms',
                    });
                    $(_.slides[_.currentSlide]).addClass('jelly-active');
                }
            };
            _.init();
            
            setOptions = $.extend({}, _.options, options);
    

            // 함수
            var jellyFnc = {
                init: function(){
                    this.setWidth(_);
                    this.setArrows(_);
                },
                setWidth: function(_){
                    _.list.css({
                        width: _.this.outerWidth() * _.slides.length
                    });
                    _.slides.css({
                        width: _.this.outerWidth()
                    });
                },
                setArrows: function(_){
                    if (setOptions.arrows) {
                        if (_.slides.length > 1) {
                            var addPrev = _.this.append('<button type="button" class="jelly-prev">이전</button>');
                            var addNext = _.this.append('<button type="button" class="jelly-next">다음</button>');
                            _.btnPrev = addPrev.find('.jelly-prev');
                            _.btnNext = addNext.find('.jelly-next');
                        }
                        _.btnNext.on('click', function(e){
                            jellyFnc.moveNext();
                        });
                        _.btnPrev.on('click', function(){
                            jellyFnc.movePrev();
                        });
                    }
                },
                moveNext: function(){
                    if (_.currentSlide < _.slides.length - 1) {
                        _.currentSlide += 1;
                        _.currentPosition = _.currentPosition + _.this.outerWidth();
                        _.list.css({
                            transform: 'translateX(-' + _.currentPosition + 'px)'
                        });
                    }
        
                    _.slides.each(function(i){
                        if (i === _.currentSlide) {
                            $(this).addClass('jelly-active').siblings().removeClass('jelly-active');
                        }
                    })
                },
                movePrev: function(){
                    if (_.currentSlide > 0) {
                        _.currentSlide += -1;
                        _.currentPosition = _.currentPosition - _.this.outerWidth();
                        _.list.css({
                            transform: 'translateX(-' + _.currentPosition + 'px)'
                        });
                    }
        
                    _.slides.each(function(i){
                        if (i === _.currentSlide) {
                            $(this).addClass('jelly-active').siblings().removeClass('jelly-active');
                        }
                    })
                }
            }
            jellyFnc.init();
        });
    }
})(jQuery);