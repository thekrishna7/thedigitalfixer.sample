/* chatbot.js - Interactive Conversational Assistant widget logic */

const CHAT_RESPONSES = {
  "edtech solutions": "We install and configure premium **Smart Classrooms** (Interactive Boards, PTZ Cameras, Podcast Recorders, Recording Studio Setup) and offer enterprise-grade **School ERP software, Student/Teacher Mobile Apps, and Online LMS Systems**. We serve Gwalior, Morena, Jhansi, Datia, and Ambah.",
  "web development": "We engineer high-performance **Business Websites, E-commerce Stores, Android/iOS Mobile Apps, and Custom Management Portals (CRM/ERP)**. Our tech stack is modern and ultra-fast, ensuring high Google Lighthouse scores and robust security.",
  "digital marketing": "Boost your sales and visibility! We specialize in **Search Engine Optimization (SEO), Local SEO Gwalior/Morena, Google PPC Ads, Meta Lead Gen Ads, WhatsApp Marketing, and Corporate Branding**.",
  "contact details": "You can reach us at: <br>📞 **Phone:** +91 81090 65947 <br>✉️ **Email:** fixerthedigital@gmail.com <br>📍 **HQ:** Near Rajiv Gandhi School, Ambah, Morena, MP, India. <br>📍 **Branch:** Farrukhnagar, Gurugram, Haryana, India. <br>Fill our contact form or request a demo for immediate callback!",
  "pricing": "Our pricing packages are tailored for small schools to large enterprises. Basic websites start around ₹15,000, School ERP licenses around ₹25,000, and marketing budgets vary based on leads. Check our [Pricing Page](pricing.html) for full breakdown.",
  "hello": "Hello! How can the team at **The Digital Fixer** help you grow today? We offer EdTech setup, software development, and online marketing services.",
  "hey": "Hello! How can the team at **The Digital Fixer** help you grow today? We offer EdTech setup, software development, and online marketing services."
};

function toggleChatWidget() {
  const widget = document.getElementById('site-chat-widget');
  if (widget) {
    widget.classList.toggle('active');
  }
}

function handleChatOption(optionText) {
  addUserMessage(optionText);
  showBotTyping(optionText);
}

function handleChatSubmit(event) {
  if (event.key === 'Enter') {
    submitChatMessage();
  }
}

function submitChatMessage() {
  const inputEl = document.getElementById('chat-input-text');
  if (!inputEl) return;
  const text = inputEl.value.trim();
  
  if (!text) return;
  
  addUserMessage(text);
  inputEl.value = '';
  
  showBotTyping(text);
}

function addUserMessage(text) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg chat-msg-user';
  msgEl.textContent = text;
  container.appendChild(msgEl);
  scrollToBottom();
}

function showBotTyping(userQuery) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg chat-msg-bot';
  typingEl.id = 'chat-typing-indicator';
  typingEl.innerHTML = `<span style="display:inline-block; animation: float 1s infinite;">•</span> <span style="display:inline-block; animation: float 1s infinite 0.2s;">•</span> <span style="display:inline-block; animation: float 1s infinite 0.4s;">•</span>`;
  container.appendChild(typingEl);
  scrollToBottom();
  
  // Reply after 1 second
  setTimeout(() => {
    typingEl.remove();
    addBotResponse(userQuery);
  }, 1000);
}

function addBotResponse(userQuery) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  const query = userQuery.toLowerCase().trim();
  let response = "I'm sorry, I didn't quite catch that. Would you like to check our EdTech setups, Web Development packages, or speak directly with our team?";
  
  // Basic keywords matching
  for (const key in CHAT_RESPONSES) {
    if (query.includes(key)) {
      response = CHAT_RESPONSES[key];
      break;
    }
  }
  
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg chat-msg-bot';
  msgEl.innerHTML = response;
  container.appendChild(msgEl);
  
  // Append new suggestions to guide the customer
  const optionsEl = document.createElement('div');
  optionsEl.className = 'chat-options';
  optionsEl.innerHTML = `
    <button class="chat-opt-btn" onclick="handleChatOption('EdTech Solutions')">EdTech/Smart Classroom</button>
    <button class="chat-opt-btn" onclick="handleChatOption('Web Development')">Web/App Dev</button>
    <button class="chat-opt-btn" onclick="handleChatOption('Digital Marketing')">SEO & PPC Ads</button>
    <button class="chat-opt-btn" onclick="handleChatOption('Contact details')">Get Call Details</button>
  `;
  msgEl.appendChild(optionsEl);
  
  scrollToBottom();
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages-container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}
