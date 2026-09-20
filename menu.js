const menuItems = [
    {
        id: 1,
        name: 'Paneer Tikka',
        img: 'food images/paneer tikka.webp',
        price: 180,
        category: 'Starters'
    },
    {
        id: 2,
        name: 'Chhole Chaat',
        img: 'food images/chhole-chaat.jpg',
        price: 120,
        category: 'Starters'
    },
    {
        id: 3,
        name: 'Papdi chaat',
        img: 'food images/papdi-chaat.jpg',
        price: 100,
        category: 'Starters'
    },
    {
        id: 4,
        name: 'Pasta',
        img: 'food images/pasta.webp',
        price: 150,
        category: 'Starters'
    },
    {
        id: 5,
        name: 'Veg Spring Roll (4 pcs)',
        img: 'food images/veg spring roll.jpg',
        price: 80,
        category: 'Starters'
    },
    {
        id: 6,
        name: 'Chhole Bhature',
        img: 'food images/chhole bhature.webp',
        price: 100,
        category: 'Main Course'
    },
    {
        id: 7,
        name: 'Chhole',
        img: 'food images/chhole.jpg',
        price: 190,
        category: 'Main Course'
    },
    {
        id: 8,
        name: 'Dosa',
        img: 'food images/dosa.jpg',
        price: 150,
        category: 'Main Course'
    },
    {
        id: 9,
        name: 'Gujarati Thali',
        img: 'food images/gujarati thali.jpg',
        price: 200,
        category: 'Main Course'
    },
    {
        id: 10,
        name: 'Kaju Curry',
        img: 'food images/kaju curry.jpg',
        price: 240,
        category: 'Main Course'
    },
    {
        id: 11,
        name: 'Paneer Lababdar',
        img: 'food images/paneer-lababdar.jpg',
        price: 150,
        category: 'Main Course'
    },
    {
        id: 12,
        name: 'Pav Bhaji',
        img: 'food images/pav-bhaji.jpg',
        price: 180,
        category: 'Main Course'
    },
    {
        id: 13,
        name: 'Pizza',
        img: 'food images/pizza.webp',
        price: 180,
        category: 'Main Course'
    },
    {
        id: 14,
        name: 'Punjabi Thali',
        img: 'food images/Punjabi-Thali.webp',
        price: 250,
        category: 'Main Course'
    },
    {
        id: 15,
        name: 'Rajma Chawal',
        img: 'food images/rajma-chawal.jpg',
        price: 180,
        category: 'Main Course'
    },
    {
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
    },
    {
        id: 23,
        name: 'Cold Coffee',
        img: 'food images/cold coffee.jpg',
        price: 60,
        category: 'Beverages'
    },
    {
        id: 24,
        name: 'Hot Chocolate',
        img: 'food images/hot chocolate.jpg',
        price: 120,
        category: 'Beverages'
    },
    {
        id: 25,
        name: 'Mango Lassi',
        img: 'food images/mango lassi.jpg',
        price: 100,
        category: 'Beverages'
    }
];

const categoryFilter = document.querySelector('.category-filter');
const menuGrid = document.querySelector('.menu-grid');

function renderMenu() {
    const selectedCategory = categoryFilter.value;

    const filteredDished = menuItems.filter((dish) => {
        if (selectedCategory === 'All') {
            return true;
        }
        return dish.category === selectedCategory;
    });

    const items = filteredDished.map((item) => {
        const cardHTML = `
        <div class="dishes-card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button class="order-now" data-id="${item.id}">Order Now</button>
        </div>
        `

        return cardHTML;
    });

    const allCardsHTML = items.join('');

    document.querySelector('.menu-grid').innerHTML = allCardsHTML;
}

renderMenu();

categoryFilter.addEventListener('change', renderMenu);