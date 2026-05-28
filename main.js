(function ($) {
    function init() {
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1' || window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/home') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        };
    };
    $(init);
})(window.jQuery);
