// Loader
window.addEventListener('load', () => {
    gsap.to('.loader', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
            initAnimations();
        }
    });
});

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Gestion de la Lightbox (Zoom au Clic)
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.badgeuse-thumb').forEach(img => {
    img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);
    });
});

if (closeBtn) {
    const closeModalFunc = () => {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400); 
    };

    closeBtn.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// Custom Vanilla JS Network Canvas
const canvas = document.getElementById('network-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function initCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        particles = [];
        for (let i = 0; i < 55; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        let pointColor = body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)';
        let lineColor = body.classList.contains('light-mode') ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

        // Override for Umbrella Mode
        if(body.classList.contains('umbrella-mode')) {
            pointColor = 'rgba(255, 0, 0, 0.8)';
            lineColor = 'rgba(255, 0, 0, 0.2)';
        }

        ctx.fillStyle = pointColor;
        ctx.strokeStyle = lineColor;

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    draw();
}

// Easter Egg : The Konami Code (STARS) - Version avec Buffer
let keyBuffer = '';
const secretCode = 'stars';

document.addEventListener('keydown', (e) => {
    // On stocke uniquement les touches simples (lettres)
    if (e.key.length === 1) {
        keyBuffer += e.key.toLowerCase();
        // On garde uniquement les 5 dernières frappes
        if (keyBuffer.length > secretCode.length) {
            keyBuffer = keyBuffer.slice(-secretCode.length);
        }
        // Activation si correspondance
        if (keyBuffer === secretCode) {
            activateUmbrellaMode();
            keyBuffer = ''; // Réinitialisation
        }
    }
});

function activateUmbrellaMode() {
    body.classList.toggle('umbrella-mode');
    const titleFirst = document.getElementById('name-first');
    const titleLast = document.getElementById('name-last');

    if(body.classList.contains('umbrella-mode')) {
        titleFirst.innerText = 'Umbrella';
        titleLast.innerText = 'Corp.';
        titleLast.style.color = '#ff0000';
    } else {
        titleFirst.innerText = 'Michel';
        titleLast.innerText = 'Gomez';
        titleLast.style.color = '';
    }
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.from('.reveal', {
        y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: 'power4.out'
    })
    .from('.reveal-title', {
        y: 100, opacity: 0, duration: 1.5, ease: 'expo.out'
    }, "-=1");

    gsap.utils.toArray('.anim-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
    });

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}