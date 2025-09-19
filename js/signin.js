const signin_form = document.querySelector("#signin_form");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const email_error = document.querySelector("#email_error");
const password_error = document.querySelector("#password_error");

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(loggedInUser){
    window.location.href = "dashboard.html";
}

var allUsers = [
    {
        name: "Bright Amankwah Opoku",
        email: "b@mail.com",
        image: "",
        password: "abcd"
    },
    {
        name: "Second User",
        email: "second@mail.com",
        image: "",
        password: "1234"
    }
];

signin_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const passwordRegex = /^.{4,}$/;

    if (!passwordRegex.test(loginPassword.value)) {
        password_error.innerHTML = `Please enter at least 4 characters`;
        return;
    } else {
        password_error.innerHTML = ``;
    }

    // Check if email exists
    const user = allUsers.find((u) => u.email === loginEmail.value);

    if (!user) {
        email_error.innerHTML = `Email not found`;
        password_error.innerHTML = ``; // clear password error
        return;
    } else {
        email_error.innerHTML = ``;
    }

    // Check password for that user
    if (user.password !== loginPassword.value) {
        password_error.innerHTML = `Wrong password`;
        return;
    }

    // Successful login
    password_error.innerHTML = ``;

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
});
