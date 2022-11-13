// TODO hardcoded user
// check password text box if==user -> start session

function loadLogin(){
    clearPage()
    document.getElementById('content').innerHTML+=`
    <div class="center">
        <h1>Loginup</h1>
        <form name="loginForm" onSubmit="return login();" action="index.html" method="post">
            <div class="txt_field">
                <input type="text" name="usr" required>
                <span></span>
                <label>Username</label>
            </div>
            <div class="txt_field">
                <input type="password" name="pwd" required>
                <span></span>
                <label>Password</label>
            </div>
            <input type="submit" value="login" >
            <div class="signup_link">
                Not a member? <a href="javascript:loadSignup()">Signup</a>
            </div>
        </form>
    </div>`;
    
};

/*

<div class="signup_link">
                Not a member? <a href="javascript:loadSignup()">Signup</a>
            </div>

*/ 
function loadSignup(){
    clearPage()
    document.getElementById('content').innerHTML+=`
    <div class="center">
        <h1>Signup</h1>
        <form name="signupForm">
            <div class="txt_field">
                <input type="text" name="usr" required>
                <span></span>
                <label>Username</label>
            </div>
            <div class="txt_field">
                <input type="password" name="pwd" required>
                <span></span>
                <label>Password</label>
            </div>
            <input type="submit" value="signup" onClick="signup();" >
        </form>
    </div>`;
};

function clearPage(){
    document.getElementById('content').innerHTML="";
};

/*function login() {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";
    document.getElementById("main").style.display = "block";
}
function logout() {
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "inline";
    document.getElementById("main").style.display = "none";
}*/

function signup() {
    let users=[];
    if(!localStorage.getItem("users")==null){
        users=localStorage.getItem("users");
    }
    let user = new Array[2]; 
    var un = document.signupForm.usr.value;
    var pw = document.signupForm.pwd.value;
    user[0] = un;
    user[1] = pw;
    users.push(user);
    
    
    localStorage.setItem("users", users);
}

function login() {
    let user = document.loginForm.usr.value;
    var pass = document.loginForm.pwd.value;
    let users=[];
    users=localStorage.getItem("users");

    for (us of users) {
        if (us.name == user && us.pass == pass) {
            
            localStorage.setItem("userAuth", us)
            localStorage.setItem("logged", true);
            return true;

        }
    }

    
}

function redirectHome(){
    clearPage();
    window.location.href = "index.html";
}

