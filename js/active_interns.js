const internList = document.querySelector(".intern-list");

let storedData = JSON.parse(localStorage.getItem("submissions"));

const interns_count = document.querySelector("#interns-count");

const active_interns_count = document.querySelector("#active_interns_count");

let activeInterns = [
    // {
    //     name: "Emmanuel Osei",
    //     position: "Marketing Intern",
    //     status: "normal",
    //     initials: "EO"
    // },
    // {
    //     name: "Ackah Samuel",
    //     position: "IT Intern",
    //     status: "away",
    //     initials: "AS"
    // },
]

if (storedData && Array.isArray(storedData)) {
    activeInterns = storedData;
}

activeInterns.forEach((intern)=>{
    const statusClass = intern.status === "active" ? "" : 
    intern.status === "away" ? "away" : "offline";

    internList.innerHTML += `
    <li class="intern-item">
    ${
        storedData !== null ?
        `<img src="${intern.photo}" class="intern-avatar" alt="">` :
        `<div class="intern-avatar">${intern.initials}</div>`
    }
    <div class="intern-info">
        <div class="intern-name">${intern.name}</div>
        <div class="intern-position">${intern.position}</div>
    </div>
    <div class="intern-status ${statusClass}"></div>
    </li>
`
})

interns_count.innerHTML = activeInterns.length;

active_interns_count.innerHTML = activeInterns.filter(intern => intern.status === "active").length;