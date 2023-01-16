// TODO if(user session is exists) dont redirect

function checkLogin(){
    if(localStorage.getItem("token")==null || localStorage.getItem("priv")!= 1){
        window.location.href="public"
    }
}


