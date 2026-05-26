console.log("Hello world!");
console.log('Testing');
console.log('jQuery:', window.jQuery);


(function ($) {
    function init() {
        console.log("Init works!");
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        };
    };
    $(init);
})(window.jQuery);
