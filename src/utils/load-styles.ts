export function loadStyles(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
            resolve();
        };
        xhr.onerror = reject;
        xhr.open('get', url);
        xhr.send();
    });
}