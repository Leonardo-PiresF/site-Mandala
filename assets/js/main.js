/* ================================================
   AGÊNCIA MANDALA — main.js
   ================================================ */

/* --- Theme toggle --- */
const html      = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('themeIcon');

const saved = localStorage.getItem('mandala-theme') || 'light';
html.setAttribute('data-theme', saved);
updateIcon(saved);

toggleBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('mandala-theme', next);
    updateIcon(next);
});

function updateIcon(theme) {
    toggleIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

/* --- Menu mobile --- */
const hamburger = document.getElementById('hamburger');
const menuFs    = document.getElementById('menuFs');
const menuLinks = document.querySelectorAll('.menu-fs a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    menuFs.classList.toggle('open');
    document.body.style.overflow = menuFs.classList.contains('open') ? 'hidden' : '';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        menuFs.classList.remove('open');
        document.body.style.overflow = '';
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('open');
        menuFs.classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* --- Header shadow on scroll --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.style.borderBottomColor = window.scrollY > 20
        ? 'rgba(255,255,255,.12)'
        : 'rgba(255,255,255,.07)';
}, { passive: true });

/* --- Smooth scroll com offset do header --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 76;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset - 16,
            behavior: 'smooth'
        });
    });
});
