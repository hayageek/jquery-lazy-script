/*!
 * jQuery Lazy script
 * version: 1.0.0
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 Ravishanker Kusuma
 * http://hayageek.com/
 */
(function ($) {
    jQuery.cachedScript = function (url, cb) {
        var options = {
            dataType: "script",
            cache: true,
            url: url,
            complete: function (jqXHR, textStatus) {
                cb.call(this);
            }
        };
        return jQuery.ajax(options);
    };

    $.lazyscript = function (options) {
        // This is the easiest way to have default options.
        var s = $.extend({
            // These are the defaults.
            type: false, //scroll,hover,click,visible,delay
            id: false,
            time: 1000,
            partial: true,
            scripts: [],
            success: false
        }, options);
        var loaded = false;

        if(s.type) {
            switch(s.type) {
            case 'scroll':
                $(window).scroll(handleScroll);
                break;
            case 'hover':
                $("#" + s.id).hover(handleHover);
                break;
            case 'click':
                $("#" + s.id).click(handleHover);
                break;
            case 'visible':
                $(window).scroll(handleVisible);
                break;
            case 'delay':
                if(s.time)
                    setTimeout(handleTimeOut, s.time);
                break;
            default:
                alert("Invalid lazy script type");
                break;
            }

        }

        function removeEventHandler(elem, eventType, handler) {
            if(elem.removeEventListener)
                elem.removeEventListener(eventType, handler, false);
            if(elem.detachEvent)
                elem.detachEvent('on' + eventType, handler);
        }

        function handleTimeOut() {
            if(!loaded) {
                loaded = true;
                loadScripts();
            }
        }

        function handleHover() {
            if(!loaded) {
                loaded = true;
                setTimeout(loadScripts, 5);
                removeEventHandler($("#" + s.id).get(0), 'hover', handleHover);
            }
        }

        function handleClick() {
            if(!loaded) {
                loaded = true;
                setTimeout(loadScripts, 5);
                removeEventHandler($("#" + s.id).get(0), 'click', handleHover);

            }
        }

        function handleScroll() {
            if(!loaded) {
                loaded = true;
                setTimeout(loadScripts, 5);
                removeEventHandler(window, 'scroll', handleScroll);

            }

        }


        function handleVisible() {
            var $t = $("#" + s.id);
            t = $t.get(0);
            $w = $(window);
            viewTop = $w.scrollTop();
            viewBottom = viewTop + $w.height();
            _top = $t.offset().top;
            _bottom = _top + $t.height();
            compareTop = s.partial === true ? _bottom : _top;
            compareBottom = s.partial === true ? _top : _bottom;
            if(!loaded) {
                if((compareBottom <= viewBottom) && (compareTop >= viewTop)) {
                    loaded = true;
                    removeEventHandler(window, 'scroll', handleVisible);
                    setTimeout(loadScripts, 5);
                }
            }
        }

        function loadScripts() {
            var tCount = s.scripts.length;
            var lCount = 0;
            for(var i = 0; i < tCount; i++) {
                jQuery.cachedScript(s.scripts[i], function () {
                    lCount++;
                });
            }

            (function checkScriptsLoaded() {
                if(lCount == tCount) {
                    if(s.success)
                        s.success.call(this);
                } else window.setTimeout(checkScriptsLoaded, 20);
            })();

        }

    }
}(jQuery));