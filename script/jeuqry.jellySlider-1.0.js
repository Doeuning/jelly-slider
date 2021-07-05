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
                movePosition: el.outerWidth(),
                options: {
                    arrows: true,
                    navigations: true,
                    loop: false,
                    speed: 500,
                    fade: false, 
                    drag: false,
                    vertical: false,
                    view: 1,
                    move: 1,
                    margin: 0,
                },
                mouseEvent: null,
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
                    this.loop(_);
                    this.fade(_);
                    this.dragAble(_);
                    this.multipleSlider(_);
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

                    var slidesLength = _.setOptions.loop ? _.slidesLength + 2 : _.slidesLength;
                    var listWidth = _.this.outerWidth() * slidesLength;

                    if (_.setOptions.view > 1) {
                        _.movePosition = (((_.this.outerWidth() - (_.setOptions.margin * (_.setOptions.view -1)))) / _.setOptions.view) * _.setOptions.move + (_.setOptions.margin * _.setOptions.move);
                        listWidth = _.movePosition * slidesLength;
                    }

                    _.list.css({
                        width: listWidth
                    });
                },
                setArrows: function(_){
                    if (_.setOptions.arrows) {
                        if (_.slidesLength > 1) {
                            var addPrev = _.this.append('<button type="button" class="jelly-prev">이전</button>');
                            var addNext = _.this.append('<button type="button" class="jelly-next">다음</button>');
                            _.btnPrev = addPrev.find('.jelly-prev');
                            _.btnNext = addNext.find('.jelly-next');
                        }
                        _.btnNext.off('click.nextClick').on('click.nextClick', function(e){
                            jelly.moveNext();
                        });
                        _.btnPrev.off('click.prevClick').on('click.prevClick', function(){
                            jelly.movePrev();
                        });
                    }
                },
                moveNext: function(){
                    if (_.setOptions.view > 1) {
                        _.movePosition = (((_.this.outerWidth() - (_.setOptions.margin * (_.setOptions.view -1)))) / _.setOptions.view) * _.setOptions.move + (_.setOptions.margin * _.setOptions.move);
                    }
                    if (_.setOptions.loop) {
                        _.slidesLength =  _.this.find('.jelly-slide').length;
                        if (_.currentSlide <= _.slidesLength - 2) {
                            _.currentSlide += 1;
                            _.currentPosition = _.currentPosition + _.movePosition;
                            _.list.css({
                                transition: _.setOptions.speed + 'ms',
                                transform: 'translateX(-' + _.currentPosition + 'px)'
                            });
                            jelly.checkActive(_, _.currentSlide);
                            if (_.currentSlide > _.slidesLength - 2) {
                                setTimeout(() => {
                                    _.currentSlide = 1;
                                    _.currentPosition = _.movePosition;
                                    _.list.css({
                                        transition: 'none',
                                        transform: 'translateX(-' + _.currentPosition + 'px)'
                                    });
                                    jelly.checkActive(_, _.currentSlide);
                                }, _.setOptions.speed + 10);
                            }
                        }
                    } else {
                        if (_.currentSlide < _.slidesLength - 1) {
                            _.currentSlide += 1;
                            _.currentPosition = _.currentPosition + _.movePosition;
                            _.list.css({
                                transition: _.setOptions.speed + 'ms',
                                transform: 'translateX(-' + _.currentPosition + 'px)'
                            });
                        }
                        jelly.checkActive(_, _.currentSlide);
                    }
                },
                movePrev: function(){
                    if (_.setOptions.view > 1) {
                        _.movePosition = (((_.this.outerWidth() - (_.setOptions.margin * (_.setOptions.view -1)))) / _.setOptions.view) * _.setOptions.move + (_.setOptions.margin * _.setOptions.move);
                    }
                    if (_.setOptions.loop) {
                        _.slidesLength =  _.this.find('.jelly-slide').length;
                        if (_.currentSlide >= 0) {
                            _.currentSlide += -1;
                            _.currentPosition = _.currentPosition - _.movePosition;
                            _.list.css({
                                transition: _.setOptions.speed + 'ms',
                                transform: 'translateX(-' + _.currentPosition + 'px)'
                            });
                            jelly.checkActive(_, _.currentSlide);
                            if (_.currentSlide <= 0) {
                                setTimeout(() => {
                                    _.currentSlide = _.slidesLength - 2;
                                    _.currentPosition = _.currentSlide * _.movePosition;
                                    _.list.css({
                                        transition: 'none',
                                        transform: 'translateX(-' + _.currentPosition + 'px)'
                                    });
                                    jelly.checkActive(_, _.currentSlide);
                                }, _.setOptions.speed + 10);
                            }
                        }
                    } else {
                        if (_.currentSlide > 0) {
                            _.currentSlide += -1;
                            _.currentPosition = _.currentPosition - _.movePosition;
                            _.list.css({
                                transition: _.setOptions.speed + 'ms',
                                transform: 'translateX(-' + _.currentPosition + 'px)'
                            });
                        }
                        jelly.checkActive(_, _.currentSlide);
                    }
                },
                loop: function(_){
                    if (_.setOptions.move > 1) {
                        if (_.setOptions.margin) {
                            _.movePosition = (_.this.outerWidth() - (_.setOptions.margin * (_.setOptions.view -1))) / _.setOptions.view + _.setOptions.margin;
                        } else {
                            _.movePosition = (_.this.outerWidth() / _.setOptions.view);
                        }
                    }
                    if (_.setOptions.loop) {
                        _.currentSlide = 1;
                        _.slides.each(function(i, el){
                            if (i === 0) {
                                $(this).clone().appendTo(_.list).addClass('jelly-cloned').attr('data-jelly-index', _.slidesLength);
                            } else if (i === _.slidesLength -1) {
                                $(this).clone().prependTo(_.list).addClass('jelly-cloned').attr('data-jelly-index', -1);
                            }
                        });
                        _.currentPosition = _.movePosition;
                        _.list.css({
                            transition: 'none',
                            transform: 'translateX(-' + _.currentPosition + 'px)'
                        });
                    }
                },
                checkActive: function(_, curr){
                    _.slides = _.list.find('.jelly-slide');
                    _.slides.each(function(i){
                        if (i === curr) {
                            $(this).addClass('jelly-active');
                        } else {
                            $(this).removeClass('jelly-active');
                        }
                    });
                },
                fade: function(_){
                    if (_.setOptions.fade) {
                        _.this.addClass('jelly-fade');
                        _.slides.css({
                            transition: _.setOptions.speed + 'ms',
                        })
                    }
                },
                dragAble: function(_){
                    if (_.setOptions.drag) {
                        var direction = "",
                            oldx = 0;
                            _.slides.off('mousedown.mouseDownEvent').on('mousedown.mouseDownEvent', function(e){
                                $(e.target).on('mousemove.detectDirection', function(e){
                                    if (e.pageX < oldx) {
                                        direction = "left"
                                    } else if (e.pageX > oldx) {
                                        direction = "right"
                                    }
                                    oldx = e.pageX;
                                })
                            })
                            .on('mouseup.mouseUpEvent', function(e){
                                if (direction === 'left') {
                                    jelly.moveNext(_);
                                } else {
                                    jelly.movePrev(_);
                                }
                                $(e.target).off('mousemove.detectDirection');
                            });
                    }
                },
                multipleSlider: function(_){
                    if (_.setOptions.view <= 1) {
                        _.setOptions.view = 1
                    } else {
                        var slideWidth,
                            slideMargin;
                        if (_.setOptions.margin) {
                            slideMargin = _.setOptions.margin + 'px'
                            slideWidth = (_.this.outerWidth() - (_.setOptions.margin * (_.setOptions.view -1))) / _.setOptions.view;
                        } else {
                            slideWidth = _.this.outerWidth() / _.setOptions.view;
                        }
                        _.list.find('.jelly-slide').css({
                            width: slideWidth + 'px',
                            marginRight: slideMargin,
                        })
                    }
                }
            }
            jelly.init();
        });
    }
})(jQuery);