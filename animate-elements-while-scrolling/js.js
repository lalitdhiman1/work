$(function() {
  var $elems, anim_elm, fullheight, winheight;
  $elems = $('.block');
  winheight = $(window).height();
  fullheight = $(document).height();
  anim_elm = function() {
    var wintop;
    wintop = $(window).scrollTop();
    $elems.each(function() {
      var $elm, topcoords;
      $elm = $(this);
      if ($elm.hasClass('animated')) {
        return true;
      }
      topcoords = $elm.offset().top;
      if (wintop > topcoords - (winheight * .75)) {
        $elm.addClass('animated');
      }
    });
  };
  $(window).scroll(function() {
    anim_elm();
  });
});