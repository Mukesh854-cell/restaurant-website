let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
console.log(order);

const itemsContainer = document.querySelector('.items-container');
const totalPriceContainer = document.querySelector('.total-price-container');

function renderOrder() {
    if (order.length === 0) {
        itemsContainer.textContent = 'Your order is empty. Add something from the menu!';
        totalPriceContainer.style.display = 'none';
    } else {
        itemsContainer.innerHTML = order.map(createRow).join('');
        totalPriceContainer.innerHTML = `<div class="bill-items">${order.map(createBillRow).join('')}</div> <div class="bill-summary">${createSummaryRow('Subtotal', getSubtotal())}</div>`;
    }
}
renderOrder();

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

itemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('minus')) {
        const itemId = event.target.dataset.id;

        const clickedItem = order.find((item) => {
            return item.id === Number(itemId);
        })

        clickedItem.quantity -= 1;
        if (clickedItem.quantity <= 0) {
            order = order.filter((item) => {
                return item.id !== Number(itemId);
            });
        }
        localStorage.setItem('order', JSON.stringify(order));
        renderOrder();
    } else if (event.target.classList.contains('plus')) {
        const productId = event.target.dataset.id;

        const clickedProduct = order.find((product) => {
            return product.id === Number(productId);
        })

        clickedProduct.quantity += 1;
        localStorage.setItem('order', JSON.stringify(order));
        renderOrder();
    }

})

function getSubtotal() {
    return order.reduce((accumulator, current) => {
        return accumulator + (current.quantity * current.price);
    }, 0)
}
console.log(getSubtotal());


function createBillRow(item) {
    return `
        <div class="bill-row">
            <span class="item-name">${item.name}</span>
            <div class="price-container">
                <span class="dish-quantity">(${item.price}x${item.quantity})</span>
                <span class="item-price">₹${item.price * item.quantity}</span>
            </div>
        </div>
    `
}

function createSummaryRow(label, amount) {
    return `
        <div class="bill-row">
            <span class="subtotal">${label}</span>
            <span class="amount">₹${amount}</span>
        </div>
    `
}