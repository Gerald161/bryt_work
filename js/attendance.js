let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

const employees = submissions.map((sub, index) => ({
    id: index + 1,
    name: sub.name
}));

// Attendance data storage
let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

// Initialize the app
function initApp() {
    // Set today's date in date pickers
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceDate').value = today;
    
    // Populate employee dropdown
    const employeeSelect = document.getElementById('attendanceEmployee');
    employees.forEach(employee => {
    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = employee.name;
    employeeSelect.appendChild(option);
    });
    
    // Load initial data
    loadDailyAttendance();
    loadWeeklyAttendance();
    loadMonthlyCalendar();

    
}

// Load daily attendance data
function loadDailyAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const tbody = document.querySelector('#dailyAttendanceTable tbody');
    tbody.innerHTML = '';
    
    employees.forEach(employee => {
    const row = document.createElement('tr');
    const employeeAttendance = attendanceData.find(a => 
        a.employeeId === employee.id && a.date === today
    ) || { status: 'absent', checkIn: '', checkOut: '', hours: 0 };
    
    row.innerHTML = `
        <td>${employee.name}</td>
        <td><span class="status-badge status-${employeeAttendance.status}">${
        employeeAttendance.status.charAt(0).toUpperCase() + employeeAttendance.status.slice(1)
        }</span></td>
        <td>${employeeAttendance.checkIn || '-'}</td>
        <td>${employeeAttendance.checkOut || '-'}</td>
        <td>${employeeAttendance.hours ? employeeAttendance.hours.toFixed(2) : '0.00'}</td>
        <td>
        <button class="edit-btn" data-id="${employee.id}">Edit</button>
        </td>
    `;
    tbody.appendChild(row);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const employeeId = parseInt(this.dataset.id);
        const employee = employees.find(e => e.id === employeeId);
        const today = new Date().toISOString().split('T')[0];
        const attendance = attendanceData.find(a => 
        a.employeeId === employeeId && a.date === today
        ) || { status: 'absent', checkIn: '', checkOut: '', hours: 0 };
        
        // Fill the form with existing data
        document.getElementById('attendanceEmployee').value = employeeId;
        document.getElementById('attendanceDate').value = today;
        document.getElementById('attendanceStatus').value = attendance.status;
        document.getElementById('checkinTime').value = attendance.checkIn || '09:00';
        document.getElementById('checkoutTime').value = attendance.checkOut || '17:00';
        document.getElementById('attendanceRemarks').value = attendance.remarks || '';
        
        // Show the modal
        document.getElementById('markAttendanceModal').classList.add('open');
    });
    });
}

