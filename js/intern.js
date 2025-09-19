// Carousel functionality
const carouselImgs = document.querySelectorAll('.carousel-img');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentIndex = 0;
let interval;

function showSlide(index) {
    carouselImgs.forEach(img => img.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    carouselImgs[index].classList.add('active');
    carouselDots[index].classList.add('active');
    currentIndex = index;
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % carouselImgs.length;
    showSlide(nextIndex);
}

function startCarousel() {
    interval = setInterval(nextSlide, 5000);
}

carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
    clearInterval(interval);
    showSlide(index);
    startCarousel();
    });
});

startCarousel();

// Profile dropdown functionality
const profileDropdown = document.getElementById('profileDropdown');
const profileBtn = document.getElementById('profileBtn');

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
    profileDropdown.classList.remove('open');
});

// Intern data
let interns = [
    {
    name: "Emmanuel Osei",
    photo: "images/sic3.jpg",
    position: "Marketing Intern",
    school: "University of Ghana",
    level: "Level 300",
    duration: "6 months (Jan - Jun 2023)",
    about: "Passionate about marketing strategies with strong analytical skills. Demonstrated excellent teamwork abilities and creative thinking in campaign development.",
    expectations: "To gain practical experience in digital marketing strategies, understand consumer behavior in the insurance industry, and develop professional networking skills.",
    status: "active",
    files: [
        { type: "assignment", name: "Marketing Campaign.pdf", date: "2023-04-15" },
        { type: "report", name: "Monthly Report.docx", date: "2023-05-01" }
    ]
    },
    {
    name: "Ackah Samuel",
    photo: "images/com1.jpg",
    position: "IT Intern",
    school: "KNUST",
    level: "Level 400",
    duration: "3 months (May - Aug 2023)",
    about: "Tech enthusiast with expertise in web development and database management. Has shown exceptional problem-solving skills in IT projects.",
    expectations: "To apply academic knowledge in a corporate IT environment, gain experience with enterprise systems, and contribute to software development projects.",
    status: "away",
    files: [
        { type: "assignment", name: "Database Design.pdf", date: "2023-06-10" }
    ]
    },
    {
    name: "David David",
    photo: "images/COMA.jpg",
    position: "Finance Intern",
    school: "Ashesi University",
    level: "Level 200",
    duration: "1 year (Sep 2022 - Aug 2023)",
    about: "Accounting student with a keen interest in financial analysis. Has shown strong numerical skills and attention to detail in financial reporting tasks.",
    expectations: "To understand financial operations in the insurance sector, learn about investment strategies, and develop practical accounting skills beyond textbook knowledge.",
    status: "offline",
    files: []
    },
    {
    name: "Stephen Sasu",
    photo: "images/com4.jpg",
    position: "HR Intern",
    school: "University of Cape Coast",
    level: "Level 300",
    duration: "4 months (Mar - Jun 2023)",
    about: "Human resource management student with excellent interpersonal skills. Has shown initiative in organizing employee engagement activities.",
    expectations: "To gain hands-on experience in recruitment processes, employee relations, and HR policy implementation in a corporate setting.",
    status: "active",
    files: [
        { type: "report", name: "HR Policy Review.docx", date: "2023-04-20" }
    ]
    },
    {
    name: "Grace Mensah",
    photo: "images/sic3.jpg",
    position: "Actuarial Intern",
    school: "GIMPA",
    level: "Level 100",
    duration: "4 months (Mar - Jun 2023)",
    about: "Creative thinker with strong analytical skills, interested in actuarial science and risk assessment.",
    expectations: "To apply statistical models in real-world insurance scenarios and gain insight into the actuarial profession.",
    status: "active",
    files: []
    }
];

let storedData = JSON.parse(localStorage.getItem("submissions"));

if (storedData && Array.isArray(storedData)) {
    interns = storedData;
}

