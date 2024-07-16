document.addEventListener("DOMContentLoaded", function() {
    // Send AJAX request to orders.php
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'orders.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var orders = JSON.parse(xhr.responseText);
            var ordersTable = document.getElementById('ordersTable');
            var tbody = ordersTable.getElementsByTagName('tbody')[0];

            // Loop through each order and add a table row
            orders.forEach(function(order) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${order.customerId}</td>
                    <td>${order.employeeId}</td>
                    <td>${order.orderDateCreated}</td>
                    <td>${order.orderDateCompleted}</td>
                    <td>${order.deliveryAddress}</td>
                    <td>${order.totalCost}</td>
                    <td>${order.datePaid}</td>
                    <td>${order.status}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Error retrieving orders:', xhr.statusText);
        }
    };
    xhr.send();
});