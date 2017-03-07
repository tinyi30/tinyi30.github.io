(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

$(function () {
    $('.mobile-nav-btn').on('click', function ($event) {
        var ANIM_NAME_OPEN = 'fadeInDown',
            ANIM_NAME_CLOSE = 'fadeOutUp';

        var $this = $(this),
            $mnav = $('.mobile-nav'),
            $body = $('body');

        var onCloseAnimEnd = function ($e) {
            $mnav.off('animationend webkitAnimationEnd', onCloseAnimEnd);

            if ($e.originalEvent.animationName === ANIM_NAME_CLOSE) {
                $mnav.removeClass('show');
            }
        };

        if ($this.hasClass('nav-open')) {
            if (!$body.hasClass('nav-open')) {
                /**
                 * 打開選單
                 */
                $mnav.addClass('show');

                var t = $mnav.offset().top;
                $body.addClass('nav-open');
            }
        }
        else {
            if ($body.hasClass('nav-open')) {
                /**
                 * 關閉選單
                 */
                $mnav.on('animationend webkitAnimationEnd', onCloseAnimEnd);
                $body.removeClass('nav-open');
            }
        }
        
        $event.preventDefault();
        return false;
    });
    
    /**
     * 載入 partial 內容
     **/
    $('.js-partial').each(function () {
        var $this = $(this),
            src = $this.data('src') + '.html';
        
        if (!src) {
            return;
        }
        
        $.get(src).then(function (html) {
            $this.html(html);
        });
    });
    
    /**
     * 作品圖片們
     **/
    $('.js-work-gallery').each(function () {
        var $this = $(this),
            data = $this.data(),
            prefix = data.prefix,
            count = Number(data.count) || 0,
            ext = data.ext || 'jpg',
            $frag, src;
        
        $frag = $(document.createDocumentFragment());
        for (var i = 1; i <= count; i++) {
            src = prefix + i + '.' + ext;
            $frag.append($('<img>', {
                src: src
            }));
        }
        
        $this.append($frag);
    });
});
