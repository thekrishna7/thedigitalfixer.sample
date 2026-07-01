/* counters.js - Numerical Stats Count-up Animations */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);
  
  counterElements.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target') || '0');
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // 2 seconds animation
  const stepTime = 30; // 33 fps
  const steps = duration / stepTime;
  const increment = target / steps;
  let currentVal = 0;
  
  const timer = setInterval(() => {
    currentVal += increment;
    if (currentVal >= target) {
      currentVal = target;
      clearInterval(timer);
    }
    
    // Format outputs (whole number vs float)
    if (Number.isInteger(target)) {
      element.textContent = Math.floor(currentVal) + suffix;
    } else {
      element.textContent = currentVal.toFixed(1) + suffix;
    }
  }, stepTime);
}
