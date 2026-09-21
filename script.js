
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

    if (inputValue === '' || textAreaValue === '' || selectedRating === 0) {
        alert('Please fill in all fields');
        return;
    }

    console.log('Reached clearing step');

    inputBox.value = '';
    textAreaBox.value = '';
    selectedRating = 0;

    allStars.forEach((star) => {
        star.style.color = '#ccc';
    });

});