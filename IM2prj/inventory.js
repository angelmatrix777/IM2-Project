document.addEventListener('DOMContentLoaded', () => {
    fetch('session_info.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedin) {
                if (!data.isAdmin) {
                    adminDiv = document.querySelector('.buttons');
                    if (adminDiv) {
                        adminDiv.style.display = "none";
                    }
                }
            } else {
                alert("You are not logged in");
                window.location.href = 'index.html'; // Redirect to login page if not logged in
            }
        })
        .catch(error => console.error('Error fetching session info:', error));
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the modal elements
    var updateStockModal = document.getElementById("updateStockModal");
    var addProductModal = document.getElementById("addProductModal");
    var deleteProductModal = document.getElementById("deleteProductModal");

    // Get the button elements
    var updateStockBtn = document.getElementById("updateStockBtn");
    var addProductBtn = document.getElementById("addProductBtn");
    var deleteProductBtn = document.getElementById("deleteProductBtn");

    // Get the close button elements
    var updateStockClose = document.getElementById("updateStockClose");
    var addProductClose = document.getElementById("addProductClose");
    var deleteProductClose = document.getElementById("deleteProductClose");

    // Event listeners to open modals
    updateStockBtn.addEventListener("click", function () {
        updateStockModal.style.display = "block";
    });

    addProductBtn.addEventListener("click", function () {
        addProductModal.style.display = "block";
    });

    deleteProductBtn.addEventListener("click", function () {
        deleteProductModal.style.display = "block";
    });

    // Event listeners to close modals
    updateStockClose.addEventListener("click", function () {
        updateStockModal.style.display = "none";
    });

    addProductClose.addEventListener("click", function () {
        addProductModal.style.display = "none";
    });

    deleteProductClose.addEventListener("click", function () {
        deleteProductModal.style.display = "none";
    });

    // Close the modal if the user clicks anywhere outside of it
    window.addEventListener("click", function (event) {
        if (event.target == updateStockModal) {
            updateStockModal.style.display = "none";
        }
        if (event.target == addProductModal) {
            addProductModal.style.display = "none";
        }
        if (event.target == deleteProductModal) {
            deleteProductModal.style.display = "none";
        }
    });

    // Handle form submissions
    document.getElementById("updateStockForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch("inventory.php?action=update", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    location.reload();
                }
            });
    });

    document.getElementById("addProductForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch("inventory.php?action=add", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    location.reload();
                }
            });
    });

    document.getElementById("deleteProductForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        fetch("inventory.php?action=delete", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    location.reload();
                }
            });
    });

    // Fetch and display inventory and low stock data
    fetch("inventory.php?action=get_low_stock")
        .then(response => response.json())
        .then(data => {
            var lowStockTable = document.getElementById("lowStockTable").getElementsByTagName("tbody")[0];
            data.forEach(item => {
                var row = lowStockTable.insertRow();
                row.insertCell(0).innerText = item.product_code;
                row.insertCell(1).innerText = item.wood_type;
                row.insertCell(2).innerText = item.size;
                row.insertCell(3).innerText = item.unit;
                row.insertCell(4).innerText = item.quantity;
                row.insertCell(5).innerText = item.location;
                row.insertCell(6).innerText = item.price;
            });
        });

    fetch("inventory.php?action=get_inventory")
        .then(response => response.json())
        .then(data => {
            var inventoryTable = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
            data.forEach(item => {
                var row = inventoryTable.insertRow();
                row.insertCell(0).innerText = item.product_code;
                row.insertCell(1).innerText = item.wood_type;
                row.insertCell(2).innerText = item.size;
                row.insertCell(3).innerText = item.unit;
                row.insertCell(4).innerText = item.quantity;
                row.insertCell(5).innerText = item.location;
                row.insertCell(6).innerText = item.price;
            });
        });
});


document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = 'index.html';
});
