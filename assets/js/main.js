/* main.js - Component Injector and Layout Manager */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Loader
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 500);
    });
    // Fallback if load event already fired or delayed
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 2000);
  }

  // 2. Inject Shared Components
  injectHeader();
  injectFooter();
  injectWidgets();

  // 3. Initialize Shared Navigation Interactions
  initNavigation();

  // 4. Scroll Event Handlers (Header shrink & Back-to-Top trigger)
  initScrollEffects();

  // 5. Initialize Cookie Consent
  initCookieConsent();
});

/* INJECT MAIN HEADER */
function injectHeader() {
  const headerContainer = document.getElementById('global-header');
  if (!headerContainer) return;

  headerContainer.className = 'site-header';

  headerContainer.innerHTML = `
    <div class="container header-container">
      <a href="index.html" class="logo-link">
        <img src="assets/images/logo-medium.png" alt="The Digital Fixer Logo" class="logo-img" onerror="this.src='assets/images/logo.png'">
      </a>
      
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="index.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="about.html" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="services.html" class="nav-link">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <!-- Mega Menu -->
            <div class="mega-menu" style="width: 1000px; grid-template-columns: repeat(4, 1fr); padding: 2rem;">
              <div>
                <h4 class="mega-title" style="color: var(--color-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">Web & Software</h4>
                <ul class="mega-list">
                  <li><a href="website-development.html" class="mega-link">Website Development</a></li>
                  <li><a href="ecommerce-development.html" class="mega-link">E-Commerce Dev</a></li>
                  <li><a href="app-development.html" class="mega-link">Mobile App Dev</a></li>
                  <li><a href="custom-software.html" class="mega-link">Software Dev (ERP/CRM)</a></li>
                  <li><a href="enterprise-solutions.html" class="mega-link">Enterprise Solutions</a></li>
                  <li><a href="cloud-hosting-services.html" class="mega-link">Cloud & Hosting</a></li>
                </ul>
              </div>
              <div>
                <h4 class="mega-title" style="color: var(--color-premium); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">Design & Media</h4>
                <ul class="mega-list">
                  <li><a href="graphic-designing.html" class="mega-link">Graphic Designing</a></li>
                  <li><a href="video-production.html" class="mega-link">Video Production</a></li>
                  <li><a href="publishing-media-solutions.html" class="mega-link">Publishing & Media</a></li>
                  <li><a href="technologies.html" class="mega-link">Our Tech Stack</a></li>
                </ul>
              </div>
              <div>
                <h4 class="mega-title" style="color: var(--color-accent); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">Marketing & SEO</h4>
                <ul class="mega-list">
                  <li><a href="digital-marketing.html" class="mega-link">Digital Marketing</a></li>
                  <li><a href="seo-services.html" class="mega-link">SEO Services</a></li>
                  <li><a href="social-media-marketing.html" class="mega-link">SMM Branding</a></li>
                  <li><a href="paid-advertising.html" class="mega-link">Paid Ads (Google/FB)</a></li>
                  <li><a href="amazon-ecommerce-management.html" class="mega-link">Amazon Store Mgmt</a></li>
                </ul>
              </div>
              <div>
                <h4 class="mega-title" style="color: var(--color-success, #10b981); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">Consulting & AI</h4>
                <ul class="mega-list">
                  <li><a href="ai-solutions.html" class="mega-link">AI & Automation</a></li>
                  <li><a href="cybersecurity-it-support.html" class="mega-link">Cybersecurity & IT</a></li>
                  <li><a href="educational-lms-solutions.html" class="mega-link">Educational & LMS</a></li>
                  <li><a href="business-it-consulting.html" class="mega-link">Business Consulting</a></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="products.html" class="nav-link">Products</a>
          </li>
          <li class="nav-item">
            <a href="portfolio.html" class="nav-link">Case Studies <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
            <div class="mega-menu" style="width: 500px; grid-template-columns: repeat(2, 1fr);">
              <div>
                <h4 class="mega-title">Portfolio</h4>
                <ul class="mega-list">
                  <li><a href="portfolio.html" class="mega-link">Our Projects</a></li>
                  <li><a href="case-studies.html" class="mega-link">Success Stories</a></li>
                  <li><a href="gallery.html" class="mega-link">Media Gallery</a></li>
                </ul>
              </div>
              <div>
                <h4 class="mega-title">Resources</h4>
                <ul class="mega-list">
                  <li><a href="faq.html" class="mega-link">FAQs Center</a></li>
                  <li><a href="blog.html" class="mega-link">Insights Blog</a></li>
                  <li><a href="careers.html" class="mega-link">Careers Hub</a></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="pricing.html" class="nav-link">Pricing</a>
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <!-- Search -->
        <div class="search-container" id="site-search-wrapper">
          <button class="search-btn" aria-label="Open Search" onclick="toggleSearchDropdown()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <div class="search-dropdown">
            <div class="search-input-wrapper">
              <input type="text" id="site-search-input" class="search-input" placeholder="Search services, cities..." onkeyup="handleGlobalSearch(event)">
              <button class="search-submit" onclick="executeSearch()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
            </div>
            <div id="site-search-results" class="search-results"></div>
          </div>
        </div>
        
        <!-- Theme Switcher -->
        <button class="theme-toggle" aria-label="Toggle Dark Mode" onclick="toggleTheme()">
          <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
        
        <!-- Action Buttons -->
        <a href="book-demo.html" class="btn btn-secondary" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">Book Demo</a>
        <a href="contact.html" class="btn btn-primary shine-btn" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">Get Started</a>
        
        <!-- Mobile Toggle Menu -->
        <button class="mobile-toggle" onclick="toggleMobileMenu()" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer" id="mobile-nav-drawer">
      <ul class="mobile-nav-list">
        <li><a href="index.html" class="mobile-nav-link">Home</a></li>
        <li><a href="about.html" class="mobile-nav-link">About Us</a></li>
        <li>
          <a href="#" class="mobile-nav-link" onclick="toggleMobileSubmenu(event, 'mobile-sub-services')">Services <span>+</span></a>
          <ul class="mobile-submenu" id="mobile-sub-services">
            <li><a href="services.html" class="mobile-submenu-link" style="font-weight: bold; color: var(--color-primary);">All Services Catalog</a></li>
            <li><a href="website-development.html" class="mobile-submenu-link">Website Development</a></li>
            <li><a href="ecommerce-development.html" class="mobile-submenu-link">E-Commerce Dev</a></li>
            <li><a href="app-development.html" class="mobile-submenu-link">Mobile App Dev</a></li>
            <li><a href="custom-software.html" class="mobile-submenu-link">Custom Software (ERP/CRM)</a></li>
            <li><a href="digital-marketing.html" class="mobile-submenu-link">Digital Marketing</a></li>
            <li><a href="seo-services.html" class="mobile-submenu-link">SEO Services</a></li>
            <li><a href="ai-solutions.html" class="mobile-submenu-link">AI & Automation</a></li>
            <li><a href="educational-lms-solutions.html" class="mobile-submenu-link">Educational & LMS</a></li>
          </ul>
        </li>
        <li><a href="products.html" class="mobile-nav-link">Products</a></li>
        <li>
          <a href="#" class="mobile-nav-link" onclick="toggleMobileSubmenu(event, 'mobile-sub-resources')">Portfolio & Resources <span>+</span></a>
          <ul class="mobile-submenu" id="mobile-sub-resources">
            <li><a href="portfolio.html" class="mobile-submenu-link">Our Portfolio</a></li>
            <li><a href="case-studies.html" class="mobile-submenu-link">Case Studies</a></li>
            <li><a href="gallery.html" class="mobile-submenu-link">Media Gallery</a></li>
            <li><a href="blog.html" class="mobile-submenu-link">Insights Blog</a></li>
            <li><a href="faq.html" class="mobile-submenu-link">Help & FAQs</a></li>
            <li><a href="careers.html" class="mobile-submenu-link">Careers Hub</a></li>
          </ul>
        </li>
        <li><a href="pricing.html" class="mobile-nav-link">Pricing Plans</a></li>
        <li><a href="contact.html" class="mobile-nav-link">Contact</a></li>
      </ul>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
        <a href="book-demo.html" class="btn btn-secondary">Request Call Demo</a>
        <a href="free-consultation.html" class="btn btn-primary">Free Audit Consultation</a>
      </div>
    </div>
  `;

  // Highlight active page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = headerContainer.querySelectorAll('.nav-link, .mega-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.closest('.nav-item')?.classList.add('active');
    }
  });
}

