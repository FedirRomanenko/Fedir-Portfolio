const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let value = 0;

        const step = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            value += step;

            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            counter.textContent = value;

        }, 20);

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => counterObserver.observe(counter));