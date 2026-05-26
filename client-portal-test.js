console.log("Hello world!");

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('This function is active!');
        if (window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1') {
            document.querySelector('div.pull-left.topLevelSearch.input-group').style.display = 'none';
        }
    });
})();
