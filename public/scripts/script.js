function loadCart(){
    document.getElementById('showCart').style.opacity = 1;
    document.getElementById('showCart').style.top = "47%";
}

function closeCart(){
    document.getElementById('showCart').style.opacity = 0;
    document.getElementById('showCart').style.top = "-150%";
}

// EDIT

function loadEdit(){
    document.getElementById('showEdit')
}


// SEARCH 

function loadSearch(){
    document.getElementById('showSearch')
}

//  COOKIES

function setCookies(productId, name){
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = productId + "=" + (name || "")  + expires + "; path=/"
}

function getCookies(productId){
    var productIDEQ = productId + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(roductIDEQ) == 0) return c.substring(productIDEQ.length,c.length);
    }
    return null;
}



