(function(){
    $.fn.jellySlider = function(options){
        this.each(function(){
            var el = $(this);
            var _ = {
                this: el,
                list: el.find('.jelly-list'),
                slides: el.find('.jelly-slide'),
                slidesLength: el.find('.jelly-slide').length,
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
                setOptions: null,
                init: function(){
                    _.setOptions = $.extend({}, _.options, options);
                    _.this.addClass('jelly-activated');
                    _.list.css({
                        transition: _.setOptions.speed + 'ms',
                    });
                    $(_.slides[_.currentSlide]).addClass('jelly-active');
                }
            };
            _.init();
            
    

            // 함수
            var jelly = {
                init: function(){
                    this.setWidth(_);
                    this.setArrows(_);
                    this.loop(_);
                },
                setWidth: function(_){
                    _.slides.css({
                        width: _.this.outerWidth()
                    });
                    if (_.setOptions.loop) {
                        _.list.css({
                            width: _.this.outerWidth() * (_.slidesLength + 2)
                        }); 
                    } else {
                        _.list.css({
                            width: _.this.outerWidth() * _.slidesLength
                        });
                    }
                },
                setArrows: function(_){
                    if (_.setOptions.arrows) {
                        if (_.slidesLength > 1) {
                            var addPrev = _.this.append('<button type="button" class="jelly-prev">이전</button>');
                            var addNext = _.this.append('<button type="button" class="jelly-next">다음</button>');
                            _.btnPrev = addPrev.find('.jelly-prev');
                            _.btnNext = addNext.find('.jelly-next');
                        }
                        _.btnNext.on('click', function(e){
                            jelly.moveNext();
                        });
                        _.btnPrev.on('click', function(){
                            jelly.movePrev();
                        });
                    }
                },
                moveNext: function(){
                    jelly.loop(_);

                    if (_.currentSlide < _.slidesLength - 1) {
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
                },
                loop: function(_){
                    if (_.setOptions.loop) {
                        console.log('loop');
                        // _.slides.each(function(i, el){
                        //     if (_.currentSlide == _.slidesLength - 1) {
                        //         $(this).clone().appendTo('.jelly-list');
                        //     }
                        // });
                    }
                }
            }
            jelly.init();
        });
    }
})(jQuery);