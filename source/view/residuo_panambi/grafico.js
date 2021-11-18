import {cor,residuo} from '../residuo_panambi/script';
for(let i=0;i<cor.length;){
  console.log(cor[i])
  i++
}
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
          
        dados.residuo],
      datasets: [
        {
        label: '# of Votes',
        data: [e.porcentagem],
        backgroundColor: [
      dados.cor
        ],
        borderColor: [
           dados.cor
        ],
        borderWidth: 1
    }
  ]
},
options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
});