let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
console.log(order);

const itemsContainer = document.querySelector('.items-container')

if (order.length === 0) {
    itemsContainer.textContent = 'Your order is empty. Add something from the menu!';
} else {
    itemsContainer.innerHTML = order.map(createRow).join('');
}

function createRow(item) {
   return `
        <div class="item">
                <div class="image-text-container">
                    <div class="food-image">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="content">
                        <h3 class="food-name">${item.name}</h3>
                        <p class="price">₹${item.price}</p>
                    </div>
                </div>
                <div class="quantity-container">
                    <button class="minus" data-id="${item.id}">-</button>
                    <p class="quantity">${item.quantity}</p>
                    <button class="plus" data-id="${item.id}">+</button>
                </div>
        </div>
    `;

}