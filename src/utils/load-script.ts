export function loadScript(url, async) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = url;
        if (typeof async !== 'undefined') {
            script.async = async;
        }

        script.onerror = reject;
        script.onload = resolve;
        document.head.appendChild(script);
    });
}