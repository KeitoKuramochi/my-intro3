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
            navbar.style.padding = '0.8rem 5%';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // Logo and Nav Click (Smooth Scroll)
    const logoTop = document.getElementById('logo-top');
    logoTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Floating Badge Click
    const gameBadge = document.getElementById('game-badge');
    gameBadge.addEventListener('click', () => {
        const gameSection = document.getElementById('game-section');
        const navHeight = navbar.offsetHeight;
        window.scrollTo({ top: gameSection.offsetTop - navHeight, behavior: 'smooth' });
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
    const countdownEl = document.getElementById('countdown');

    const startGame = () => {
        score = 0;
        timeLeft = 10;
        gameActive = false; // Not active yet
        scoreEl.textContent = score;
        timerEl.textContent = timeLeft;
        yarnLine.style.width = '0%';
        gameResult.classList.add('hidden');
        startBtn.style.display = 'none';
        
        // Start Countdown
        runCountdown(() => {
            gameActive = true;
            timerId = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        });
    };

    const runCountdown = (callback) => {
        let count = 3;
        countdownEl.classList.remove('hidden');
        countdownEl.textContent = count;
        countdownEl.style.animation = 'none';
        countdownEl.offsetHeight; // trigger reflow
        countdownEl.style.animation = null;

        const countInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
                // Re-trigger animation
                countdownEl.style.animation = 'none';
                countdownEl.offsetHeight;
                countdownEl.style.animation = null;
            } else if (count === 0) {
                countdownEl.textContent = 'START!';
                countdownEl.style.animation = 'none';
                countdownEl.offsetHeight;
                countdownEl.style.animation = null;
            } else {
                clearInterval(countInterval);
                countdownEl.classList.add('hidden');
                callback();
            }
        }, 800);
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

    // Mobile/Click Support for Game
    const gameContainer = document.querySelector('.game-container');
    gameContainer.addEventListener('pointerdown', (e) => {
        if (gameActive && e.target.closest('.game-visual')) {
            handleInput();
            
            // Add a little punch effect on tap
            const ball = document.getElementById('yuan-ball');
            ball.style.transition = 'transform 0.05s ease';
            ball.style.transform += ' scale(1.2)';
            setTimeout(() => {
                ball.style.transition = 'transform 0.1s ease';
            }, 50);
        }
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
});
