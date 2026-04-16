document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor-follow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Reveal on Scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '2rem 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // Simple fade-in sequence for hero
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('#hero .reveal');
        heroReveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
    }, 100);
});
