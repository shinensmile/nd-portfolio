// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navList = document.getElementById('navLinks');
if (mobileMenuBtn && navList) {
  mobileMenuBtn.addEventListener('click', function() {
    // toggle display for mobile
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    navList.style.position = 'absolute';
    navList.style.top = '60px';
    navList.style.left = '0';
    navList.style.right = '0';
    navList.style.flexDirection = 'column';
    navList.style.background = 'rgba(10, 22, 40, 0.98)';
    navList.style.padding = '1rem 2rem';
    navList.style.borderBottom = '1px solid var(--border)';
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Smooth scroll for anchor links (exclude href="#" anchors)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // If mobile nav is open, close it after clicking
    if (window.getComputedStyle(navList).display === 'flex' && window.innerWidth <= 900) {
      navList.style.display = 'none';
    }
  });
});

// Stat counter animation (numeric only)
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const raw = stat.textContent.trim();
    const target = parseInt(raw, 10);
    if (!Number.isFinite(target)) return; // skip non-numeric stats

    let current = 0;
    const increment = Math.max(1, Math.floor(target / 50));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = String(target);
        clearInterval(timer);
      } else {
        stat.textContent = String(Math.floor(current));
      }
    }, 30);
  });
}

// Trigger stat animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);
