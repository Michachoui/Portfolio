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

// Hover Effect for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});