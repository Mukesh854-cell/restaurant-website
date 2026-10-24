let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
console.log(order);

const itemsContainer = document.querySelector('.items-container')

if (order.length === 0) {
    itemsContainer.textContent = 'Your order is empty. Add something from the menu!';
}

