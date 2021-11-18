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
         <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <!--  <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">${e.Titulo}</h2>
            </div>
            <div class="mdl-card__supporting-text">${e.Resumo}</div>
            <div class="mdl-card__actions mdl-card--border">
            </div>
           
            </div> -->
            
            <style>
.demo-list-three {
  width: 650px;
}
</style>

<div class="mdl-cell mdl-cell--6-col mdl-card__supporting-text no-padding " style={text-align:center}>
<p class="mdl-cell"><b> Nome do Responsável:</b></p>
<p>${e.nome}</p>
<p class="mdl-cell "><b> Função:</b></p>
<p>${e.Funcao}</p>
<p class="mdl-cell"><b> Telefone:</b></p>

<p>${e.Telefone}</p>

</div>

            `
        })
       
        

    document.body.querySelector('div.page-content').innerHTML = data
}).catch(e => {
    console.error(e)
    Dialog.alert(e)
})
