console.log("Hello world!");

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/home') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        }
    });
})();
