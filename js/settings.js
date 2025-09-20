let isEditing = false;
let originalValues = {};

// Initialize profile data structure
function initializeProfileData() {
    const defaultProfile = {
        name: "Bright Amankwah Opoku",
        email: "b@mail.com",
        photo: "",
        password: "123456",
        phone: "0200",
        department: "math",
        position: "Admin",
        employee_id: "001"
    };
    
    let profileData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!profileData) {
        localStorage.setItem("loggedInUser", JSON.stringify(defaultProfile));
        profileData = defaultProfile;
    }
    return profileData;
}

// Save profile data to localStorage
function saveProfileData(updatedData) {
    const currentProfile = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const updatedProfile = { ...currentProfile, ...updatedData };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedProfile));
}

// Load profile data from localStorage and populate fields
function loadProfileData() {
    const profileData = initializeProfileData();
    
    document.getElementById('fullName').value = profileData.name || '';
    document.getElementById('email').value = profileData.email || '';
    document.getElementById('phone').value = profileData.phone || '';
    document.getElementById('department').value = profileData.department || '';
    document.getElementById('position').value = profileData.position || '';
    document.getElementById('employeeId').value = profileData.employee_id || '';
    
    // Update display name in header if it exists
    const displayNameElement = document.getElementById('displayName');
    if (displayNameElement) {
        displayNameElement.textContent = profileData.name || 'User Name';
    }
    
    // Update profile image if it exists
    if (profileData.photo) {
        document.getElementById('profileImage').src = profileData.photo;
    }
}

// Store original values
function storeOriginalValues() {
    originalValues = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        employeeId: document.getElementById('employeeId').value
    };
}

// Initialize original values on page load
window.onload = function() {
    loadProfileData();
    storeOriginalValues();
};

function toggleEdit() {
    isEditing = !isEditing;
    const fields = ['fullName', 'email', 'phone', 'department', 'position', 'employeeId'];
    const editToggle = document.getElementById('editToggle');
    const editingButtons = document.getElementById('editingButtons');
    const actionButtons = document.getElementById('actionButtons');

    if (isEditing) {
        // Enable editing
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.readOnly = false;
            field.classList.add('editing');
        });
        
        editToggle.textContent = 'Cancel';
        editingButtons.classList.add('visible');
        actionButtons.style.display = 'none';
    } else {
        // Disable editing and restore original values
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.readOnly = true;
            field.classList.remove('editing');
            field.value = originalValues[fieldId];
        });
        
        editToggle.textContent = 'Edit';
        editingButtons.classList.remove('visible');
        actionButtons.style.display = 'flex';
    }
}

function saveChanges() {
    // Validate required fields
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!fullName || !email) {
        alert('Please fill in all required fields (Full Name and Email)');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Prepare data to save to localStorage
    const updatedData = {
        name: fullName,
        email: email,
        phone: document.getElementById('phone').value.trim(),
        department: document.getElementById('department').value.trim(),
        position: document.getElementById('position').value.trim(),
        employee_id: document.getElementById('employeeId').value.trim()
    };

    // Save to localStorage
    saveProfileData(updatedData);

    // Save the changes (update original values)
    storeOriginalValues();
    
    // Update display name in header
    document.getElementById('displayName').textContent = fullName;

    var profile_role = document.querySelector(".profile-role");

    profile_role.innerHTML = updatedData.position

    const user_name = document.querySelector("#user_name");

    const profile_avatar = document.querySelector("#profile_avatar");

    user_name.innerHTML = updatedData.name

    const initials = updatedData.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();  

    profile_avatar.innerHTML = initials;
    
    // Exit editing mode
    const fields = ['fullName', 'email', 'phone', 'department', 'position', 'employeeId'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.readOnly = true;
        field.classList.remove('editing');
    });
    
    document.getElementById('editToggle').textContent = 'Edit';
    document.getElementById('editingButtons').classList.remove('visible');
    document.getElementById('actionButtons').style.display = 'flex';
    
    isEditing = false;
    
    // Show success message
    alert('Profile updated successfully!');
}

function cancelEdit() {
    toggleEdit(); // This will restore original values
}

function changeProfileImage() {
    document.getElementById('imageUpload').click();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            
            // Update the profile image display
            document.getElementById('profileImage').src = base64Image;
            
            // Save photo to localStorage immediately
            saveProfileData({ photo: base64Image });
            
            alert('Profile image updated successfully!');
        };
        reader.readAsDataURL(file);
    }
}

function openPasswordModal() {
    document.getElementById('passwordModal').classList.add('visible');
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('visible');
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Get current stored password
    const profileData = JSON.parse(localStorage.getItem("loggedInUser"));
    const storedPassword = profileData.password;
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (currentPassword === newPassword) {
        alert('New password must be different from current password');
        return;
    }
    
    // Verify current password
    if (currentPassword !== storedPassword) {
        alert('Current password is incorrect');
        return;
    }
    
    // Save new password to localStorage
    saveProfileData({ password: newPassword });
    
    alert('Password changed successfully!');
    closePasswordModal();
}

// Close modal when clicking outside
document.getElementById('passwordModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closePasswordModal();
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePasswordModal();
    }
});

let storedData = JSON.parse(localStorage.getItem("submissions"));

const interns_count = document.querySelector("#interns_count");
const active_interns_count = document.querySelector("#active_interns_count");

var profile_role = document.querySelector(".profile-role");

var currentDetails = JSON.parse(localStorage.getItem("loggedInUser"))

profile_role.innerHTML = currentDetails.position

if (storedData && interns_count) {
    interns_count.innerHTML = storedData.length;
}

if (storedData && active_interns_count) {
    active_interns_count.innerHTML = storedData.filter(intern => intern.status === "active").length;
}