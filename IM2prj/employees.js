document.addEventListener('DOMContentLoaded', function() {
    fetchEmployees();

    // Add event listeners for the toolbar buttons
    document.getElementById('customerseditRecordBtn').addEventListener('click', editRecord);
    document.getElementById('customersaddRecordBtn').addEventListener('click', addRecord);
    document.getElementById('customersdeleteRecordBtn').addEventListener('click', deleteRecord);
});


function fetchEmployees() {
    fetch('employees.php?action=getEmployees')
        .then(response => response.json())
        .then(data => {
            populateEmployeeTable(data);
        })
        .catch(error => console.error('Error fetching employees:', error));
}

function populateEmployeeTable(employees) {
    const tableBody = document.getElementById('employeesrecordTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.last_name}, ${employee.first_name}</td>
            <td>${employee.contact_number}</td>
            <td>${employee.email}</td>
            <td>${employee.status}</td>
        `;

        tableBody.appendChild(row);
    });
}

// ... (rest of the code remains the same)

function employeessaveEdit() {
    const employeeId = document.getElementById('employeeseditEmployeeId').value;
    const firstName = document.getElementById('employeeseditFirstName').value;
    const lastName = document.getElementById('employeeseditLastName').value;
    const contactNumber = document.getElementById('employeeseditContactNumber').value;
    const email = document.getElementById('employeeseditEmail').value;
    const status = document.getElementById('employeeseditStatus').value;

    const tableBody = document.getElementById('employeesrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[0].textContent == employeeId) {
            cells[1].textContent = `${lastName}, ${firstName}`;
            cells[2].textContent = contactNumber;
            cells[3].textContent = email;
            cells[4].textContent = status;
            break;
        }
    }

    employeescloseModal('employeeseditRecordModal');
}

function employeessaveAdd() {
    const employeeId = document.getElementById('employeesaddEmployeeId').value;
    const firstName = document.getElementById('employeesaddFirstName').value;
    const lastName = document.getElementById('employeesaddLastName').value;
    const contactNumber = document.getElementById('employeesaddContactNumber').value;
    const email = document.getElementById('employeesaddEmail').value;
    const status = document.getElementById('employeesaddStatus').value;

    const tableBody = document.getElementById('employeesrecordTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${employeeId}</td>
        <td>${lastName}, ${firstName}</td>
        <td>${contactNumber}</td>
        <td>${email}</td>
        <td>${status}</td>
    `;

    employeescloseModal('employeesaddRecordModal');
}

function employeesconfirmDelete() {
    const employeeId = document.getElementById('employeesdeleteEmployeeId').value;

    const tableBody = document.getElementById('employeesrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[0].textContent == employeeId) {
            tableBody.deleteRow(i);
            break;
        }
    }

    employeescloseModal('employeesdeleteRecordModal');
}