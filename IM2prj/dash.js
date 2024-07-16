document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('dash.php');
        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const data = await response.json();

        if (data.error) {
            console.error('Error from server:', data.error);
            return;
        }

        document.getElementById('to-be-packed-count').innerHTML = data.stats.to_be_packed;
        document.getElementById('to-be-shipped-count').innerHTML = data.stats.to_be_shipped;
        document.getElementById('to-be-delivered-count').innerHTML = data.stats.to_be_delivered;

        document.getElementById('quantity-in-hand-count').innerHTML = data.summaries.quantity_in_hand;
        document.getElementById('to-be-received-count').innerHTML = data.summaries.to_be_received;
        document.getElementById('number-of-suppliers-count').innerHTML = data.summaries.number_of_suppliers;
        document.getElementById('number-of-categories-count').innerHTML = data.summaries.number_of_categories;

        const lowStockTable = document.getElementById('low-stock-tbody');
        data.low_stock.forEach((item) => {
            const row = lowStockTable.insertRow();
            row.insertCell(0).innerText = item.product_code;
            row.insertCell(1).innerText = item.wood_type;
            row.insertCell(2).innerText = item.size;
            row.insertCell(3).innerText = item.unit;
            row.insertCell(4).innerText = item.quantity;
            row.insertCell(5).innerText = item.location;
            row.insertCell(6).innerText = item.price;
        });
    } catch (error) {
        console.error('Error:', error);
    }
});