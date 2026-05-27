(function ($) {
    function init() {
        console.log('Init function invoked!');
        console.log('Hello!');
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        };
    };
    $(init);
})(window.jQuery);
