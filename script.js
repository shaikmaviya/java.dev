// Smooth animations and interactions

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.getAttribute('data-animation');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-animation]').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add smooth parallax effect to hero section
const heroSection = document.querySelector('.hero-visual');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxValue = scrollY * 0.5;
    heroSection.style.transform = `translateY(${parallaxValue}px)`;
  });
}

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Fade in text on load
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach((el, index) => {
  el.style.animation = `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`;
});

// Mobile menu smooth toggle
const burger = document.getElementById('burger');
const menu = document.querySelector('.menu');

if (burger) {
  burger.addEventListener('click', () => {
    menu.classList.toggle('open');
    burger.style.animation = 'smoothRotate 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
}

// Smooth color transitions on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.animation = 'smoothFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Log when animations complete
document.addEventListener('animationend', (e) => {
  if (e.animationName === 'fadeInUp' || e.animationName === 'slideInLeft' || e.animationName === 'slideInRight') {
    // Animation completed
  }
});
