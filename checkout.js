let order = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
console.log(order);

let orderJustPlaced = false;

const itemsContainer = document.querySelector('.items-container');
const totalPriceContainer = document.querySelector('.total-price-container');

// ORDER FORM
const orderForm = document.querySelector('.order-form');
const nameInput = document.querySelector('.name-input');
const numberInput = document.querySelector('.number-input');
const addressInput = document.querySelector('.address-input');
const instructionsInput = document.querySelector('.instructions');

// OVERLAY CARD
const overlayContainer = document.querySelector('.overlay-container');
const overlayScreen = document.querySelector('.overlay-screen');
const jsTick = document.querySelector('.js-tick');
const jsMsg = document.querySelector('.js-msg');
const jsCloseBtn = document.querySelector('.js-close');

// DESSERT OBJECT
const desserts = [{
    id: 16,
    name: 'Chocolate Brownie',
    img: 'food images/Chocolate Brownie.jpg',
    price: 100,
    category: 'Desserts'
},
{
    id: 17,
    name: 'Chocolate Triffle',
    img: 'food images/Chocolate-trifle.jpg',
    price: 150,
    category: 'Desserts'
},
{
    id: 18,
    name: 'Gulab Jamun (2 pcs)',
    img: 'food images/gulab jamun.jpg',
    price: 50,
    category: 'Desserts'
},
{
    id: 19,
    name: 'Ice Cream Sundae',
    img: 'food images/ice cream sundae.jpg',
    price: 100,
    category: 'Desserts'
},
{
    id: 20,
    name: 'Ice Cream',
    img: 'food images/Ice-Cream.jpg',
    price: 80,
    category: 'Desserts'
},
{
    id: 21,
    name: 'Jalebi (5 pcs)',
    img: 'food images/jalebi.jpg',
    price: 80,
    category: 'Desserts'
},
{
    id: 22,
    name: 'Nutella Waffles',
    img: 'food images/nutella-waffles.jpg',
    price: 180,
    category: 'Desserts'
}];

// MENU ITEMS
const dessertOverlay = document.querySelector('.dessert-overlay');
const dessertCloseBtn = document.querySelector('.close-dessert');
const dessertTitle = document.querySelector('.title');
const dessertImg = document.querySelector('.dessert-img');
const dessertName = document.querySelector('.dessert-name');
const dessertPrice = document.querySelector('.dessert-price');

function pickDessert() {
    return desserts[Math.floor(Math.random() * desserts.length)];
}

function showDessertCard() {
    const dessert = pickDessert();
    dessertTitle.textContent = 'Craving something sweet?';
    dessertImg.src = dessert.img;
    dessertName.textContent = dessert.name;
    dessertPrice.textContent = `₹${dessert.price}`
    dessertOverlay.style.display = 'flex';
}

dessertCloseBtn.addEventListener('click', () => {
    dessertOverlay.style.display = 'none';
})

function renderOrder() {
    if (order.length === 0) {
        itemsContainer.textContent = 'Your order is empty. Add something from the menu!';
        totalPriceContainer.style.display = 'none';
    } else {
        itemsContainer.innerHTML = order.map(createRow).join('');
        totalPriceContainer.innerHTML =
            `
        <div class="bill-items">${order.map(createBillRow).join('')}</div>
         <div class="bill-summary">
            ${createSummaryRow('Subtotal', getSubtotal())}
            ${createSummaryRow('5% Tax', getTax(getSubtotal(), 5))}
        </div>
        <div class="bill-total">${createSummaryRow('Total Cost', getTotal())}</div>
        <p class="bill-thanks">Thank you for choosing Mirch &amp; Mint</p>
        `;
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

function getTax(subtotal, rate) {
    return (subtotal * rate) / 100;
}

function getTotal() {
    return getSubtotal() + getTax(getSubtotal(), 5);
}

// Returns true only if the text is exactly 10 digits (0-9) and nothing else.
// ^ = start of text, [0-9] = one digit, {10} = exactly 10 times, $ = end of text.
function isValidNumber(number) {
    return /^[0-9]{10}$/.test(number);
}

function makeOrderId() {
    return Math.floor(Math.random() * 9000) + 1000;
}

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInputValue = nameInput.value.trim();
    const numberInputValue = numberInput.value.trim();
    const addressInputValue = addressInput.value.trim();
    const instructionsInputValue = instructionsInput.value.trim();

    if (order.length === 0) {
        showOverlay('error', 'Your cart is empty. Add something from the menu first.')
        return;
    }

    if (nameInputValue === '' || numberInputValue === '' || addressInputValue === '') {
        alert('Fill required fields');
        return;
    }

    if (!isValidNumber(numberInputValue)) {
        alert('Invalid phone number');
        return;
    }

    const orderID = makeOrderId();
    showOverlay('success', `Order placed! Your order ID: ${orderID}`);
    orderJustPlaced = true;

    order = [];
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.removeItem('formObject');
    renderOrder();

    nameInput.value = '';
    numberInput.value = '';
    addressInput.value = '';
    instructionsInput.value = '';
})

nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        numberInput.focus();
    }
})

numberInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addressInput.focus();
    }
})

addressInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        instructionsInput.focus();
    }
})

orderForm.addEventListener('input', () => {
    const formObject = {
        name: nameInput.value,
        number: numberInput.value,
        address: addressInput.value,
        instructions: instructionsInput.value
    }

    localStorage.setItem('formObject', JSON.stringify(formObject));
})

const savedFormText = localStorage.getItem('formObject') ? JSON.parse(localStorage.getItem('formObject')) : null;

if (savedFormText) {
    nameInput.value = savedFormText.name;
    numberInput.value = savedFormText.number;
    addressInput.value = savedFormText.address;
    instructionsInput.value = savedFormText.instructions;
}

function showOverlay(type, message) {
    overlayScreen.classList.add(type);

    if (type === 'success') {
        jsTick.textContent = '✓';
        jsTick.style.backgroundColor = 'green';
    } else {
        jsTick.textContent = 'X';
        jsTick.style.backgroundColor = 'red';

    }

    jsMsg.textContent = message;
    overlayContainer.style.display = 'flex';
}

jsCloseBtn.addEventListener('click', () => {
    overlayContainer.style.display = 'none';
    if (orderJustPlaced) {
        orderJustPlaced = false;
        showDessertCard();
    }
})

