export function MP(ak) {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
            // script.src = `http://api.map.baidu.com/api?v=2.0&ak=kS8nvop6lF8DBC1OfEScKSKUDEEAKhnm&callback=init`
        script.src = `http://api.map.baidu.com/api?v=2.0&ak=eIytITfwWc84qq9b4hfdVQz8Zh7bLgfj&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
}