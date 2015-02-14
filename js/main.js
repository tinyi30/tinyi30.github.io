(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

$(function () {
    $('.mobile-nav-btn').on('click', function ($event) {
        var $this = $(this),
            $mnav = $('.mobile-nav');

        if ($this.hasClass('nav-open')) {
            $mnav.addClass('show');

            var t = $mnav.offset().top;
            $('body').addClass('nav-open');
        }
        else {
            var onAnimEnd = function () {
                $mnav.off('animationend webkitAnimationEnd', onAnimEnd);
                $mnav.removeClass('show');
            };
            $mnav.on('animationend webkitAnimationEnd', onAnimEnd);
            $('body').removeClass('nav-open');
        }
        
        $event.preventDefault();
        return false;
    });
    
    /**
     * 載入 partial 內容
     **/
    $('.js-partial').each(function () {
        var $this = $(this),
            src = $this.data('src');
        
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
