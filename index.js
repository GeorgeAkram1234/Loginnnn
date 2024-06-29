var userMail = document.getElementById('userMail');
var userPass = document.getElementById('userPass');
var userNameRegister = document.getElementById('userNameRegister');
var userEmailRegister = document.getElementById('userEmailRegister');
var userPassRegister = document.getElementById('userPassRegister');
var btnRegister = document.getElementById('btnRegister');
var btnLogin = document.getElementById('btnLogin');
var logoutBtn = document.getElementById('logoutBtn');
var wrongMsg = document.getElementById('wrongMsg');
var welcomeUser = document.getElementById('welcome');
var userName = localStorage.getItem('loginUser');

var usersList = [];

if (localStorage.getItem('users') == null) {
    usersList = [];

} else {
    usersList = JSON.parse(localStorage.getItem('users'));
}

btnRegister?.addEventListener('click', function register() {
    if (check() == false && exists() == false) {
        var data = {
            name: userNameRegister.value,
            email: userEmailRegister.value,
            pass: userPassRegister.value
        }
        usersList.push(data);
        localStorage.setItem('users', JSON.stringify(usersList));
        clearForm();
        window.location.href = 'login.html'
    }
})

function validateInputs(element) {
    if (element.value == '') {
        element.classList.remove('is-valid', 'is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return false
    }
    var regex = {
        userNameRegister: /^[a-z]{2,6}$/,
        userEmailRegister: /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/,
        userPassRegister: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,

        userMail: /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/,
        userPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
    } else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none', 'd-block')
    }
}
userNameRegister?.addEventListener('input', function () {
    validateInputs(userNameRegister)
})
userEmailRegister?.addEventListener('input', function () {
    validateInputs(userEmailRegister)
})
userPassRegister?.addEventListener('input', function () {
    validateInputs(userPassRegister)
})
userMail?.addEventListener('input', function () {
    validateInputs(userMail)
})
userPass?.addEventListener('input', function () {
    validateInputs(userPass)
})

function exists() {
    if (JSON.parse(localStorage.getItem('users')) !== null) {
        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].email == userEmailRegister.value) {
                alert('Email already exists');
                return true
            } else {
                return false
            }
        }
    } else {
        return false
    }

}
function check() {
    if (userEmailRegister.value == "" || userNameRegister.value == "" || userPassRegister.value == "") {
        alert('Please fill all fields');
        return true;
    } else {
        return false;
    }
}
function clearForm() {
    userNameRegister.value = '';
    userEmailRegister.value = '';
    userPassRegister.value = '';
}

btnLogin?.addEventListener('click', function login() {

    var userFound = false
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email == userMail.value && usersList[i].pass == userPass.value) {
            localStorage.setItem('loginUser', usersList[i].name)
            window.location.href = 'home.html';
            userFound = true
        }
    }
    if (userFound == false) {
        wrongMsg.classList.replace('d-none', 'd-block')
    }
    else {
        wrongMsg.classList.replace('d-block', 'd-none')
    }
})

function welcome() {
    welcomeUser.innerHTML = `Welcome ${userName}`
}
window.addEventListener('load' , welcome)

logoutBtn?.addEventListener('click', function logout() {
    localStorage.removeItem('loginUser')
    window.location.href = 'login.html'
})


document.forms[0]?.addEventListener('submit', function (eventInfo) {
    eventInfo.preventDefault();
})
