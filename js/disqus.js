(function (window, DISQUS) {
  DISQUS['load'] = function (sitename) {
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + sitename + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  };
})(window, (DISQUS = {} || DISQUS));
