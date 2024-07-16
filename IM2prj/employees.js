document.getElementById('employeeseditRecordBtn').addEventListener('click', function () {
    document.getElementById('employeeseditRecordModal').style.display = 'block';
});

document.getElementById('employeesaddRecordBtn').addEventListener('click', function () {
    document.getElementById('employeesaddRecordModal').style.display = 'block';
});

document.getElementById('employeesdeleteRecordBtn').addEventListener('click', function () {
    document.getElementById('employeesdeleteRecordModal').style.display = 'block';
});

document.querySelectorAll('.employeesclose').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        this.parentElement.parentElement.style.display = 'none';
    });
});

function employeescloseModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


function employeessearchRecord() {
    const searchInput = document.getElementById('employeessearchInput').value.toLowerCase();
    const tableBody = document.getElementById('employeesrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const searchResultsDiv = document.querySelector('.employeessearch-results');
    let searchResultsHTML = '';

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const id = cells[0].textContent.toLowerCase();
        const lastName = cells[1].textContent.toLowerCase();
        const firstName = cells[2].textContent.toLowerCase();

        if (id.includes(searchInput) || lastName.includes(searchInput) || firstName.includes(searchInput)) {
            const email = cells[4].textContent;
            const contactNumber = cells[3].textContent;
            const department = cells[5].textContent;
            const permission = cells[6].textContent; 

          
            const fullName = capitalize(firstName) + ' ' + capitalize(lastName);

            searchResultsHTML += 
            `<div class="employeesearch-result-item">
                <div class="employeecolumn-name" style="text-align: center;">
                    <br><br><br>
                    <p><strong>Employee ID</strong><br> ${id}</p>
                </div>
                <div class="employeecolumn email"><br><br><br>
                    <p><strong>Email</strong><br>  ${email}</p>
                </div>
                <div class="employeecolumn contact">
                     <p style="font-size: 20px;"><strong>${fullName}</strong></p>
                    <p><strong>Contact Number</strong><br>  ${contactNumber}</p>
                </div>
                <div class="employeecolumn department"><br><br><br>
                    <p><strong>Department</strong><br>  ${department}</p>
                </div>
                <div class="employeecolumn permission"><br><br><br>
                    <p><strong>Permission</strong><br>  ${permission}</p>
                </div>
            </div>`;
        }
    }

    searchResultsDiv.innerHTML = searchResultsHTML !== '' ? searchResultsHTML : '<p style="font-size: 30px; text-align: center;">No Results Found</p>';
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//new added
function employeesSortRecord() {
    const sortBy = document.getElementById('employeesortBy').value;
    const tableBody = document.getElementById('employeesrecordTableBody');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));

    let compareFunction;

    switch (sortBy) {
        case 'name':
            compareFunction = (a, b) => {
                const nameA = a.cells[2].textContent.toLowerCase() + ' ' + a.cells[1].textContent.toLowerCase();
                const nameB = b.cells[2].textContent.toLowerCase() + ' ' + b.cells[1].textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            };
            break;
        case 'permission':
            compareFunction = (a, b) => a.cells[6].textContent.localeCompare(b.cells[6].textContent);
            break;
        case 'department':
            compareFunction = (a, b) => a.cells[5].textContent.localeCompare(b.cells[5].textContent);
            break;
        default:
            return;
    }

    rows.sort(compareFunction);

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    rows.forEach(row => tableBody.appendChild(row));
}
//new added
function employeessaveEdit() {
    const employeeId = document.getElementById('employeeseditEmployeeId').value;
    const firstName = document.getElementById('employeeseditFirstName').value;
    const lastName = document.getElementById('employeeseditLastName').value;
    const contactNumber = document.getElementById('employeeseditContactNumber').value;
    const email = document.getElementById('employeeseditEmail').value;
    const department = document.getElementById('employeeseditDepartment').value;
    const permission = document.getElementById('employeeseditPermission').value; // Capture permission

    const tableBody = document.getElementById('employeesrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[0].textContent == employeeId) {
            cells[1].textContent = lastName;
            cells[2].textContent = firstName;
            cells[3].textContent = contactNumber;
            cells[4].textContent = email;
            cells[5].textContent = department;
            cells[6].textContent = permission; 
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
    const department = document.getElementById('employeesaddDepartment').value;
    const permission = document.getElementById('employeesaddPermission').value; 

    const tableBody = document.getElementById('employeesrecordTableBody');

    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${employeeId}</td>
        <td>${lastName}</td>
        <td>${firstName}</td>
        <td>${contactNumber}</td>
        <td>${email}</td>
        <td>${department}</td>
        <td>${permission}</td>`;

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