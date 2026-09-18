const statsSection = document.querySelector('.stats-card');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            const numbers = document.querySelectorAll('.numbers span');

            numbers.forEach((el) => {
                const target = el.textContent;
                const cleaned = target.replace('+', '').replace('k', '');
                const isPercentage = target.includes('k' + '+');
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
                }, 20);
            })
        }
    })
})

observer.observe(statsSection);