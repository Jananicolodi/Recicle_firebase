export class Observer {
    constructor() {
        this._observer = []
    }

    subscribe(event, filter = null, name = null) {
        if (typeof event === 'function') {
            this._observer.push({
                'id': name,
                'event': event,
                'filter': filter
            })
            return true
        }
        return false
    }

    unsubscribe(name) {
        this._observer.filter(e => {
            if (e.id !== name) {
                return e
            }
        })
    }

    get clear() {
        this._observer = []
        return undefined
    }

    fire(event) {
        if (this._observer.length > 0) {
            if (!event.path) {
                this._patch(event)
            }
            this._observer.forEach(o => {
                if (o.filter === null) {
                    o.event(event)
                }
                else if (typeof o.filter === 'function') {
                    if (o.filter(event) === true) {
                        o.event(event)
                    }
                }
                else if (typeof o.filter === 'string') {
                    this._filterPatch(event, o)
                }
                else if (typeof o.filter === 'object') {
                    this._filterPatchElement(event, o)
                }
            })
        }
    }

    // caso nao seja chrome
    _patch(e) {
        e.path = []
        e.path.push(e.target)
        let i = e.target
        for (; ;) {
            if (i.parentElement) {
                i = i.parentElement
                e.path.push(i)
            }
            else {
                break
            }
        }
    }

    /**
     * String contendo id(#) ou class(.) para buscas no array path
     * Sting no filtro e recomendado em cliques em tabelas, icones svg ou
     * layout custonizado por framework
     * @param {*} e 
     * @param {*} o 
     */
    _filterPatch(e, o) {
        if (o.filter.length > 1) {
            if (o.filter[0] === '#') {
                const id = o.filter.slice(1)
                for (let i = 0; i < e.path.length; i++) {
                    if (e.path[i].id === id) {
                        o.event(e)
                        break
                    }
                }
            }
            else if (o.filter[0] === '.') {
                const c = o.filter.slice(1)
                for (let i = 0; i < e.path.length; i++) {
                    if (e.path[i].classList) {
                        if (e.path[i].classList.contains(c)) {
                            o.event(e)
                            break
                        }
                    }
                }
            }
            else {
                let arr = o.filter.split('#')
                if (arr.length === 2) {
                    const tag = arr[0].toUpperCase()
                    const id = arr[1]
                    for (let i = 0; i < e.path.length; i++) {
                        if (e.path[i].tagName === tag && e.path[i].id === id) {
                            o.event(e)
                            break
                        }
                    }
                }
                else {
                    arr = o.filter.split('.')
                    if (arr.length === 2) {
                        const tag = arr[0].toUpperCase()
                        const c = arr[1]
                        for (let i = 0; i < e.path.length; i++) {
                            if (e.path[i].classList) {
                                if (e.path[i].tagName === tag && e.path[i].classList.contains(c)) {
                                    o.event(e)
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    _filterPatchElement(e, o) {
        for (let i = 0; i < e.path.length; i++) {
            if (e.path[i] === o.filter) {
                o.event(e)
                break
            }
        }
    }
}