(function(){
    $.fn.jellySlider = function(options){
        this.each(function(){
            var el = $(this);
            var _ = {
                this: el,
                list: el.find('.jelly-list'),
                slides: el.find('.jelly-slide'),
                slidesLength: el.find('.jelly-slide').not('.jelly-cloned').length,
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
                    this.setIndex(_);
                    this.setWidth(_);
                    this.setArrows(_);
                    this.active(_);
                    _.currentSlide = 0;
                    // _.slides.each(function(){
                    //     if ($(this).data('jelly-index') === _.currentSlide) {
                    //         _.currentPosition = $(this).position().left;
                    //     }
                    // })
                },
                setIndex: function(_){
                    _.slides.each(function(i){
                        $(this).attr('data-jelly-index', i);
                    })
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
                    if (_.setOptions.loop) {
                        if (_.currentSlide == _.slidesLength) {
                            setTimeout(() => {
                                _.currentSlide = 0;
                                _.list.css({
                                    transition: 'none',
                                    transform: 'translateX(-' + _.currentPosition + 'px)'
                                });
                            }, _.setOptions.speed + 10);
                        } else if (_.currentSlide < _.slidesLength) {
                            _.currentSlide += 1;
                        }
                    } else {
                        if (_.currentSlide < _.slidesLength - 1) {
                            _.currentSlide += 1;
                        }
                    }
                    jelly.active(_);
                },
                movePrev: function(){
                    if (_.setOptions.loop) {
                        if (_.currentSlide == -1) {
                            setTimeout(() => {
                                _.currentSlide = _.slidesLength -1;
                                _.list.css({
                                    transition: 'none',
                                    transform: 'translateX(-' + _.currentPosition + 'px)'
                                });
                            }, _.setOptions.speed + 10);
                        } else if (_.currentSlide >= 0) {
                            _.currentSlide += -1;
                        }
                    } else {
                        if (_.currentSlide > 0) {
                            _.currentSlide += -1;
                        }
                    }
                    jelly.active(_);
                },
                loop: function(_){
                    
                },
                active: function(_){
                    _.slides.each(function(i){
                        if ($(this).data('jelly-index') === _.currentSlide) {
                            $(this).addClass('jelly-active');
                            _.currentPosition = $(this).position().left;
                            
                            if (_.setOptions.loop) {
                                var clonedSlide = _.list.find('.jelly-cloned');
                                clonedSlide.remove();
                                if ($(_.slides[0]).hasClass('jelly-active')) {
                                    clonedSlide = $(_.slides[_.slidesLength -1]).clone();
                                    clonedSlide.prependTo(_.list).addClass('jelly-cloned').attr('data-jelly-index', -1);
                                    _.currentPosition = _.currentPosition - _.this.outerWidth();
                                } else if ($(_.slides[_.slidesLength -1]).hasClass('jelly-active')) {
                                    clonedSlide = $(_.slides[0]).clone();
                                    clonedSlide.appendTo(_.list).addClass('jelly-cloned').attr('data-jelly-index', _.slidesLength);
                                } else {
                                    setTimeout(() => {
                                        clonedSlide.remove();
                                    }, _.setOptions.speed + 10);
                                }

                                if ($(this).prevAll().hasClass('jelly-cloned')) {
                                    _.currentPosition = $(this).position().left;
                                    console.log(_.currentPosition);
                                } else if ($(this).nextAll().hasClass('jelly-cloned')) {
                                    console.log('다음에 있음');
                                    _.currentPosition = $(this).position().left;
                                } else {
                                    _.currentPosition = $(this).position().left; 
                                }
                            }
                        } else if (_.currentSlide === -1) {
                            console.log(_.currentSlide);
                            // $(this)[_.slidesLength].addClass('jelly-active');
                        }
                    });
                    _.list.css({
                        transition: _.setOptions.speed + 'ms',
                        transform: 'translateX(-' + _.currentPosition + 'px)'
                    });
                }
            }
            jelly.init();
        });
    }
})(jQuery);