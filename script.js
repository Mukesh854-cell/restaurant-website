
const statsSection = document.querySelector('.stats-card');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            const numbers = document.querySelectorAll('.numbers span');

            numbers.forEach((el) => {
                const target = el.textContent;
                const cleaned = target.replace('+', '').replace('k', '');
                const isPercentage = target.includes('k+');
                const number = Number(cleaned);

                const totalTicks = 50;
                const step = number / totalTicks;
                let count = 0;

                const interval = setInterval(() => {
                    count += step;
                    if (isPercentage) {
                        el.textContent = Math.floor(count).toLocaleString() + 'k+';
                    } else {
                        el.textContent = Math.floor(count).toLocaleString() + '+';
                    }
                    if (count >= number) {
                        clearInterval(interval)
                    }
                }, 30);
            })
        }
    })
})

observer.observe(statsSection);

const starRating = document.querySelector('.star-rating');
let selectedRating = 0;

starRating.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        selectedRating = Number(event.target.dataset.value);

        allStars = document.querySelectorAll('.star');
        allStars.forEach((star) => {
            const starValue = Number(star.dataset.value);

            if (starValue <= selectedRating) {
                star.style.color = 'gold';
            } else {
                star.style.color = '#ccc';
            }
        })
    }
});

const inputBox = document.querySelector('.input');
const textAreaBox = document.querySelector('.review');
const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputValue = inputBox.value;
    const textAreaValue = textAreaBox.value;

    const newReview = {
        id: Date.now(),
        name: inputValue,
        comment: textAreaValue,
        rating: selectedRating
    };

    reviews.unshift(newReview);

    if (inputValue === '' || textAreaValue === '' || selectedRating === 0) {
        alert('Please fill in all fields');
        return;
    }

    inputBox.value = '';
    textAreaBox.value = '';
    selectedRating = 0;

    allStars.forEach((star) => {
        star.style.color = '#ccc';
    });

    renderReviews();
});

let reviews = [
    { id: 1, name: 'Priya S.', comment: 'Amazing food and warm service!', rating: 5 },
    { id: 2, name: 'Rahul K.', comment: 'Great ambiance, will visit again.', rating: 4 },
    { id: 3, name: 'Jay P.', comment: 'Good food with Good Music in background!', rating: 4 }
];

renderReviews();

const reviewSection = document.querySelector('.review-container');

function renderReviews() {
    const reviewsHTML = reviews.map((review) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        return `
        <div class="review-card">
        <h4>${review.name}</h4>
        <p>${review.comment}</p>
        <p class="stars">${stars}</p>
        </div>
        `;
    });

    document.querySelector('.review-container').innerHTML = reviewsHTML.join('');
}