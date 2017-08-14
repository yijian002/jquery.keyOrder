/*
    jquery.keyOrder.js
    @author Vic 
    https://github.com/yijian002/jquery.keyOrder
*/

(function($) {

    'use strict';

    $.keyOrder = function(opts) {
        var settings = {
            element: [], // {key_event: 'keydown', key_code: 13, callback: $.noop, focusback: &.noop}
            key_code: 13,
            key_event: 'keydown'
        };

        $.extend(settings, opts || {});

        var app = {
            getContainer: function(cont) {
                var $cont = typeof cont === 'string' ? $(cont) : cont;
                if(!$cont.length) {
                    console.log('Not found the cont', cont);
                }

                return $cont;
            },
            bind: function(el, next_el) {
                el = this.getContainer(el);
                next_el = next_el ? this.getContainer(next_el) : null;

                var key_event = el.key_event || settings.key_event,
                    key_code = el.key_code || settings.key_code;

                el.on(key_event, function(e) {
                    if(e.keyCode !== key_code) {
                        return;
                    }

                    if(el.callback) {
                        el.callback(el);
                    }

                    if(next_el) {
                        next_el.trigger('focus');
                    }

                    if(next_el && next_el.focusback) {
                        next_el.focusback(next_el);
                    }
                });
            },
            initEl: function() {
                var next_el;
                for (var i = 0, len = settings.element.length; i < len; i++) {
                    next_el = (i + 1) >= len ? null : settings.element[i+1];

                    this.bind(settings.element[i], next_el);
                }
            },
            init: function() {
                if(! settings.element.length) {
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
