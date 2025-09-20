const signin_form = document.querySelector("#signin_form");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const email_error = document.querySelector("#email_error");
const password_error = document.querySelector("#password_error");

// Check if user is already logged in
const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

if(loggedIn){
    window.location.href = "dashboard.html";
}

// Default user data (used if no user exists in localStorage)
const defaultUser = {
    name: "Bright Amankwah Opoku",
    email: "bright@mail.com",
    photo: "",
    password: "123456",
    phone: "0200000000",
    department: "math",
    position: "Admin",
    employee_id: "001"
};

// Function to get user data (from localStorage or default)
function getUserData() {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    // If no saved user, use default user and save it
    if (!savedUser) {
        localStorage.setItem("userData", JSON.stringify(defaultUser));
        return defaultUser;
    }
    
    return savedUser;
}

// Function to update user data in localStorage
function updateUserData(updatedUser) {
    localStorage.setItem("userData", JSON.stringify(updatedUser));
}

signin_form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(loginPassword.value)) {
        password_error.innerHTML = `Please enter at least 6 characters`;
        return;
    } else {
        password_error.innerHTML = ``;
    }
    
    // Get the single user data
    const user = getUserData();
    
    // Check if email matches
    if (user.email !== loginEmail.value) {
        email_error.innerHTML = `Email not found`;
        password_error.innerHTML = ``; // clear password error
        return;
    } else {
        email_error.innerHTML = ``;
    }
    
    // Check password
    if (user.password !== loginPassword.value) {
        password_error.innerHTML = `Wrong password`;
        return;
    }
    
    // Successful login
    password_error.innerHTML = ``;
    
    // Save the logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    localStorage.setItem("loggedIn", JSON.stringify(user));
    
    // Redirect to dashboard
    window.location.href = "dashboard.html";
});