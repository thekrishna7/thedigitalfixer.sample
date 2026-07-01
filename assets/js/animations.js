/* animations.js - Scroll Reveals, Custom Cursors, Typing Effects, and Magnetics */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Cursor (only on non-touch devices) - Disabled as requested
  // initCustomCursor();
  
  // 2. Initialize Scroll Reveal Observers
  initScrollReveals();
  
  // 3. Initialize Magnetic Button Hover Vectors
  initMagneticButtons();

  // 4. Initialize Hero Typing Effect
  initTypingEffect();

  // 5. Initialize Accordion FAQ Triggers
  initFaqAccordion();
});

/* CUSTOM CURSOR */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile
  
  const cursor = document.createElement('div');
  const dot = document.createElement('div');
  cursor.className = 'custom-cursor';
  dot.className = 'custom-cursor-dot';
  
  document.body.appendChild(cursor);
  document.body.appendChild(dot);
  
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
  
  // Expand cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, input, select, textarea, .faq-trigger, .bento-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '45px';
      cursor.style.height = '45px';
      cursor.style.backgroundColor = 'rgba(14, 165, 233, 0.1)';
      cursor.style.borderColor = 'var(--color-accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.borderColor = 'var(--color-primary)';
    });
  });
}

/* SCROLL REVEALS */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-up');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once active to prevent multiple triggers
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* MAGNETIC BUTTONS */
function initMagneticButtons() {
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .floating-btn, .social-icon');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull element slightly (max 10px translate)
      this.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/* TYPING TEXT EFFECT */
function initTypingEffect() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;
  
  const words = JSON.parse(textElement.getAttribute('data-words') || '["EdTech Solutions", "Web & Software Development", "Digital Marketing", "AI & Custom ERPs"]');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at the end of the word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000);
}

/* FAQ ACCORDIONS */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    
    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = '0px';
        });
        
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          content.style.maxHeight = '0px';
        }
      });
    }
  });
}
