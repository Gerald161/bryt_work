const internList = document.querySelector(".intern-list");

const activeInterns = [
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

activeInterns.forEach((intern)=>{
    internList.innerHTML += `
    <li class="intern-item">
    <div class="intern-avatar">AS</div>
    <div class="intern-info">
        <div class="intern-name">Emmanuel Osei</div>
        <div class="intern-position">Marketing Intern</div>
    </div>
    <div class="intern-status"></div>
    </li>
`
})