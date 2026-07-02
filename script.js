// Smooth animations and interactions

// Check if device prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        // Close mobile menu if open
        const menu = document.querySelector('.menu');
        if (menu && menu.classList.contains('open')) {
          menu.classList.remove('open');
          const burger = document.getElementById('burger');
          if (burger) burger.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// Add gentle parallax effect to hero section (disable on mobile for performance)
const heroSection = document.querySelector('.hero-visual');
const isMobile = window.innerWidth < 900;

if (heroSection && !isMobile && !prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxValue = scrollY * 0.3; // Reduced from 0.5 for smoother effect
    heroSection.style.transform = `translateY(${parallaxValue}px)`;
  }, { passive: true });
}

// Button ripple effect (optimized for mobile)
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    if (e.clientX === 0 && e.clientY === 0) return; // Skip keyboard activation
    
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

// Mobile menu smooth toggle with accessibility
const burger = document.getElementById('burger');
const menu = document.querySelector('.menu');

if (burger && menu) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', !isOpen);
    
    if (!prefersReducedMotion) {
      burger.style.animation = 'smoothRotate 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });
}

// Smooth animations on page load
window.addEventListener('load', () => {
  if (!prefersReducedMotion) {
    document.body.style.animation = 'smoothFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  }
});

// Lazy load images for better mobile performance
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Touch event optimizations for mobile
document.addEventListener('touchstart', function() {}, { passive: true });

// Add focus visible styles for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Log when animations complete
document.addEventListener('animationend', (e) => {
  if (e.animationName === 'fadeInUp' || e.animationName === 'slideInLeft' || e.animationName === 'slideInRight') {
    // Animation completed
  }
});

// ===== CONTACT & CTA BUTTON FUNCTIONALITY =====

// "Get in touch" button - scroll to contacts section
const getInTouchBtn = document.querySelector('.hero .btn-primary');
if (getInTouchBtn) {
  getInTouchBtn.addEventListener('click', () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// "Download Resume" button
const downloadResumeBtn = document.querySelector('.about .btn-primary');
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', () => {
    // Create a link element to download resume
    // Replace 'resume.pdf' with your actual resume file path
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Change this to your resume file
    link.download = 'Maviya_Resume.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show toast notification
    showNotification('Resume download started!', 'success');
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideInUp 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== COPY EMAIL FUNCTIONALITY =====
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailLink.textContent;
    navigator.clipboard.writeText(email).then(() => {
      showNotification('Email copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('Could not copy email', 'error');
    });
    
    // Actually open email client as fallback
    setTimeout(() => {
      window.location.href = emailLink.href;
    }, 500);
  });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const navLinks = document.querySelectorAll('.menu a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// ===== PORTFOLIO PROJECT BUTTON =====
const portfolioBtn = document.querySelector('.card:nth-child(3) .btn-secondary');
if (portfolioBtn) {
  portfolioBtn.addEventListener('click', () => {
    showNotification('Portfolio projects coming soon!', 'info');
  });
}

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = 'Come back! 👋 – Maviya\'s Portfolio';
  } else {
    document.title = 'Maviya – Java Full Stack Developer';
  }
});

