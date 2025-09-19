const internList = document.querySelector(".intern-list");

let storedData = JSON.parse(localStorage.getItem("submissions"));

let activeInterns = [
    {
        name: "Emmanuel Osei",
        position: "Marketing Intern",
        status: "normal",
        initials: "EO"
    },
    {
        name: "Ackah Samuel",
        position: "IT Intern",
        status: "away",
        initials: "AS"
    },
]

if (storedData && Array.isArray(storedData)) {
    activeInterns = storedData;
}

activeInterns.forEach((intern)=>{
    internList.innerHTML += `
    <li class="intern-item">
    <div class="intern-avatar">AS</div>
    <div class="intern-info">
        <div class="intern-name">${intern.name}</div>
        <div class="intern-position">Marketing Intern</div>
    </div>
    <div class="intern-status"></div>
    </li>
`
})