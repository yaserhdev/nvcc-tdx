(function () {
    if (
        window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1836/home-1' || 
        window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/home/' ||
        window.location.pathname.toLowerCase() === '/sbtdclient/413/portal/1944/home-v3'
    ) {
        var searchBox = document.querySelector('div.pull-left.topLevelSearch.input-group');
        if (searchBox) searchBox.style.display = 'none'
    };

    var signIn = document.querySelector('#btnUserProfileMenu') || document.querySelector('div[title="Sign In"] a');
        if (signIn) {
            signIn.style.cssText = [
                'display: inline-flex',
                'align-items: center',
                'gap: 6px',
                'padding: 7px 16px',
                'background: #046a38',
                'color: #fff !important',
                'font-weight: 600',
                'font-size: 14px',
                'border-radius: 6px',
                'border: none',
                'cursor: pointer',
                'text-decoration: none',
                'transition: background 0.2s ease',
                'white-space: nowrap'
            ].join(';');

            signIn.addEventListener('mouseenter', function () {
                signIn.style.background = '#1c4127';
            });
            signIn.addEventListener('mouseleave', function () {
                signIn.style.background = '#046a38';
            });
        }

        var style = document.createElement('style');
        style.textContent = [
            '@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;700&display=swap");',
            '.pull-right > .dropdown-menu { right: 6px !important; }',
            'div.pull-left.topLevelSearch.input-group { margin-top: 6.5px !important; }',
            '#ctl00_mainNav { border-bottom-width: 4px !important; }',
            '#ctl00_mainNav .navbar-nav > li > a, #ctl00_mainNav .navbar-nav > li > a:visited { font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif !important; font-weight: 600 !important; font-size: 13.5px !important; letter-spacing: 0.02em !important; color: rgba(255,255,255,0.78) !important; border-radius: 5px !important; margin: 9px 1px !important; padding: 7px 12px !important; transition: background 0.15s ease, color 0.15s ease !important; }',
            '#ctl00_mainNav .navbar-nav > li > a:hover, #ctl00_mainNav .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav li a:hover, .navbar-default .navbar-nav li a:focus, .themed.tdbar-button-anchored a:hover, .themed.tdbar-button-anchored a:focus, .tdbar .navbar-nav > li > a:hover, .tdbar .navbar-nav > li > a:focus { background-color: transparent !important; background: transparent !important; }',
            '#ctl00_mainNav .navbar-nav > li:not(.active) > a:hover, #ctl00_mainNav .navbar-nav > li:not(.active) > a:focus { background: rgba(255,255,255,0.12) !important; color: #fff !important; }',
            '#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus, .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:active, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus, .themed.tdbar-button-anchored.active a, .themed.tdbar-button-anchored.active a:hover, .themed.tdbar-button-anchored.active a:focus { background-color: transparent !important; background: transparent !important; font-weight: 600 !important; }',
            '#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus { background: #ffc20d !important; color: #1c4127 !important; font-weight: 700 !important; }',
            '.pull-right > .dropdown-menu { right: 6px !important; }',
            'div.pull-left.topLevelSearch.input-group { margin-top: 6.5px !important; }'
        ].join(' ');
        document.head.appendChild(style);
})();