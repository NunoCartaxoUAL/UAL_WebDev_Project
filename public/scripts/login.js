function loadPopup(){
    document.getElementById('showLogin').style.opacity = 1;
    document.getElementById('showLogin').style.top = "37%"
}

function closePopup(){
    document.getElementById('showLogin').style.opacity = 0 
    document.getElementById('showLogin').style.top = "-150%"
}

function loadSignUp(){
    
}


// SCRIPTS

async function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        username: email,
        password: password,
    };
    const response = await makeRequest("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
    switch (response.status) {
        case 201:
            {
                // login ok
                document.getElementById('showLogin').style.opacity = 0
                document.getElementById("login").style.display = "none"
                document.getElementById("signout").style.display = "block"
                document.getElementById("cart").style.display = "block"
                localStorage.setItem("token", json.token);
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                break;
            }
        case 401:
            {
                // Password errada
                document.getElementById("pMsg").innerHTML = json.msg;
                document.getElementById("password").value = "";
                break;
            }
        case 404:
            {
                // Utilizador não encontrado
                console.log(json.msg);
                document.getElementById("pMsg").innerHTML = json.msg;
                document.getElementById("password").value = "";
                break;
            }
    }
}

function logout() {
    document.getElementById("login").style.display = "block"
    document.getElementById("signout").style.display = "none"
    document.getElementById("cart").style.display = "none"
    localStorage.removeItem("token");



}

function signIn() {
    document.getElementById("divLogin").style.display = "block";
    document.getElementById("legenda").innerText = "signIn";
    document.getElementById("btnLogin").style.display = "none";
    document.getElementById("btnRegistar").style.display = "inline";
}

async function sendSignIn() {
    const nome = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const user = {
        username: nome,
        password: senha,
    };
    const response = await makeRequest("http://localhost:8002/registar", {
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
}

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (err) {
        console.log(err);
    }
}
