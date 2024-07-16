document.getElementById('customerseditRecordBtn').addEventListener('click', function () {
    document.getElementById('customerseditRecordModal').style.display = 'block';
});

document.getElementById('customersaddRecordBtn').addEventListener('click', function () {
    document.getElementById('customersaddRecordModal').style.display = 'block';
});

document.getElementById('customersdeleteRecordBtn').addEventListener('click', function () {
    document.getElementById('customersdeleteRecordModal').style.display = 'block';
});

document.querySelectorAll('.customersclose').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        this.parentElement.parentElement.style.display = 'none';
    });
});

function customerscloseModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function customerssearchRecord() {
    const searchInput = document.getElementById('customerssearchInput').value.toLowerCase();
    const tableBody = document.getElementById('customersrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    const searchResultsDiv = document.querySelector('.customerssearch-results');
    let searchResultsHTML = '';

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const id = cells[0].textContent.toLowerCase();
        const lastName = cells[1].textContent.toLowerCase();
        const firstName = cells[2].textContent.toLowerCase();

        if (id.includes(searchInput) || lastName.includes(searchInput) || firstName.includes(searchInput)) {
            searchResultsHTML = `
                <div class="customersearch-result-item">
                    <div class="customercolumn-name">
                    <p style="font-size:30px; margin-bottom:0px"><strong> ${capitalize(firstName)} ${capitalize(lastName)}</strong></p>
                        <p><strong>Contact Number:</strong><br> ${cells[3].textContent}</p>
                    </div>
                    <div class="customercolumn details">
                        <p><strong>Customer ID:</strong><br> ${id}</p>
                        <p><strong>Email:</strong><br> ${cells[4].textContent}</p>
                    </div>
                    <div class="customercolumn orders">
                        <p><strong>All Orders:</strong><br> ${cells[5].textContent}</p>
                        <p><strong>Pending:</strong><br> 2</p> <!-- Example rani piste -->
                    </div>
                    <div class="customercolumn status">
                        <p><strong>Completed:</strong><br> 8</p> <!-- Example rani piste -->
                        <p><strong>Cancelled:</strong><br> 0</p> <!-- Example rani piste -->
                    </div>
                </div>
                <hr class="divider">`; 
            break;
        }
    }

    searchResultsDiv.innerHTML = searchResultsHTML;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function customerssaveEdit() {
    const customerId = document.getElementById('customerseditCustomerId').value;
    const firstName = document.getElementById('customerseditFirstName').value;
    const lastName = document.getElementById('customerseditLastName').value;
    const contactNumber = document.getElementById('customerseditContactNumber').value;
    const email = document.getElementById('customerseditEmail').value;
    const orders = document.getElementById('customerseditOrders').value;

    const tableBody = document.getElementById('customersrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[0].textContent == customerId) {
            cells[1].textContent = lastName;
            cells[2].textContent = firstName;
            cells[3].textContent = contactNumber;
            cells[4].textContent = email;
            cells[5].textContent = orders;
            break;
        }
    }

    customerscloseModal('customerseditRecordModal');
}
//new added//

function sortTable(columnIndex, asc) {
const tableBody = document.getElementById('customersrecordTableBody');
const rows = Array.from(tableBody.rows);

rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent.trim();
    const cellB = rowB.cells[columnIndex].textContent.trim();

    if (columnIndex === 1 || columnIndex === 2) { 
        return asc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    } else { 
        return asc ? parseInt(cellA) - parseInt(cellB) : parseInt(cellB) - parseInt(cellA);
    }
});


while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
}


rows.forEach(row => tableBody.appendChild(row));
}


function customersSortRecords() {
const sortSelect = document.getElementById('sortSelect');
const selectedOption = sortSelect.options[sortSelect.selectedIndex].value;

switch (selectedOption) {
    case 'lastNameAsc':
        sortTable(1, true); 
        break;
    case 'lastNameDesc':
        sortTable(1, false); 
        break;
    case 'ordersAsc':
        sortTable(5, true); 
        break;
    case 'ordersDesc':
        sortTable(5, false); 
        break;
    default:
        break;
}
}


document.addEventListener('DOMContentLoaded', function () {
const tableBody = document.getElementById('customersrecordTableBody');


initialRecords.forEach(record => {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${record.id}</td>
        <td>${record.lastName}</td>
        <td>${record.firstName}</td>
        <td>${record.contactNumber}</td>
        <td>${record.email}</td>
        <td>${record.orders}</td>`;
});


sortTable(1, true);
});

function customerssaveAdd() {
    const customerId = document.getElementById('customersaddCustomerId').value;
    const firstName = document.getElementById('customersaddFirstName').value;
    const lastName = document.getElementById('customersaddLastName').value;
    const contactNumber = document.getElementById('customersaddContactNumber').value;
    const email = document.getElementById('customersaddEmail').value;
    const orders = document.getElementById('customersaddOrders').value;

    const tableBody = document.getElementById('customersrecordTableBody');

    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${customerId}</td>
        <td>${lastName}</td>
        <td>${firstName}</td>
        <td>${contactNumber}</td>
        <td>${email}</td>
        <td>${orders}</td>`;

    customerscloseModal('customersaddRecordModal');
}

function customersconfirmDelete() {
    const customerId = document.getElementById('customersdeleteCustomerId').value;

    const tableBody = document.getElementById('customersrecordTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[0].textContent == customerId) {
            tableBody.deleteRow(i);
            break;
        }
    }

    customerscloseModal('customersdeleteRecordModal');
}


document.addEventListener('DOMContentLoaded', function () {
    

    const tableBody = document.getElementById('customersrecordTableBody');

    initialRecords.forEach(record => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${record.id}</td>
            <td>${record.lastName}</td>
            <td>${record.firstName}</td>
            <td>${record.contactNumber}</td>
            <td>${record.email}</td>
            <td>${record.orders}</td>`;
    });
});