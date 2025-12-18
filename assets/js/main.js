// Shared login/logout/session logic for all roles

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginUser();
        });
    }
});

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!username || !password || !role) {
        alert("Please fill all fields");
        return;
    }
    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
    }
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("role", role);

    switch(role) {
        case "doctor":
            window.location.href = "doctor/dashboard.html";
            break;
        case "nurse":
            window.location.href = "nurse/dashboard.html";
            break;
        case "patient":
            window.location.href = "patient/dashboard.html";
            break;
        default:
            alert("Invalid role selected");
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
