/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * @Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function ($) {
  "use strict";

  var DISQUS_NAME = 'underbyte';

  $(document).ready(function () {
    /*
     * Search
     */
    $("#ub-search-input").ghostHunter({
      results: "#ub-search-results",
      onKeyUp: true,
      before: function () {
        $('#ub-search-container').show();
      },
      info_template: '<span class="ub-search-results-amount">Number of posts found: {{amount}}</span><span class="ub-search-clear-toggle"><i class="fa fa-close"></i></span>',
      result_template : '<li class="list-group-item"><a href="{{link}}"><span class="ub-search-results-title">{{title}}</span></a></li>'
    });

    $("#ub-search").on('click', '.ub-search-clear-toggle', function(e) {
      e.preventDefault();
      $("#ub-search-input").val('');
      $("#ub-search-container").hide();
    });

    $(".container").fitVids();

    function casperFullImg() {
      $("img").each( function() {
        var contentWidth = $(".post-content").outerWidth(); // Width of the content
        var imageWidth = $(this)[0].naturalWidth; // Original image resolution

        if (imageWidth >= contentWidth) {
          $(this).addClass('full-img');
        } else {
          $(this).removeClass('full-img');
        }
      });
    }

    casperFullImg();
    $(window).smartresize(casperFullImg);

    /*
     * initialize disqus
     */
    $('#disqus_thread a').on('click', function () {
      DISQUS.load(DISQUS_NAME);
      return false;
    });

    /*
     * initialize tooltips
     */
    $('[data-toggle=tooltip]').tooltip();

    /*
     * initialize popovers
     */
    $('[data-toggle=popover]').popover();
  });

}(jQuery));