import { URI } from '../../script/URI.js'
import { Dialog } from '../../script/Dialog.js'
const Firestore = Project.firestore()


Firestore.collection(URI.get.item).get().then(arr => {
    let data = ''
    let div
    arr.forEach(i => {
        
        const e = i.data()
       
        data += /*html*/`
         <div class="demo-card-square">
         
         
         <style>
         .demo-list-three {
           width: 100%;
          }
          .demo-card-square{
            text-align:center;
          }
          p{
            font-size: 1.3em;
            color: #009688;
            margin-top: 2%;
          }
          </style>
          
         
          <span class="mdl-list__item-primary-content">
          <p> <b> ${e.titulo} </b></p>
          <iframe src="${e.link}" frameborder="0"></iframe>         
    </span>
   
  

            `
        })
    document.body.querySelector('div.page-content').innerHTML = data
}).catch(e => {
    console.error(e)
    Dialog.alert(e)
})
