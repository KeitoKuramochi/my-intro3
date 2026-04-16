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

    // Mini Game Logic
    let score = 0;
    let timeLeft = 10;
    let gameActive = false;
    let timerId = null;

    const timerEl = document.getElementById('timer');
    const scoreEl = document.getElementById('score');
    const finalScoreEl = document.getElementById('final-score');
    const yarnBall = document.getElementById('yuan-ball');
    const yarnLine = document.getElementById('yarn-line');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const gameResult = document.getElementById('game-result');

    const startGame = () => {
        score = 0;
        timeLeft = 10;
        gameActive = true;
        scoreEl.textContent = score;
        timerEl.textContent = timeLeft;
        yarnLine.style.width = '0%';
        gameResult.classList.add('hidden');
        startBtn.style.display = 'none';
        
        timerId = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    };

    const endGame = () => {
        gameActive = false;
        clearInterval(timerId);
        finalScoreEl.textContent = score;
        gameResult.classList.remove('hidden');
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Retry';
    };

    const handleInput = () => {
        if (!gameActive) return;
        
        score++;
        scoreEl.textContent = score;
        
        // Visual effects
        const rotation = score * 20;
        yarnBall.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(score * 0.5) * 0.1})`;
        
        // Yarn unraveling progress (max 100%)
        const progress = Math.min(score / 2, 100); 
        yarnLine.style.width = `${progress}%`;
    };

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent scrolling
            handleInput();
        }
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
