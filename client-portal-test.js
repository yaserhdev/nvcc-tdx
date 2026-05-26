console.log("Hello world!");

(function ($) {
    function init() {
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        };
    };
    $(init);
})();
