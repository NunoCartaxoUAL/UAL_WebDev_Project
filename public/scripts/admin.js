async function loadProds(msg = ""){
    clearPage()
    text="";
    text+=`<div class="formA">
                <div class="formElementA">
                    <label for="name" style="color: white;">Name</label>
                    <input type="text" id="name" placeholder="Enter name">
                </div>
                <div class="formElementA">
                    <label for="image link" style="color: white;">Link</label>
                    <input type="text" id="image" placeholder="Enter image link">
                </div>
                <div class="formElementA">
                    <label for="type" style="color: white;">Type</label>
                    <input type="text" id="type" placeholder="Enter product type">
                </div>
                <div class="formElementA">
                    <label for="price" style="color: white;">Price</label>
                    <input type="text" id="price" placeholder="Enter product price">
                </div>
                <center><div id="pMsg1" style="color: white;"> `+msg+` </div></center>
                <div class="formElementA">
                    <button class ="buyButton2" role="button" onclick="registerProd()" id ="signUpBtn" style="font-family: Arial, Helvetica, sans-serif;" >add new Product</button>
                </div>
            </div>`;
    const prod = await makeRequest("https://localhost:8080/products", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await prod.json();
    text+=`
    <table class="admin">
        <tr>
            <th>ID</th>
            <th>name</th>
            <th>img</th>
            <th>type</th>
            <th>price</th>
            <th>remove</th>
        </tr>`
    json.forEach(n => {
        if(n!=null){
            text+=`
            <tr>
                <td>`+n["id"]+`</td>
                <td>`+n["name"]+`</td>
                <td class="specialCell">`+n["image"]+`</td>
                <td>`+n["type"]+`</td>
                <td>`+n["price"]+`€</td>
                <td><button onclick='deleteProd("`+n["name"]+`")'><i class="fa-solid fa-trash-can"></i></button></td>
            </tr
        </table>
        `
        }
    })
    document.getElementById('content').innerHTML=text;

}
async function registerProd() {
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;
    const prod = {
        name: name,
        image: image,
        type: type,
        price:price
    };

    const response = await makeRequest("https://localhost:8080/registerProd", {
        method: "POST",
        body: JSON.stringify(prod),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    json = await response.json();
    loadProds(json.msg);
}

async function deleteProd(name) {
    const response = await makeRequest('https://localhost:8080/deleteProd/'+name, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    loadProds();
}

async function loadUsers(msg = ""){
    clearPage()
    text="";
    text+=`<div class="formA">
                <div class="formElementA">
                    <label class = "labelA" for="email" style="color: white;">Username</label>
                    <input type="text" id="email" placeholder="Enter Email">
                </div>
                <div class="formElementA">
                    <label class = "labelA" for="password" style="color: white;">Password </label>
                    <input type="password" id="password" placeholder="Enter Password">
                </div>
                <div class="formElementA">
                    <label class = "labelA" for="type" style="color: white;">Type</label>
                    <input type="text" id="type" placeholder="Enter user type">
                </div>
                <center><div id="pMsg" style="color: white;"> `+msg+`</div></center>
                <div class="formElementA">
                    <button class ="buyButton" onclick="registerUser()" id ="signUpBtn" style="font-family: Arial, Helvetica, sans-serif;" >Add New User</button>
                </div>
            </div>`;
    const prod = await makeRequest("https://localhost:8080/listUsers", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await prod.json();
    text+=`
    <table class="admin">
        <tr>
            <th>username</th>
            <th>password</th>
            <th>type</th>
            <th>delete</th>
        </tr>`
    json.forEach(n => {
        if(n["type"]==0){
            n["type"]="user"
        }else{
            n["type"]="admin"
        }
        text+=`
            <tr>
                <td>`+n["username"]+`</td>
                <td>`+n["password"]+`</td>
                <td>`+n["type"]+`</td>
                <td><button OnClick='deleteUser("`+n["username"]+`")'><i class="fa-solid fa-trash-can"></i></button></td>
            </tr
        </table>
        `
    
    })
    document.getElementById('content').innerHTML=text;


}


function clearPage(){
    document.getElementById('content').innerHTML="";
};

async function registerUser() {
    const nome = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    type = document.getElementById("type").value;
    if(type.toLowerCase()=="admin"){
        type=1
    }else{
        type=0
    }
    const user = {
        username: nome,
        password: senha,
        type: type,
    };
    const response = await makeRequest("https://localhost:8080/signUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
    loadUsers(json.msg);
}


async function deleteUser(username) {
    const response = await makeRequest('https://localhost:8080/removeUser/'+username, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    loadUsers();
}
async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}


