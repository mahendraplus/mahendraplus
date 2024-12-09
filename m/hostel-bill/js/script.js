let studentsData = [];
let hostelName = '';

// Fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('https://mahendraplus.github.io/m/hostel-bill/json/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        hostelName = data.hostelName;
        studentsData = data.students;

        document.getElementById('hostelName').innerHTML = `
            <i class="fas fa-building"></i>
            ${hostelName}
        `;

        populateStudentList(studentsData);
    } catch (error) {
        document.getElementById('studentList').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Error loading data: ${error.message}
            </div>
        `;
        console.error('Error:', error);
    }
}

// Populate student list
function populateStudentList(students) {
    const studentList = document.getElementById('studentList');
    if (students.length === 0) {
        studentList.innerHTML = `
            <div class="error-message">
                <i class="fas fa-search"></i>
                No students found
            </div>
        `;
        return;
    }

    studentList.innerHTML = students.map(student => `
        <div class="student-item" onclick="showBill(${student.id})">
            <h3>${student.name}</h3>
            <div class="student-info">
                <p><span><i class="fas fa-door-open"></i> Room</span><span>${student.roomNo}</span></p>
                <p><span><i class="fas fa-calendar-alt"></i> Entry Date</span><span>${student.entryDate}</span></p>
                <p><span><i class="fas fa-money-bill-wave"></i> Monthly Rent</span><span>₹${student.monthlyRent}</span></p>
            </div>
        </div>
    `).join('');
}

// Show bill modal
function showBill(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    const modal = document.getElementById('billModal');
    const billContent = document.getElementById('billContent');

    let totalPaid = student.deposit;
    let totalPending = 0;

    student.payments.forEach(payment => {
        if(payment.status === 'paid') {
            totalPaid += payment.amount;
        } else {
            totalPending += payment.amount;
        }
    });

    billContent.innerHTML = `
        <div class="bill-container">
            <div class="bill-header">
                <h2>${hostelName}</h2>
                <p>Student Bill Details</p>
            </div>

            <div class="student-info">
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Room No:</strong> ${student.roomNo}</p>
                <p><strong>Entry Date:</strong> ${student.entryDate}</p>
                <p><strong>Bill Date:</strong> 25-11-2024</p>
            </div>

            <table class="table">
                <tr><th colspan="3">PAID AMOUNTS</th></tr>
                <tr><td>Security Deposit</td><td>₹${student.deposit}</td><td><span class="status-badge status-paid">Paid</span></td></tr>
                ${student.payments.filter(p => p.status === 'paid').map(p => `
                    <tr>
                        <td>${p.period}</td>
                        <td>₹${p.amount}</td>
                        <td><span class="status-badge status-paid">Paid</span></td>
                    </tr>
                `).join('')}
                <tr><th colspan="2">Total Paid</th><th>₹${totalPaid}</th></tr>
            </table>

            <table class="table">
                <tr><th colspan="3">PENDING AMOUNTS</th></tr>
                ${student.payments.filter(p => p.status === 'pending').map(p => `
                    <tr>
                        <td>${p.period}</td>
                        <td>₹${p.amount}</td>
                        <td><span class="status-badge status-pending">Pending</span></td>
                    </tr>
                `).join('')}
                <tr><th colspan="2">Total Pending</th><th>₹${totalPending}</th></tr>
            </table>
        </div>
    `;

    modal.style.display = 'block';
}

// Close the modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('billModal').style.display = 'none';
});

// Initial fetch
fetchData();
