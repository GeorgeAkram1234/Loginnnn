var welcomeUser = document.getElementById('welcome');
var logoutBtn = document.getElementById('logoutBtn');
var userName = localStorage.getItem('loginUser');

function welcome() {
    if (userName && welcomeUser) {
        welcomeUser.innerHTML = `Welcome ${userName}`;
    } else {
        window.location.href = 'login.html'; // Redirect if not logged in
    }
}

window.addEventListener('load', welcome);

logoutBtn?.addEventListener('click', function logout() {
    localStorage.removeItem('loginUser');
    window.location.href = 'login.html';
});
