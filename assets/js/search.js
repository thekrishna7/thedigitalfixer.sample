/* search.js - Client Side Site Search Index Database */

// Site content database index
const SEARCH_INDEX = [
  { title: "EdTech Solutions Overview", description: "Smart classroom, interactive panels, PTZ cameras, LMS, and ERP solutions for schools.", url: "edtech-solutions.html", tags: ["smart boards", "interactive panels", "studio setup", "school", "college", "morena", "gwalior"] },
  { title: "Smart Classroom Setup", description: "Modern teaching tools, PTZ cameras, audio systems, podcast recording studio installation in Gwalior and Jhansi.", url: "smart-classroom.html", tags: ["boards", "panels", "cameras", "installation", "podcast", "morena", "jhansi"] },
  { title: "School ERP Systems", description: "Fee management, online exams, digital attendance tracking, student & teacher apps.", url: "school-erp.html", tags: ["erp", "fee", "attendance", "exams", "portal", "student app"] },
  { title: "Learning Management System (LMS)", description: "Web-based learning platforms for educational institutions and coaching centers.", url: "learning-management-system.html", tags: ["lms", "online courses", "coaching portal", "classroom"] },
  { title: "Website Development Gwalior", description: "Corporate business websites, custom portals, high speed HTML websites, and e-commerce stores.", url: "website-development.html", tags: ["websites", "ecommerce", "gwalior", "web design", "hosting", "ambah"] },
  { title: "Mobile App Development", description: "High-performance Android and iOS applications with advanced API integrations.", url: "app-development.html", tags: ["apps", "android", "ios", "play store", "apple", "app store"] },
  { title: "Custom Software Engineering", description: "Tailored CRM, ERP development, library management systems, and restaurant portals.", url: "custom-software.html", tags: ["crm", "custom software", "management system", "database", "morena"] },
  { title: "Digital Marketing Agency Morena", description: "Search Engine Optimization (SEO), Local SEO, PPC Google/Meta Ads, and Content Marketing.", url: "digital-marketing.html", tags: ["marketing", "seo", "google ads", "branding", "leads", "morena"] },
  { title: "SEO Services Datia", description: "Rank your business #1 on Google Maps and search results in Datia, Morena, Gwalior.", url: "seo-services.html", tags: ["seo", "google maps", "local seo", "rankings", "datia", "morena"] },
  { title: "Google PPC Advertising", description: "Paid ad campaigns, Lead Generation campaigns, conversions, budget setups.", url: "google-ads.html", tags: ["ppc", "google ads", "adwords", "leads", "pay per click"] },
  { title: "Social Media Marketing SMM", description: "Increase brand visibility on Facebook, Instagram, LinkedIn, and YouTube.", url: "social-media-marketing.html", tags: ["smm", "facebook", "instagram", "posters", "branding", "gwalior"] },
  { title: "About The Digital Fixer", description: "Our company story, mission, founder message, core values, certifications.", url: "about.html", tags: ["founder", "team", "values", "story", "roadmap"] },
  { title: "Our Portfolio & Projects", description: "Explore our past website designs, ERP installations, and digital marketing success.", url: "portfolio.html", tags: ["case studies", "projects", "work", "examples", "gallery"] },
  { title: "Pricing & Packages", description: "Affordable premium pricing models for ERP, web designs, and marketing services.", url: "pricing.html", tags: ["cost", "packages", "rates", "invoice", "quote"] },
  { title: "Careers & Internships", description: "Join our dynamic team. Explore developer, designer, and marketer job listings.", url: "careers.html", tags: ["jobs", "hiring", "developer", "marketing job", "join us"] },
  { title: "Frequently Asked Questions FAQ", description: "Find immediate answers regarding installations, software license, and pricing.", url: "faq.html", tags: ["help", "support", "answers", "questions", "boards warranty"] }
];

function toggleSearchDropdown() {
  const searchWrapper = document.getElementById('site-search-wrapper');
  if (searchWrapper) {
    searchWrapper.classList.toggle('active');
    if (searchWrapper.classList.contains('active')) {
      setTimeout(() => document.getElementById('site-search-input')?.focus(), 100);
    }
  }
}

function handleGlobalSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('site-search-results');
  
  if (!resultsContainer) return;
  
  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  const filtered = SEARCH_INDEX.filter(item => {
    return item.title.toLowerCase().includes(query) || 
           item.description.toLowerCase().includes(query) ||
           item.tags.some(tag => tag.toLowerCase().includes(query));
  });
  
  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<div class="search-result-item" style="color: var(--text-tertiary);">No results found for "${event.target.value}"</div>`;
    return;
  }
  
  resultsContainer.innerHTML = filtered.map(item => `
    <a href="${item.url}" class="search-result-item" style="display: block; text-decoration: none; padding: 0.6rem; transition: background var(--transition-fast);">
      <strong style="color: var(--color-primary); font-size: 0.9rem; display:block; margin-bottom: 0.15rem;">${item.title}</strong>
      <p style="font-size: 0.75rem; margin: 0; color: var(--text-secondary); line-height: 1.3;">${item.description}</p>
    </a>
  `).join('');
}

function executeSearch() {
  const query = document.getElementById('site-search-input')?.value;
  if (query) {
    // For general submit, go to services page or filter if applicable.
    // For now we rely on the live instant dropdown search.
    window.location.href = `services.html?search=${encodeURIComponent(query)}`;
  }
}