/* INJECT FOOTER */
function injectFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer) return;

  footerContainer.className = 'site-footer';

  footerContainer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Column 1: Brand details & Newsletter -->
        <div class="footer-logo-wrapper">
          <a href="index.html">
            <img src="assets/images/logo.png" alt="The Digital Fixer Logo" class="footer-logo" onerror="this.src='assets/images/logo-medium.png'">
          </a>
          <p class="footer-badge-text" style="color: var(--color-accent); font-weight: 700; font-family: var(--font-subheading); font-size: 0.85rem; text-transform: uppercase; margin-top: -0.5rem; letter-spacing: 0.05em;">THE DIGITAL FIXER</p>
          <p class="footer-desc">Empowering schools and enterprises with futuristic EdTech integrations, high-performance software engineering, and results-driven marketing solutions.</p>
          
          <div class="footer-badge-block">
            <div class="footer-badge-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span class="footer-badge-text">Empowering Growth Since 2025</span>
          </div>

          <div class="footer-founder-block" style="display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; padding: 0.5rem 0;">
            <img src="assets/images/founder_logo.png" alt="Krishna Sharma" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--color-primary); box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);">
            <span style="font-size: 0.85rem; color: rgba(255,255,255,0.85); font-weight: 600; font-family: var(--font-subheading);">Founded by Krishna Sharma</span>
          </div>

          <div class="footer-newsletter-box">
            <h5 class="footer-newsletter-title">Newsletter</h5>
            <div class="newsletter-pill-form">
              <input type="email" placeholder="Your email" id="fixerthedigital@gmail.com">
              <button class="newsletter-pill-submit" aria-label="Subscribe" onclick="handleFooterSubscribe()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Column 2: Quick Links & App Downloads -->
        <div>
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html" class="footer-link">Home</a></li>
            <li><a href="about.html" class="footer-link">About</a></li>
            <li><a href="services.html" class="footer-link">Services</a></li>
            <li><a href="products.html" class="footer-link">Products</a></li>
            <li><a href="portfolio.html" class="footer-link">Case Studies</a></li>
            <li><a href="careers.html" class="footer-link">Careers</a></li>
            <li><a href="blog.html" class="footer-link">Blog</a></li>
            <li><a href="gallery.html" class="footer-link">Gallery</a></li>
            <li><a href="contact.html" class="footer-link">Contact</a></li>
            <li><a href="sitemap.html" class="footer-link">Sitemap</a></li>
          </ul>
          
          <div class="footer-app-downloads">
            <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.4); font-weight:700; margin-bottom: 0.5rem;">Download Our App</p>
            <a href="https://play.google.com" target="_blank" class="app-btn">
              <span class="app-btn-icon"></span>
              <div class="app-btn-texts">
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </a>
            <a href="https://apple.com" target="_blank" class="app-btn">
              <span class="app-btn-icon"></span>
              <div class="app-btn-texts">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
          </div>
        </div>
        
        <!-- Column 3: Our Services & Payment Partners -->
        <div>
          <h4 class="footer-title">Our Services</h4>
          <ul class="footer-links">
            <li><a href="smart-classroom.html" class="footer-link">Smart Classroom Setup</a></li>
            <li><a href="school-erp.html" class="footer-link">School ERP Platform</a></li>
            <li><a href="website-development.html" class="footer-link">Website Development</a></li>
            <li><a href="app-development.html" class="footer-link">Mobile Applications</a></li>
            <li><a href="custom-software.html" class="footer-link">Custom Software (ERP/CRM)</a></li>
            <li><a href="seo-services.html" class="footer-link">SEO Optimization</a></li>
            <li><a href="paid-advertising.html" class="footer-link">Paid Ads (Google/Meta)</a></li>
          </ul>
          
          <div class="footer-payment-partners">
            <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.4); font-weight:700; width:100%; margin-bottom: 0.5rem;">Payment Partners</p>
            <div class="payment-partner-badge">💳 Visa</div>
            <div class="payment-partner-badge">💳 Mastercard</div>
            <div class="payment-partner-badge">📱 UPI</div>
            <div class="payment-partner-badge">⚡ Razorpay</div>
          </div>
        </div>
        
        <!-- Column 4: Our Promises -->
        <div>
          <h4 class="footer-title">Our Promises</h4>
          <ul class="footer-promises-list">
            <!-- Promise 1 -->
            <li class="footer-promise-item">
              <div class="promise-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="promise-details">
                <span class="promise-title">100% Quality Assurance</span>
                <span class="promise-desc">Premium hardware & clean code</span>
              </div>
            </li>
            <!-- Promise 2 -->
            <li class="footer-promise-item">
              <div class="promise-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div class="promise-details">
                <span class="promise-title">Secure Payments</span>
                <span class="promise-desc">100% encrypted checkout layers</span>
              </div>
            </li>
            <!-- Promise 3 -->
            <li class="footer-promise-item">
              <div class="promise-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              <div class="promise-details">
                <span class="promise-title">Fast & Timely Delivery</span>
                <span class="promise-desc">On schedule milestones execution</span>
              </div>
            </li>
            <!-- Promise 4 -->
            <li class="footer-promise-item">
              <div class="promise-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><polyline points="16 3 16 8 21 8"></polyline><line x1="12" y1="21" x2="12" y2="12"></line></svg>
              </div>
              <div class="promise-details">
                <span class="promise-title">Lifetime Support</span>
                <span class="promise-desc">Dedicated local helpdesk support</span>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- Column 5: Contact Us & Socials -->
        <div>
          <h4 class="footer-title">Contact Us</h4>
          <ul class="footer-contact-list">
            <li class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>HQ: Ambah, Morena, MP | Branch: Gurugram, Haryana</span>
            </li>
            <li class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91 81090 65947</span>
            </li>
            <li class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>fixerthedigital@gmail.com</span>
            </li>
            <li class="footer-contact-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.402.002 9.762-4.332 9.765-9.71.002-2.605-1.01-5.05-2.85-6.892C16.446 2.162 14.015 1.15 11.6 1.15c-5.4.004-9.76 4.339-9.764 9.713-.002 1.704.444 3.371 1.293 4.83l-.995 3.633 3.738-.976-.185-.102zM17.3 14.39c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.29-.48-2.45-1.52-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.5.15-.15.2-.25.3-.49.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.68-.52-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.08 1.06-1.08 2.59 0 1.53 1.11 3.01 1.26 3.21.15.2 2.19 3.34 5.3 4.69.74.32 1.31.51 1.76.66.75.24 1.43.2 1.97.12.6-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.42-.08-.13-.28-.21-.58-.36z"/></svg>
              <a href="https://wa.me/918109065947" target="_blank" style="color:inherit; text-decoration:none;">WhatsApp Us</a>
            </li>
            <li class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Mon-Sat: 10:00 AM - 7:00 PM IST</span>
            </li>
          </ul>
          
          <div class="footer-socials">
            <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(255,255,255,0.4); font-weight:700; margin-bottom: 0.5rem;">Follow Us</p>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" class="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube" class="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg></a>
          </div>
        </div>
      </div>
      
      <!-- Accepted Payments Bar & Copyright -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:2rem; margin-top:2rem;">
        <div class="footer-payments-bar">
          We Accept:
          <span>VISA</span>
          <span>MC</span>
          <span>UPI</span>
          <span>Net Banking</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; color:rgba(255,255,255,0.4);">
          🔒 Secure Payments | 🛡️ 256-bit SSL
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copy">&copy; The Digital Fixer. All Rights Reserved.</div>
        <div class="footer-legal-links">
          <a href="privacy-policy.html" class="footer-legal-link">Privacy Policy</a>
          <a href="terms-and-conditions.html" class="footer-legal-link">Terms & Conditions</a>
          <a href="refund-policy.html" class="footer-legal-link">Refund Policy</a>
          <a href="sitemap.html" class="footer-legal-link">Sitemap</a>
        </div>
      </div>
      
  `;
}

// Add newsletter submit callback
window.handleFooterSubscribe = function () {
  const emailInput = document.getElementById('footer-newsletter-email');
  if (emailInput && emailInput.value) {
    if (typeof showToast === 'function') {
      showToast('Thank you for subscribing!', 'success');
    } else {
      alert('Thank you for subscribing!');
    }
    emailInput.value = '';
  } else {
    if (typeof showToast === 'function') {
      showToast('Please enter your email', 'error');
    } else {
      alert('Please enter your email');
    }
  }
};

/* INJECT FLOATING WIDGETS */
function injectWidgets() {
  const widgetContainer = document.getElementById('global-widgets');
  if (!widgetContainer) return;

  widgetContainer.className = 'floating-widgets';

  widgetContainer.innerHTML = `
    <!-- Back to Top -->
    <button class="floating-btn btn-scroll-top" id="btn-scroll-top" aria-label="Scroll to top" onclick="scrollToTop()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
    
    <!-- WhatsApp Integration -->
    <a href="https://wa.me/918109065947?text=Hi%20The%20Digital%20Fixer,%20I%20am%20interested%20in%20your%20services.%20Please%20connect%20with%20me." target="_blank" class="floating-btn btn-whatsapp" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.402.002 9.762-4.332 9.765-9.71.002-2.605-1.01-5.05-2.85-6.892C16.446 2.162 14.015 1.15 11.6 1.15c-5.4.004-9.76 4.339-9.764 9.713-.002 1.704.444 3.371 1.293 4.83l-.995 3.633 3.738-.976-.185-.102zM17.3 14.39c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.29-.48-2.45-1.52-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.5.15-.15.2-.25.3-.49.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.68-.52-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.08 1.06-1.08 2.59 0 1.53 1.11 3.01 1.26 3.21.15.2 2.19 3.34 5.3 4.69.74.32 1.31.51 1.76.66.75.24 1.43.2 1.97.12.6-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.42-.08-.13-.28-.21-.58-.36z"/></svg>
    </a>
    
    <!-- AI Bot Toggle Bubble -->
    <button class="floating-btn" id="btn-chatbot" aria-label="Open Chatbot" style="background: var(--grad-premium);" onclick="toggleChatWidget()">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </button>
    
    <!-- AI Chatbot Box -->
    <div class="chat-widget" id="site-chat-widget">
      <div class="chat-header">
        <div class="chat-avatar-info">
          <div class="chat-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div>
            <div class="chat-title">TDF AI Assistant</div>
            <div class="chat-subtitle">Online • Fast Responses</div>
          </div>
        </div>
        <button class="chat-close-btn" onclick="toggleChatWidget()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <div class="chat-messages" id="chat-messages-container">
        <div class="chat-msg chat-msg-bot">
          Hello! Welcome to **The Digital Fixer**. How can we transform your school or business today? Choose a query below or type your question.
          <div class="chat-options">
            <button class="chat-opt-btn" onclick="handleChatOption('EdTech Solutions')">EdTech / Smart Boards</button>
            <button class="chat-opt-btn" onclick="handleChatOption('Web Development')">Website & App Dev</button>
            <button class="chat-opt-btn" onclick="handleChatOption('Digital Marketing')">SEO & Ads</button>
            <button class="chat-opt-btn" onclick="handleChatOption('Contact details')">Speak to an Expert</button>
          </div>
        </div>
      </div>
      <div class="chat-input-area">
        <input type="text" id="chat-input-text" class="chat-input" placeholder="Type a message..." onkeydown="handleChatSubmit(event)">
        <button class="chat-send-btn" onclick="submitChatMessage()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
      </div>
    </div>
    
    <!-- Cookie Consent Popup -->
    <div class="cookie-consent" id="cookie-consent-popup">
      <h4 style="margin-bottom: 0.5rem; font-family: var(--font-subheading);">Cookie Consent</h4>
      <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--text-secondary);">We use cookies to optimize your browsing experience. By accepting, you consent to our privacy policies.</p>
      <div class="cookie-buttons">
        <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="acceptCookies()">Accept All</button>
        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="rejectCookies()">Decline</button>
      </div>
    </div>
    
    <!-- Sticky Mobile CTA Bar -->
    <div class="mobile-sticky-cta">
      <a href="https://wa.me/918109065947?text=Hi%20The%20Digital%20Fixer,%20I'd%20like%20to%20enquire%20about%20a%20service." class="btn btn-secondary" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.8rem; justify-content: center; background-color: #25d366; color: white; border: none;">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 0.25rem;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.402.002 9.762-4.332 9.765-9.71.002-2.605-1.01-5.05-2.85-6.892C16.446 2.162 14.015 1.15 11.6 1.15c-5.4.004-9.76 4.339-9.764 9.713-.002 1.704.444 3.371 1.293 4.83l-.995 3.633 3.738-.976-.185-.102zM17.3 14.39c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.29-.48-2.45-1.52-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.5.15-.15.2-.25.3-.49.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.24-.24-.59-.49-.51-.68-.52-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.08 1.06-1.08 2.59 0 1.53 1.11 3.01 1.26 3.21.15.2 2.19 3.34 5.3 4.69.74.32 1.31.51 1.76.66.75.24 1.43.2 1.97.12.6-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.42-.08-.13-.28-.21-.58-.36z"/></svg> WhatsApp
      </a>
      <a href="book-demo.html" class="btn btn-primary" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.8rem; justify-content: center;">
        Book Demo
      </a>
      <a href="free-consultation.html" class="btn btn-secondary" style="flex: 1; padding: 0.6rem 0.5rem; font-size: 0.8rem; justify-content: center; border-color: var(--color-primary); color: var(--color-primary);">
        Free Audit
      </a>
    </div>
  `;
}

/* NAVBAR SCROLL SHRUNK */
function initScrollEffects() {
  const header = document.getElementById('global-header');
  const scrollTopBtn = document.getElementById('btn-scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* NAVIGATION MOBILE DRAWER TOGGLES */
function initNavigation() {
  // Close menu on click outside search wrapper
  document.addEventListener('click', (e) => {
    const searchWrapper = document.getElementById('site-search-wrapper');
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      searchWrapper.classList.remove('active');
    }
  });
}

function toggleMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.classList.toggle('active');
    drawer.classList.toggle('active');
  }
}

function toggleMobileSubmenu(event, submenuId) {
  event.preventDefault();
  const submenu = document.getElementById(submenuId);
  const trigger = event.currentTarget;

  if (submenu) {
    submenu.classList.toggle('active');
    const span = trigger.querySelector('span');
    if (span) {
      span.textContent = submenu.classList.contains('active') ? '-' : '+';
    }
  }
}

/* SEARCH DROPDOWN TOGGLE */
function toggleSearchDropdown() {
  const searchWrapper = document.getElementById('site-search-wrapper');
  if (searchWrapper) {
    searchWrapper.classList.toggle('active');
    if (searchWrapper.classList.contains('active')) {
      setTimeout(() => document.getElementById('site-search-input')?.focus(), 100);
    }
  }
}

/* COOKIE CONSENT FUNCTIONS */
function initCookieConsent() {
  const consentPopup = document.getElementById('cookie-consent-popup');
  if (!consentPopup) return;

  const accepted = localStorage.getItem('cookie-consent');
  if (!accepted) {
    setTimeout(() => {
      consentPopup.classList.add('visible');
    }, 3000);
  }
}

function acceptCookies() {
  localStorage.setItem('cookie-consent', 'accepted');
  document.getElementById('cookie-consent-popup')?.classList.remove('visible');
}

function rejectCookies() {
  localStorage.setItem('cookie-consent', 'declined');
  document.getElementById('cookie-consent-popup')?.classList.remove('visible');
}
