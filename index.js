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

var usersList = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];

btnRegister?.addEventListener('click', function register(event) {
    event.preventDefault(); 

    if (!check() && !exists()) {
        var data = {
            name: userNameRegister.value.trim(),
            email: userEmailRegister.value.trim(),
            pass: userPassRegister.value
        };
        usersList.push(data);
        localStorage.setItem('users', JSON.stringify(usersList));
        clearForm();
        window.location.href = 'login.html';
    }
});

function validateInputs(element) {
    if (element.value.trim() === '') {
        element.classList.remove('is-valid', 'is-invalid');
        element.nextElementSibling.classList.replace('d-block', 'd-none');
        return false;
    }

    var regex = {
        userNameRegister: /^[a-zA-Z]{2,6}$/,
        userEmailRegister: /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/,
        userPassRegister: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        userMail: /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)*$/,
        userPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    };

    if (regex[element.id]?.test(element.value.trim())) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block', 'd-none');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none', 'd-block');
    }
}

userNameRegister?.addEventListener('input', () => validateInputs(userNameRegister));
userEmailRegister?.addEventListener('input', () => validateInputs(userEmailRegister));
userPassRegister?.addEventListener('input', () => validateInputs(userPassRegister));
userMail?.addEventListener('input', () => validateInputs(userMail));
userPass?.addEventListener('input', () => validateInputs(userPass));

function exists() {
    return usersList.some(user => user.email === userEmailRegister.value.trim()) 
        ? (alert('Email already exists'), true)
        : false;
}

function check() {
    if (
        !userNameRegister.value.trim() ||
        !userEmailRegister.value.trim() ||
        !userPassRegister.value
    ) {
        alert('Please fill all fields');
        return true;
    }
    return false;
}

// Clear form fields
function clearForm() {
    userNameRegister.value = '';
    userEmailRegister.value = '';
    userPassRegister.value = '';
}

btnLogin?.addEventListener('click', function login(event) {
    event.preventDefault(); 

    var userFound = usersList.find(
        user =>
            user.email === userMail.value.trim() &&
            user.pass === userPass.value
    );

    if (userFound) {
        localStorage.setItem('loginUser', userFound.name);
        window.location.href = 'home.html';
        wrongMsg.classList.replace('d-block', 'd-none');
    } else {
        wrongMsg.classList.replace('d-none', 'd-block');
    }
});

document.forms[0]?.addEventListener('submit', function (eventInfo) {
    eventInfo.preventDefault();
});
