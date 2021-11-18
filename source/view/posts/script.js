import { URI } from '../../script/URI.js'
import { Dialog } from '../../script/Dialog.js'
const Firestore = Project.firestore()


Firestore.collection(URI.get.item).get().then(arr => {
    let data = ''
    let div
    arr.forEach(i => {
        
        const e = i.data()
        e.Titulo == 
        undefined ? e.Titulo : e.link 
        data += /*html*/`
         
            `
        })
        

    document.body.querySelector('div.page-content').innerHTML = data
}).catch(e => {
    console.error(e)
    Dialog.alert(e)
})