let editingIndex = null;
let currentInternIndex = null;
const internList = document.getElementById('internList');
const detailPanel = document.getElementById('internDetailPanel');
const detailPhoto = document.getElementById('detailPhoto');
const detailName = document.getElementById('detailName');
const detailPosition = document.getElementById('detailPosition');
const detailAbout = document.getElementById('detailAbout');
const detailSchool = document.getElementById('detailSchool');
const detailLevel = document.getElementById('detailLevel');
const detailExpectations = document.getElementById('detailExpectations');
const detailDuration = document.getElementById('detailDuration');
const detailDepartment = document.getElementById('detailDepartment');
const uploadedFilesContainer = document.getElementById('uploadedFiles');
const editBtn = document.getElementById('editBtn');
const addInternBtn = document.getElementById('addInternBtn');
const uploadAssignmentBtn = document.getElementById('uploadAssignmentBtn');
const uploadReportBtn = document.getElementById('uploadReportBtn');
const internFormModal = document.getElementById('internFormModal');
const formTitle = document.getElementById('formTitle');
const formName = document.getElementById('formName');
const formPosition = document.getElementById('formPosition');
const formSchool = document.getElementById('formSchool');
const formLevel = document.getElementById('formLevel');
const formDuration = document.getElementById('formDuration');
const formAbout = document.getElementById('formAbout');
const formExpectations = document.getElementById('formExpectations');
const formStatus = document.getElementById('formStatus');
const saveInternBtn = document.getElementById('saveInternBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeModalBtn = document.getElementById('closeModal');
const searchInput = document.querySelector('.search-bar input');

// File upload elements
const fileUploadModal = document.getElementById('fileUploadModal');
const uploadModalTitle = document.getElementById('uploadModalTitle');
const uploadTypeInput = document.getElementById('uploadType');
const fileToUpload = document.getElementById('fileToUpload');
const fileUploadButton = document.getElementById('fileUploadButton');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const fileDescription = document.getElementById('fileDescription');
const closeUploadModal = document.getElementById('closeUploadModal');
const cancelUpload = document.getElementById('cancelUpload');
const submitUpload = document.getElementById('submitUpload');
const photoUploadButton = document.getElementById('photoUploadButton');
const internPhotoUpload = document.getElementById('internPhotoUpload');
const photoNameDisplay = document.getElementById('photoNameDisplay');

// Render intern list
function renderList() {
    internList.innerHTML = "";
    interns.forEach((intern, i) => {
    const li = document.createElement('li');
    li.className = 'intern-item';
    
    // Use initials if no photo is provided
    const avatarContent = intern.photo 
        ? `<img src="${intern.photo}" alt="${intern.name}">`
        : intern.name.split(' ').map(n => n[0]).join('').slice(0,2);
    
    li.innerHTML = `
        <div class="intern-avatar">${avatarContent}</div>
        <div class="intern-info">
        <div class="intern-name">${intern.name}</div>
        <div class="intern-position">${intern.position} • ${intern.school}</div>
        </div>
        <div class="intern-status ${intern.status === 'away' ? 'away' : intern.status === 'offline' ? 'offline' : ''}"></div>
    `;
    
    li.querySelector('.intern-name').addEventListener('click', () => showDetail(i));
    internList.appendChild(li);
    });
}

// Show intern details
function showDetail(i) {
    currentInternIndex = i;
    const intern = interns[i];
    detailPhoto.src = intern.photo || '';
    detailName.textContent = intern.name;
    detailPosition.textContent = `${intern.position} • ${intern.school}`;
    detailAbout.textContent = intern.about;
    detailSchool.textContent = intern.school;
    detailLevel.textContent = intern.level;
    detailExpectations.textContent = intern.expectations;
    detailDuration.textContent = intern.duration;
    detailDepartment.textContent = intern.position.split(' ')[0] === 'IT' ? 'Information Technology' : intern.position.split(' ')[0];
    
    // Render uploaded files
    renderUploadedFiles(intern.files);
    
    detailPanel.style.display = 'block';
    editBtn.onclick = () => openEditForm(i);
    
    // Scroll to detail panel
    detailPanel.scrollIntoView({ behavior: 'smooth' });
}

// Render uploaded files
function renderUploadedFiles(files) {
    uploadedFilesContainer.innerHTML = '';
    
    if (files.length === 0) {
    uploadedFilesContainer.innerHTML = '<div class="detail-value">No files uploaded yet</div>';
    return;
    }
    
    files.forEach(file => {
    const fileElement = document.createElement('div');
    fileElement.className = 'uploaded-file';
    
    const icon = file.type === 'assignment' 
        ? '<svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#4CAF50" stroke-width="2"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#4CAF50" stroke-width="2"/></svg>'
        : '<svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#2196F3" stroke-width="2"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#2196F3" stroke-width="2"/></svg>';
    
    fileElement.innerHTML = `
        ${icon}
        <div class="file-info">
        <div class="file-name">${file.name}</div>
        <div class="file-date">Uploaded: ${file.date}</div>
        </div>
    `;
    
    uploadedFilesContainer.appendChild(fileElement);
    });
}

// Open edit form
function openEditForm(i) {
    editingIndex = i;
    const intern = interns[i];
    formTitle.textContent = "Edit Intern";
    formName.value = intern.name;
    formPosition.value = intern.position;
    formSchool.value = intern.school;
    formLevel.value = intern.level;
    formDuration.value = intern.duration;
    formAbout.value = intern.about;
    formExpectations.value = intern.expectations;
    formStatus.value = intern.status;
    
    // Reset photo upload
    photoNameDisplay.textContent = "No photo chosen";
    internPhotoUpload.value = '';
    
    internFormModal.classList.add('active');
}

// Add new intern
addInternBtn.addEventListener('click', () => {
    editingIndex = null;
    formTitle.textContent = "Add Intern";
    document.getElementById('internForm').reset();
    photoNameDisplay.textContent = "No photo chosen";
    internFormModal.classList.add('active');
});

// Save intern (add or edit)
saveInternBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const newIntern = {
        name: formName.value,
        photo: "", // Will be set below
        position: formPosition.value,
        school: formSchool.value,
        level: formLevel.value,
        duration: formDuration.value,
        about: formAbout.value,
        expectations: formExpectations.value,
        status: formStatus.value,
        files: editingIndex !== null ? interns[editingIndex].files : []
    };
    
    // Handle photo upload
    if (internPhotoUpload.files.length > 0) {
        const file = internPhotoUpload.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            newIntern.photo = e.target.result;
            completeSave(newIntern);
        };
    
        reader.readAsDataURL(file);
    } else {
        // Keep existing photo if editing and no new photo was uploaded
        if (editingIndex !== null) {
            newIntern.photo = interns[editingIndex].photo;
        }
        completeSave(newIntern);
    }
});

