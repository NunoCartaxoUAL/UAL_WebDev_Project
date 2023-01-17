
function clearCart(){
    var allCookies = document.cookie.split(';');
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();
    fillCart();
}
function removeFromCart(id){
    var cart = document.cookie.split(';')[0].split("=")[1].split("/");
    clearCart()
    onlyone=true
    newcart=[]
    cart.forEach(n => {
        if(n==id && onlyone){
            onlyone=false
        }else{
            newcart.push(n)
        }
    });
    newcart.forEach(p => {
        addToCart(p)
    });
    fillCart()
}   
async function fillCart(){
    document.getElementById('cartTbody').innerHTML="";
    if(document.cookie!=""){
        var cart = document.cookie.split(';')[0].split("=")[1].split("/");

        if(cart.length!=0){
            sum=0;
            await cart.forEach( async id => {
                
                response = await makeRequest('https://localhost:8080/getProd/'+id, {
                    method: "GET",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                
                json= await response.json()
                document.getElementById('cartTbody').innerHTML+=`
                <tr class="productI">
                    <td class="w-25">
                        <img src="`+json["image"]+`" class="img-fluid img-thumbnail">
                    </td>
                    <td><h4><b>`+json["name"]+`</h4></b><h5>`+json["type"]+`</h5></td>
                    <td><br><br>`+json["price"]+`€</td>
                    <td><br><br>
                        <button onclick='removeFromCart(`+json["id"]+`)' class="btn btn-danger btn-sm">
                            <i class="fa fa-times"></i>
                        </button>
                    </td>
                </tr>
                `

                sum+=parseInt(json["price"], 10)
                document.getElementById("total").innerHTML= 'Total:'+sum+'€';
            });
            
        }
    }else{
        document.getElementById("total").innerHTML= 'Total:0€';
    }
    
    
}
async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}


function loadCart(){
    document.getElementById('showCart').style.opacity = 1;
    document.getElementById('showCart').style.top = "47%";
    fillCart();
}

function closeCart(){
    document.getElementById('showCart').style.opacity = 0;
    document.getElementById('showCart').style.top = "-150%";
}
function addToCart(prodId){
    if(localStorage.getItem("token")!=null && localStorage.getItem("priv") == 0){
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (30*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
        if(document.cookie==""){
            document.cookie ="prodIds = "+ prodId +";"+ expires + "; path=/"
        }else{
            document.cookie +="\/"+prodId+"";
        }
        
    }else if(localStorage.getItem("token")==null){
        loadPopup()
        document.getElementById("pMsg").innerHTML = "Please Login before using the cart";
    }else{
        alert("this feature doesnt work in admin mode!")
    }
    
    
}

