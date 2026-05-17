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
        // Petit timeout pour laisser le temps au navigateur d'appliquer la transition d'opacité
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
        }, 400); // Attend la fin de la transition CSS
    };

    closeBtn.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tl = gsap.timeline();
    tl.from('.reveal', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.reveal-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
    }, "-=1");

    // Section Scroll Animations
    gsap.utils.toArray('.anim-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}