function isFormComplete(data) {
    return Object.keys(data).every(key => {
        if (key === "files" || key === "photo") return true;
        return data[key].trim() !== "";
    });
}

function completeSave(newIntern) {
    if (!isFormComplete(newIntern)) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    if (editingIndex !== null){
        // Update existing intern
        interns[editingIndex] = newIntern;
    } else {
        // Add new intern
        interns.unshift(newIntern);
    }

    // storing info to local storage
    let storedData = JSON.parse(localStorage.getItem("submissions")) || [];

    storedData.unshift(newIntern);

    localStorage.setItem("submissions", JSON.stringify(storedData));
    
    closeModal();
    renderList();
    
    // If we were editing, show the updated details
    if (editingIndex !== null) {
        showDetail(editingIndex);
    } else {
    // If adding new, show the first intern (which is the new one)
        showDetail(0);
    }
}

// Close modal
function closeModal() {
    internFormModal.classList.remove('active');
}

// Event listeners for modal
cancelBtn.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);
internFormModal.addEventListener('click', (e) => {
    if (e.target === internFormModal) {
    closeModal();
    }
});

// File upload functionality
uploadAssignmentBtn.addEventListener('click', () => {
    openUploadModal('assignment');
});

uploadReportBtn.addEventListener('click', () => {
    openUploadModal('report');
});

function openUploadModal(type) {
    uploadTypeInput.value = type;
    uploadModalTitle.textContent = `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    fileToUpload.value = '';
    fileNameDisplay.textContent = 'No file chosen';
    fileDescription.value = '';
    fileUploadModal.style.display = 'flex';
}

// Handle file selection
fileToUpload.addEventListener('change', function() {
    if (this.files.length > 0) {
    fileNameDisplay.textContent = this.files[0].name;
    } else {
    fileNameDisplay.textContent = 'No file chosen';
    }
});

// Handle photo selection
internPhotoUpload.addEventListener('change', function() {
    if (this.files.length > 0) {
    photoNameDisplay.textContent = this.files[0].name;
    } else {
    photoNameDisplay.textContent = 'No photo chosen';
    }
});

// Submit file upload
submitUpload.addEventListener('click', function() {
    if (fileToUpload.files.length === 0) {
    alert('Please select a file to upload');
    return;
    }
    
    const file = fileToUpload.files[0];
    const type = uploadTypeInput.value;
    const description = fileDescription.value;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Add the file to the current intern's files
    if (currentInternIndex !== null) {
    interns[currentInternIndex].files.push({
        type: type,
        name: file.name,
        date: currentDate,
        description: description
    });
    
    // Update the display
    renderUploadedFiles(interns[currentInternIndex].files);
    
    // Close the modal
    closeUploadModalFunc();
    
    // In a real app, you would upload the file to a server here
    alert('File uploaded successfully (simulated)');
    }
});

// Close upload modal
function closeUploadModalFunc() {
    fileUploadModal.style.display = 'none';
}

closeUploadModal.addEventListener('click', closeUploadModalFunc);
cancelUpload.addEventListener('click', closeUploadModalFunc);
fileUploadModal.addEventListener('click', function(e) {
    if (e.target === fileUploadModal) {
    closeUploadModalFunc();
    }
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll('.intern-item').forEach(item => {
    const name = item.querySelector('.intern-name').textContent.toLowerCase();
    const position = item.querySelector('.intern-position').textContent.toLowerCase();
    if (name.includes(searchTerm) || position.includes(searchTerm)) {
        item.style.display = 'flex';
    } else {
        item.style.display = 'none';
    }
    });
});

// Initialize
renderList();