//Login Variables
let myEmail = document.getElementById("myEmail");
let myPassword = document.getElementById("myPassword");
let loginWarning = document.getElementById("loginWarning");
let loginBtn = document.getElementById("loginBtn");

//Signup Variables
let userName = document.getElementById("Name");
let email = document.getElementById("Email");
let password = document.getElementById("Password");
let signUpWarning = document.getElementById("signupWarning");
let signUpBtn = document.getElementById("signupBtn");

if (JSON.parse(localStorage.getItem("LoginData")) == null) {
    
    var loginData = [];

} else {
    
    loginData = JSON.parse(localStorage.getItem("LoginData"));
}


function signUp() {

    if (userName.value && email.value && password.value !== null)
    {
        var signUpData = {
            Name: userName.value,
            Email: email.value,
            Password: password.value
        };

        loginData.push(signUpData);
        localStorage.setItem("LoginData", JSON.stringify(loginData));
        console.log(loginData)
        signUpWarning.innerHTML = "Success";
        signUpWarning.classList.remove("text-danger");
        signUpWarning.classList.add("text-success");
        clearForm()
    }
    else
    {
        signUpWarning.innerHTML = "All inputs is required";
        signUpWarning.classList.remove("text-success");
        signUpWarning.classList.add("text-danger");
    }
}

if (signUpBtn !== null){signUpBtn.addEventListener("click", signUp)}

function clearForm() {
    userName.value = "";
    email.value = "";
    password.value = "";
}

function logIn() {
    for (var i = 0; i < loginData.length; i++) {
        if (myEmail.value == loginData[i].Email && myPassword.value == loginData[i].Password) {

            location.href = "index.html"
        } 
        else 
        {
            loginWarning.classList.add("text-danger")
            loginWarning.innerHTML = "Please Check Your Email and Password"
        }
    }
}

if (loginBtn !== null){loginBtn.addEventListener("click", logIn)}