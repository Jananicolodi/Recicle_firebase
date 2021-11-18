firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      alert('logado')
    } else {
        alert('não logado')
      // No user is signed in.
    }
  });
function login(){
    var email = document.getElementsById('inputEmail').value
    var password =  document.getElementsById('inputPassword').value
    alert('achou')
    firebase.auth().signInWithEmailAndPassword(email, password)
    alert("funfou")
    window.location.href("http://www.devmedia.com.br")
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("não funfou")
    });
}