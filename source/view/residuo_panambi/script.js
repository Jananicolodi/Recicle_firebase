import { URI } from '../../script/URI.js'
import { Dialog } from '../../script/Dialog.js'
const Firestore = Project.firestore()
let cor =[]
let ano =[]
let residuo =[]


Firestore.collection(URI.get.item).get().then(arr => {
    let data = ''
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
          <p> <b> ${e.ano} </b></p>
    </span>
   
  

            `
            // console.log(e)
            cor.push(e.cor)
            residuo.push(e.residuo)
            
          })
          
          console.log(residuo)
          document.body.querySelector('div.page-content').innerHTML = data
        }).catch(e => {
          console.error(e)
          Dialog.alert(e)
        })
        
        export{cor,residuo}