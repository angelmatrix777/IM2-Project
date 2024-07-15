document.addEventListener('DOMContentLoaded', function () {
    loadRecords(); // Fetch records as soon as the page loads
});

function loadRecords() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'customers.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('action=fetch');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                updateTable(response.records);
            } else {
                console.error('Error:', response.message);
            }
        } else {
            console.error('Error fetching records:', xhr.statusText);
        }
    };
}

function updateTable(records) {
    const tableBody = document.getElementById('customersrecordTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.contact_number}</td>
            <td>${record.email}</td>
            <td>${record.credibility_status ? 'Trusted' : 'Not Trusted'}</td>
        `;

        tableBody.appendChild(row);
    });
}

document.getElementById('customersaddRecordBtn').addEventListener('click', function () {
    document.getElementById('customersaddRecordModal').style.display = 'block';
});

document.getElementById('customerseditRecordBtn').addEventListener('click', function () {
    document.getElementById('customerseditRecordModal').style.display = 'block';
});

document.getElementById('customersdeleteRecordBtn').addEventListener('click', function () {
    document.getElementById('customersdeleteRecordModal').style.display = 'block';
});

document.querySelectorAll('.customersclose').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        this.parentElement.parentElement.style.display = 'none';
    });
});

function customerssaveAdd() {
    const customerId = document.getElementById('customersaddCustomerId').value;
    const customerName = document.getElementById('customersaddName').value;
    const contactNumber = document.getElementById('customersaddContactNumber').value;
    const email = document.getElementById('customersaddEmail').value;
    const credibilityStatus = document.getElementById('customersaddCredibilityStatus').checked ? 1 : 0;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'customers.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`action=add&customer_id=${customerId}&customer_name=${customerName}&customer_contact_num=${contactNumber}&customer_email=${email}&credibility_status=${credibilityStatus}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                loadRecords();
                customerscloseModal('customersaddRecordModal');
            } else {
                console.error('Error:', response.message);
            }
        } else {
            console.error('Error adding record:', xhr.statusText);
        }
    };
}

function customerssaveEdit() {
    const customerId = document.getElementById('customerseditCustomerId').value;
    const customerName = document.getElementById('customerseditName').value;
    const contactNumber = document.getElementById('customerseditContactNumber').value;
    const email = document.getElementById('customerseditEmail').value;
    const credibilityStatus = document.getElementById('customerseditCredibilityStatus').checked ? 1 : 0;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'customers.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`action=update&customer_id=${customerId}&customer_name=${customerName}&customer_contact_num=${contactNumber}&customer_email=${email}&credibility_status=${credibilityStatus}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                loadRecords();
                customerscloseModal('customerseditRecordModal');
            } else {
                console.error('Error:', response.message);
            }
        } else {
            console.error('Error updating record:', xhr.statusText);
        }
    };
}

function customersconfirmDelete() {
    const customerId = document.getElementById('customersdeleteCustomerId').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'customers.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`action=delete&customer_id=${customerId}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                loadRecords();
                customerscloseModal('customersdeleteRecordModal');
            } else {
                console.error('Error:', response.message);
            }
        } else {
            console.error('Error deleting record:', xhr.statusText);
        }
    };
}

function customerscloseModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
