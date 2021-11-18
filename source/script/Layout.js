import { Observer } from './Observer.js'

class DocumentClick extends Observer {
    constructor() {
        super()
        document.body.addEventListener('click', e => {
            this.fire(e)
        })
    }
}

class DocumentLoad extends Observer {
    constructor() {
        super()
        document.addEventListener("DOMContentLoaded", e => {
            e.head = ''
            e.body = ''
            this.fire(e)
            if (e.head) {
                document.head.innerHTML += e.head
            }
            if (e.body) {
                document.body.innerHTML += e.body
            }
            this.clear
            console.warn('Document Loaded')
        })
    }
}

class WindowLoad extends Observer {
    constructor() {
        super()
        window.addEventListener('load', e => {
            e.head = ''
            e.body = ''
            this.fire(e)
            if (e.head) {
                document.head.innerHTML += e.head
            }
            if (e.body) {
                document.body.innerHTML += e.body
            }
            this.clear
            console.warn('Window Loaded')
        })
    }
}

const clickobserver = new DocumentClick()
const domobserver = new DocumentLoad()
const windowobserver = new WindowLoad()

export class Layout {
    static inflate(map, igonre = []) {
        if (map !== null && typeof map === 'object') {
            for (const name in map) {
                if (!this._isIgnore(name, igonre)) {
                    const tag = document.body.querySelector(`#${name}`)
                    if (!tag) {
                        console.warn(`tag is undefined for inflate`)
                    }
                    else {
                        const value = map[name]
                        if (value === null || value === undefined || value === NaN) {
                            tag.innerHTML = ''
                            console.warn(`value ${name} is ${value} for inflate`)
                        }
                        else {
                            tag.innerHTML = value
                        }
                    }
                }
            }
        }
    }

    /**
     * EVENTO DE CLIQUE
     * 
     * @param {*} event
     * @param {*} name
     * @param {*} filter
     */
    static onClick(event, filter = null, name = null) {
        clickobserver.subscribe(event, filter, name)
    }

    static unsubscribeClick(name) {
        clickobserver.unsubscribe(name)
    }

    /**
     * EVENTO DE CARREGAMENTO DO DOM
     * 
     * @param {*} event
     * @param {*} name
     * @param {*} filter
     */
    static onDomLoad(event, filter = null, name = null) {
        domobserver.subscribe(event, filter, name)
    }

    static unsubscribeDomLoad(name) {
        domobserver.unsubscribe(name)
    }

    /**
     * EVENTO DE CARREGAMENTO DA PAGINA
     * 
     * @param {*} event
     * @param {*} name
     * @param {*} filter
     */
    static onLoad(event, filter = null, name = null) {
        windowobserver.subscribe(event, filter, name)
    }

    static unsubscribeLoad(name) {
        windowobserver.unsubscribe(name)
    }

    static repeat(event, wait) {
        if (typeof event === 'function' && typeof wait === 'number') {
            if (wait > 0) {
                try {
                    event()
                    setInterval(() => {
                        event()
                    }, wait)
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    static _isIgnore(name, list) {
        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] === name) {
                    return true
                }
            }
        }
        return false
    }
}