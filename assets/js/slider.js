/* slider.js - Custom Responsive Carousels and Slideshows */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
  initInfiniteMarquee();
});

/* TESTIMONIAL SLIDER (Google Reviews Style) */
function initTestimonialSlider() {
  const thumbnailTrack = document.getElementById('thumbnail-reviews-track');
  const dotsContainer = document.getElementById('review-dots');

  const featuredStars = document.getElementById('featured-stars');
  const featuredText = document.getElementById('featured-text');
  const featuredAvatar = document.getElementById('featured-avatar');
  const featuredName = document.getElementById('featured-name');
  const featuredRole = document.getElementById('featured-role');
  const featuredLocation = document.getElementById('featured-location');
  const featuredCard = document.getElementById('featured-review-card');
  const helpfulBtn = document.querySelector('.helpful-btn');

  if (!thumbnailTrack || !featuredCard) return;

  const reviewsData = [
    {
      name: "Piyush Sharma",
      stars: 5,
      text: "The Digital Fixer delivered an excellent Smart Board, PTZ Camera, and professional studio setup for our live classes. Special thanks to Krishna Sharma for the seamless execution and support.",
      role: "Founder & Director, Panacea of English",
      location: "Ambah",
      avatarBg: "#0ea5e9",
      initial: "P"
    },

    {
      name: "Ajay Sharma",
      stars: 5,
      text: "Outstanding Smart Classroom and Live Streaming setup by The Digital Fixer. The entire installation was completed professionally and has greatly improved our online teaching experience.",
      role: "Founder, Ajay Classes",
      location: "Morena",
      avatarBg: "#8b5cf6",
      initial: "A"
    },

    {
      name: "Mohit Sharma",
      stars: 5,
      text: "The Digital Fixer transformed our teaching setup with a high-quality PTZ Camera, Smart Board, and complete studio installation. Excellent service and technical support throughout the project.",
      role: "Founder, Mohit Classes",
      location: "Dholpur",
      avatarBg: "#f59e0b",
      initial: "M"
    },

    {
      name: "Brezza Biotech Team",
      stars: 5,
      text: "The Digital Fixer successfully developed our website, mobile application, and complete digital infrastructure. Professional work, creative designs, and excellent support by Krishna Sharma and his team.",
      role: "Management Team, Brezza Biotech Pvt. Ltd.",
      location: "Jaipur",
      avatarBg: "#10b981",
      initial: "B"
    },

    {
      name: "Fern Pharma Team",
      stars: 5,
      text: "An exceptional experience working with The Digital Fixer for our website, app development, and project designs. Highly professional team with innovative solutions and timely delivery.",
      role: "Management Team, Fern Pharma Pvt. Ltd.",
      location: "Jaipur",
      avatarBg: "#ef4444",
      initial: "F"
    },

    {
      name: "Tech Innovators India",
      stars: 5,
      text: "The Digital Fixer provided outstanding digital solutions, from website development to complete project execution. Special thanks to Krishna Sharma for his professionalism and dedication.",
      role: "Management Team, Tech Innovators India",
      location: "India",
      avatarBg: "#6366f1",
      initial: "T"
    },


  ];

  let currentIndex = 0;
  const reviewCount = reviewsData.length;
  let autoPlayInterval;

  // 1. Helper function to generate stars HTML
  function getStarsHtml(stars) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= stars ? 'filled' : ''}">★</span>`;
    }
    return html;
  }

  // 2. Generate Thumbnails and Dots
  function setupDOM() {
    thumbnailTrack.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    reviewsData.forEach((review, index) => {
      // Create Thumbnail Card
      const thumbCard = document.createElement('div');
      thumbCard.className = `thumbnail-card ${index === currentIndex ? 'active' : ''}`;
      thumbCard.setAttribute('data-index', index);
      thumbCard.innerHTML = `
        <div class="stars-group">
          ${getStarsHtml(review.stars)}
        </div>
        <p class="thumbnail-text">"${review.text}"</p>
        <div class="reviewer-summary">
          <div class="thumbnail-avatar" style="background: ${review.avatarBg};">${review.initial}</div>
          <span class="thumbnail-name">${review.name}</span>
        </div>
      `;

      thumbCard.addEventListener('click', () => {
        selectReview(index);
      });
      thumbnailTrack.appendChild(thumbCard);

      // Create Pagination Dot
      if (dotsContainer) {
        const dot = document.createElement('button');
        dot.className = `review-dot ${index === currentIndex ? 'active' : ''}`;
        dot.ariaLabel = `Go to review ${index + 1}`;
        dot.addEventListener('click', () => {
          selectReview(index);
        });
        dotsContainer.appendChild(dot);
      }
    });
  }

  // 3. Render Active Review
  function renderActiveReview() {
    const review = reviewsData[currentIndex];

    // Add transition fade-out
    featuredCard.classList.add('fade-out');

    setTimeout(() => {
      // Swap content
      featuredStars.innerHTML = getStarsHtml(review.stars);
      featuredText.textContent = `"${review.text}"`;
      featuredAvatar.textContent = review.initial;
      featuredAvatar.style.background = review.avatarBg;
      featuredName.textContent = review.name;
      featuredRole.textContent = review.role;
      featuredLocation.textContent = review.location;

      // Reset Helpful button state
      if (helpfulBtn) {
        helpfulBtn.classList.remove('clicked');
        helpfulBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/></svg> Helpful`;
      }

      // Update active classes in thumb cards
      const thumbCards = thumbnailTrack.querySelectorAll('.thumbnail-card');
      thumbCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === currentIndex);
      });

      // Scroll active thumb into view smoothly if overflowed
      const activeCard = thumbnailTrack.querySelector(`.thumbnail-card[data-index="${currentIndex}"]`);
      if (activeCard) {
        const trackScrollLeft = thumbnailTrack.parentElement.scrollLeft;
        const trackWidth = thumbnailTrack.parentElement.offsetWidth;
        const cardLeft = activeCard.offsetLeft;
        const cardWidth = activeCard.offsetWidth;

        if (cardLeft < trackScrollLeft || (cardLeft + cardWidth) > (trackScrollLeft + trackWidth)) {
          thumbnailTrack.parentElement.scrollTo({
            left: cardLeft - (trackWidth / 2) + (cardWidth / 2),
            behavior: 'smooth'
          });
        }
      }

      // Update active classes in dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.review-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }

      // Remove transition fade-out
      featuredCard.classList.remove('fade-out');
    }, 250);
  }

  // 4. Select Review wrapper
  function selectReview(index) {
    if (currentIndex === index) return;
    currentIndex = index;
    renderActiveReview();
    resetAutoPlay();
  }

  // 5. Auto Play management
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % reviewCount;
      renderActiveReview();
    }, 6000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // 6. Set up Helpful Button Action
  if (helpfulBtn) {
    helpfulBtn.addEventListener('click', () => {
      helpfulBtn.classList.toggle('clicked');
      if (helpfulBtn.classList.contains('clicked')) {
        helpfulBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg> Marked Helpful`;
      } else {
        helpfulBtn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/></svg> Helpful`;
      }
    });
  }

  // 7. Initialize
  setupDOM();
  renderActiveReview();
  startAutoPlay();

  // Pause autoplay on mouse hover
  const sliderContainer = document.querySelector('.google-reviews-section') || featuredCard.parentElement.parentElement;
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
}


/* INFINITE LOGO MARQUEE */
function initInfiniteMarquee() {
  const marqueeTracks = document.querySelectorAll('.marquee-track');

  marqueeTracks.forEach(track => {
    // Duplicate the contents to create seamless loop
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;
  });
}
