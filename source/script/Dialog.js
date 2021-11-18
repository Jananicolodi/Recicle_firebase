import { Layout } from './Layout.js'

/**
 * COMPLEMENTO PARA O MDL
 */
class _Dialog {
    constructor() {
        this._dialog = null
        this._title = null
        this._content = null
        this._action = null
        this._onClose = null
        this._onYesOption = null
        Layout.onLoad(() => {
            this._dialog = document.body.querySelector('dialog.mdl-dialog')
            if (this._dialog) {
                this._title = this._dialog.querySelector('.mdl-dialog__title')
                this._content = this._dialog.querySelector('.mdl-dialog__content')
                this._action = this._dialog.querySelector('.mdl-dialog__actions')
            }
        })
        Layout.onClick(() => {
            this._dialog.style.display = 'none'
            if (typeof this._onClose === 'function') {
                this._onClose()
            }
        }, 'button.dialogclose', 'dialogclose')
        Layout.onClick(() => {
            this._dialog.style.display = 'none'
            if (typeof this._onYesOption === 'function') {
                this._onYesOption()
            }
        }, 'button.dialogyes', 'dialogyes')
    }

    alert(msg, title = 'Atenção') {
        return new Promise((resolve, reject) => {
            if (
                typeof msg === 'string' &&
                typeof title === 'string' &&
                this._dialog !== null &&
                this._title !== null &&
                this._content !== null &&
                this._action !== null
            ) {
                this._dialog.style.display = 'block'
                this._title.innerHTML = title
                this._content.innerHTML = msg
                this._action.innerHTML = /*html*/`<button type="button" class="mdl-button dialogclose">OK</button>`
                this._onClose = () => {
                    resolve(null)
                }
            }
            else {
                reject(null)
            }
        })
    }

    report(msg, title = 'Falha') {
        return this.alert(msg, title)
    }

    confirm(msg, title, yes = 'Sim', no = 'Não') {
        return new Promise((resolve, reject) => {
            if (
                typeof msg === 'string' &&
                typeof title === 'string' &&
                typeof yes === 'string' &&
                typeof no === 'string' &&
                this._dialog !== null &&
                this._title !== null &&
                this._content !== null &&
                this._action !== null
            ) {
                this._dialog.style.display = 'block'
                this._title.innerHTML = title
                this._content.innerHTML = msg
                this._action.innerHTML = /*html*/`
                    <button type="button" class="mdl-button dialogyes">${yes}</button>
                    <button type="button" class="mdl-button dialogclose">${no}</button>`
                this._onClose = () => {
                    console.warn('not option dialog')
                    resolve(false)
                }
                this._onYesOption = () => {
                    console.warn('yes option dialog')
                    resolve(true)
                }
            }
            else {
                console.error('bad implementation dialog')
                reject(null)
            }
        })
    }
}

Layout.onDomLoad(e => {
    e.body += /*html*/`
        <dialog
            class="mdl-dialog"
            style="z-index: 1;"
        >
            <h4 class="mdl-dialog__title"></h4>
            <div class="mdl-dialog__content"></div>
            <div class="mdl-dialog__actions"></div>
        </dialog>`
}, null, 'dialog')

export const Dialog = new _Dialog()