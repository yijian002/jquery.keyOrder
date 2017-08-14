/*
    jquery.keyOrder.js
    @author Vic 
    https://github.com/yijian002/jquery.keyOrder
*/

(function($) {

    'use strict';

    $.keyOrder = function(opts) {
        var settings = {
            element: [], // {key_event: 'keydown', key_code: 13, callback: $.noop, focusback: &.noop, blurback: &.noop, is_stop_event: true}
            key_code: 13,
            key_event: 'keydown',
            is_stop_event: false // stopPropagation | preventDefault
        };

        $.extend(settings, opts || {});

        var app = {
            getContainer: function(cont) {
                var $cont = typeof cont === 'string' ? $(cont) : cont;
                if (!$cont.length) {
                    console.log('Not found the cont', cont);
                }

                return $cont;
            },
            getTagName: function(el) {
                if (!el || !el.length) {
                    return '';
                }

                return el[0].tagName;
            },
            bind: function(el, next_el) {
                var _this = this;

                el = this.getContainer(el);
                next_el = next_el ? this.getContainer(next_el) : null;

                var key_event = el.key_event || settings.key_event,
                    key_code = el.key_code || settings.key_code,
                    is_stop_event = typeof el.is_stop_event !== 'undefined' ? el.is_stop_event : settings.is_stop_event;

                el.on(key_event, function(e) {
                    if (e.keyCode !== key_code) {
                        return;
                    }

                    if (el.callback) {
                        el.callback(el);
                    }

                    if (next_el) {
                        next_el.trigger('focus');

                        var tag_name = _this.getTagName(next_el);
                        if (tag_name === 'INPUT') {
                            next_el[0].selectionStart = 0;
                            next_el[0].selectionEnd = next_el[0].value.length;
                        }
                    }

                    if (is_stop_event) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });

                if (el.blurback) {
                    el.on('blur', function() {
                        el.blurback(el);
                    });
                }

                if (next_el && next_el.focusback) {
                    next_el.on('focus', function() {
                        next_el.focusback(next_el);
                    });
                }
            },
            initEl: function() {
                var next_el;
                for (var i = 0, len = settings.element.length; i < len; i++) {
                    next_el = (i + 1) >= len ? null : settings.element[i + 1];

                    this.bind(settings.element[i], next_el);
                }
            },
            init: function() {
                if (!settings.element.length) {
                    console.error('Not found the elements.');
                    return;
                }

                this.initEl();

                delete this.init;
            }
        };

        app.init();
    };

}($ || jQuery));
