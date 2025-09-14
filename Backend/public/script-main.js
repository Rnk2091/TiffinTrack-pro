// Fetch and display menu
fetch('http://localhost:3000/')
.then(res => res.json())
.then(menu => {
    const menuList = document.getElementById('menu-list');
    menu.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.id}. ${item.item} - ₹${item.price}`;
        menuList.appendChild(li);
    });
});

// Handle order form
document.getElementById('order-form').addEventListener('submit', function(e){
    e.preventDefault();
    const itemId =parseInt(document.getElementById('itemId').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ itemId, quantity })
    })
    .then(res => res.json())
    .then(data => {
        const result = document.getElementById('order-result');
        result.textContent = `${data.message} - ${data.item} *${data.quantity} = ₹${data.total}`;
    });
});