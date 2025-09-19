let isEditing = false;
let originalValues = {};

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

    // Save the changes (update original values)
    storeOriginalValues();
    
    // Update display name in header
    document.getElementById('displayName').textContent = fullName;
    
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
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        alert('Profile image updated successfully!');
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
    
    // Simulate password change (in real app, this would be an API call)
    if (currentPassword === 'oldpassword' || confirm('Are you sure you want to change your password?')) {
        alert('Password changed successfully!');
        closePasswordModal();
    } else {
        alert('Current password is incorrect');
    }
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