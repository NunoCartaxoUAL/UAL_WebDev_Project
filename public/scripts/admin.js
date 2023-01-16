async function loadProds(){
    clearPage()
    text="";
    text+=`<div class="form">
                <div class="formElement">
                    <label for="name" style="color: white;">name</label>
                    <input type="text" id="name" placeholder="Enter name">
                </div>
                <div class="formElement">
                    <label for="image link" style="color: white;">image link</label>
                    <input type="text" id="image" placeholder="Enter image link">
                </div>
                <div class="formElement">
                    <label for="type" style="color: white;">type</label>
                    <input type="text" id="type" placeholder="Enter product type">
                </div>
                <div class="formElement">
                    <label for="price" style="color: white;">price</label>
                    <input type="text" id="price" placeholder="Enter product price">€
                </div>
                <center><div id="pMsg" style="color: white;"></div></center>
                <div class="formElement">
                    <button onclick="registerProd()" id ="signUpBtn" style="font-family: Arial, Helvetica, sans-serif;" >add new Product</button>
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
                <td>`+n["image"]+`</td>
                <td>`+n["type"]+`</td>
                <td>`+n["price"]+`€</td>
                <td><button OnClick='deleteProd("`+n["name"]+`")'>x</button></td>
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

    switch (response.status) {
        case 201:
            {
                document.getElementById("pMsg").innerHTML = "done";
                break;
            }
    }

    loadProds();
}
async function deleteProd(name) {
    const response = await makeRequest('https://localhost:8080/deleteProd/'+name, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    loadProds();
}

async function loadUsers(){
    clearPage()
    text="";
    text+=`<div class="form">
                <div class="formElement">
                    <label for="email" style="color: white;">username</label>
                    <input type="text" id="email" placeholder="Enter Email">
                </div>
                <div class="formElement">
                    <label for="password" style="color: white;">Password</label>
                    <input type="password" id="password" placeholder="Enter Password">
                </div>
                <div class="formElement">
                    <label for="type" style="color: white;">type</label>
                    <input type="text" id="type" placeholder="Enter user type">
                </div>
                <center><div id="pMsg" style="color: white;"></div></center>
                <div class="formElement">
                    <button onclick="registerUser()" id ="signUpBtn" style="font-family: Arial, Helvetica, sans-serif;" >add new user</button>
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
                <td><button OnClick='deleteUser("`+n["username"]+`")'>x</button></td>
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
    switch (response.status) {
        case 409:
            {
                // Utilizador já existe
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
        case 400:
            {
                // Password inaceitável
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
        case 201:
            {
                // Utilizador registado
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
    }
    loadUsers();
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