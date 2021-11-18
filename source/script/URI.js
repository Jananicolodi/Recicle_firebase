export class URI {
    static get get() {
        const map = {}
        const arr = window.location.href.split('?')
        if (arr.length === 2) {
            arr[1].split('#')[0].split('&').forEach(item => {
                const a = item.split('=')
                if (a.length === 2) {
                    map[a[0]] = a[1]
                }
            })
        }
        return map
    }

    static get hash() {
        const hash = window.location.hash.slice(1)
        if (hash === '') {
            return null
        }
        else {
            window.location.hash = ''
            return hash
        }
    }

    static get url() {
        return window.location.href.split('#')[0].split('?')[0]
    }

    static get origin() {
        return window.location.origin
    }

    static set self(url) {
        window.location.href = url
    }

    static set blank(url) {
        window.open(url)
    }
}