(function() {
    console.log('Loader function invoked!');
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/yaserhdev/nvcc-tdx/main.js?v=' + Date.now();
    document.head.appendChild(script);
})();
