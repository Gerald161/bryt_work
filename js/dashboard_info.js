const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const user_name = document.querySelector("#user_name");

const profile_avatar = document.querySelector("#profile_avatar");

const logout_button = document.querySelector("#logout_button");

if(loggedInUser){
    user_name.innerHTML = loggedInUser.name;

    const initials = loggedInUser.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();  

    profile_avatar.innerHTML = initials;
}else{
    window.location.href = "index.html"
}

logout_button.addEventListener("click", (e)=>{
    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
})