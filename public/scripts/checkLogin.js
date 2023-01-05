// TODO if(user session is exists) dont redirect

function checkLogin(){
    //alert(userAutenticado)
    //return typeof userAutenticado == null;

    //var logged = 
    //return localStorage.getItem("logged") != null;
    return true
}

function redirectToLogin(){
    if (!checkLogin()){
        alert("user not loged in. Please login.")
        window.location.href = "login.html";
    }
}
function redirectToIndex(){
    if (!checkLogin()) {
        alert("user already logged in")
        window.location.href = "index.html";
    }
}