// Load weekly attendance data
function loadWeeklyAttendance() {
    const tbody = document.querySelector('#weeklyAttendanceTable tbody');
    tbody.innerHTML = '';
    
    // This is a simplified version - in a real app you would calculate based on actual data
    employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${employee.name}</td>
        <td><span class="status-badge status-present">9.5h</span></td>
        <td><span class="status-badge status-present">8.0h</span></td>
        <td><span class="status-badge status-absent">0h</span></td>
        <td><span class="status-badge status-present">9.0h</span></td>
        <td><span class="status-badge status-present">9.25h</span></td>
        <td>35.75h</td>
    `;
    tbody.appendChild(row);
    });
}

// Load monthly calendar
function loadMonthlyCalendar() {
    const tbody = document.querySelector('#monthlyCalendar tbody');
    tbody.innerHTML = '';
    
    // Get current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Get first day of month and total days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create calendar rows
    let date = 1;
    for (let i = 0; i < 6; i++) {
    // Stop if we've processed all days
    if (date > daysInMonth) break;
    
    const row = document.createElement('tr');
    
    // Create cells for each day of week
    for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        
        if (i === 0 && j < firstDay) {
        // Empty cells before first day of month
        cell.textContent = '';
        } else if (date > daysInMonth) {
        // Empty cells after last day of month
        cell.textContent = '';
        } else {
        // Day of month
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = date;
        
        // Highlight today
        if (date === currentDate.getDate() && currentMonth === currentDate.getMonth()) {
            dayElement.classList.add('today');
        }
        
        // Add attendance status if available
        const attendanceForDay = attendanceData.find(a => {
            const d = new Date(a.date);
            return d.getDate() === date && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });
        
        if (attendanceForDay) {
            dayElement.classList.add('has-attendance', attendanceForDay.status);
        }
        
        cell.appendChild(dayElement);
        date++;
        }
        
        row.appendChild(cell);
    }
    
    tbody.appendChild(row);
    }
}

// View switching
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
    // Remove active class from all view buttons
    viewBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    
    // Hide all views
    document.querySelectorAll('.view-content').forEach(view => {
        view.style.display = 'none';
    });
    
    // Show the selected view
    const viewId = this.dataset.view + 'View';
    document.getElementById(viewId).style.display = 'block';
    });
});

// Print functionality
document.getElementById('printCurrentView').addEventListener('click', function() {
    window.print();
});

// Modal handling
const markAttendanceModal = document.getElementById('markAttendanceModal');

// Open modals
document.getElementById('markAttendanceBtn').addEventListener('click', () => {
    // Reset form
    document.getElementById('attendanceEmployee').value = '';
    document.getElementById('attendanceDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceStatus').value = 'present';
    document.getElementById('checkinTime').value = '09:00';
    document.getElementById('checkoutTime').value = '17:00';
    document.getElementById('attendanceRemarks').value = '';
    
    markAttendanceModal.classList.add('open');
});

// Close modals
document.getElementById('closeMarkAttendance').addEventListener('click', () => {
    markAttendanceModal.classList.remove('open');
});

document.getElementById('cancelMarkAttendance').addEventListener('click', () => {
    markAttendanceModal.classList.remove('open');
});

// Submit attendance
document.getElementById('submitAttendance').addEventListener('click', function() {
    const employeeId = parseInt(document.getElementById('attendanceEmployee').value);
    const date = document.getElementById('attendanceDate').value;
    const status = document.getElementById('attendanceStatus').value;
    const checkIn = document.getElementById('checkinTime').value;
    const checkOut = document.getElementById('checkoutTime').value;
    const remarks = document.getElementById('attendanceRemarks').value;
    
    // Calculate hours worked
    let hours = 0;
    if (checkIn && checkOut && status === 'present') {
    const [inHours, inMinutes] = checkIn.split(':').map(Number);
    const [outHours, outMinutes] = checkOut.split(':').map(Number);
    hours = (outHours + outMinutes/60) - (inHours + inMinutes/60);
    }
    
    // Find existing record or create new one
    const existingIndex = attendanceData.findIndex(a => 
    a.employeeId === employeeId && a.date === date
    );
    
    if (existingIndex >= 0) {
    // Update existing record
    attendanceData[existingIndex] = {
        employeeId, date, status, checkIn, checkOut, hours, remarks
    };
    } else {
    // Add new record
    attendanceData.push({
        employeeId, date, status, checkIn, checkOut, hours, remarks
    });
    }
    
    // Save to localStorage
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    
    // Reload data
    loadDailyAttendance();
    loadWeeklyAttendance();
    loadMonthlyCalendar();
    
    // Close modal
    markAttendanceModal.classList.remove('open');
    
    // Show success message
    alert('Attendance recorded successfully!');
});

// Toggle time inputs based on status
document.getElementById('attendanceStatus').addEventListener('change', function() {
    const status = this.value;
    const showTimes = status === 'present' || status === 'late';
    
    document.getElementById('checkinTimeGroup').style.display = showTimes ? 'block' : 'none';
    document.getElementById('checkoutTimeGroup').style.display = showTimes ? 'block' : 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === markAttendanceModal) {
    markAttendanceModal.classList.remove('open');
    }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    markAttendanceModal.classList.remove('open');
    }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);