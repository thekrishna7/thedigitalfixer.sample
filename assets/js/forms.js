/* forms.js - Client Side Validations, Button Loaders, Toast Notification Alerts */

document.addEventListener('DOMContentLoaded', () => {
  // Create toast container dynamically if not exists
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Attach listeners to all forms
  initFormHandlers();
});

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>` : 
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  
  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);
  
  // Slide out and remove
  setTimeout(() => {
    toast.style.animation = 'fadeInOut 0.5s reverse forwards';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

function initFormHandlers() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!validateForm(this)) {
        return; // Failed validation
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      // Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="loader-spinner" style="width:20px; height:20px; border-width:2px; margin:0; display:inline-block; vertical-align:middle; margin-right:8px;"></span> Sending...`;
      }

      // Collect data fields dynamically
      const data = {
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        sourceUrl: window.location.href
      };
      
      const inputs = this.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const val = input.value.trim();
        if (!val) return;
        
        const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
        const labelText = (input.closest('.form-group')?.querySelector('label')?.textContent || '').toLowerCase();
        const inputName = (input.getAttribute('name') || '').toLowerCase();
        
        // Match Email
        if (input.type === 'email' || inputName.includes('email')) {
          data.email = val;
        }
        // Match Phone
        else if (input.type === 'tel' || placeholder.includes('phone') || placeholder.includes('mobile') || labelText.includes('phone') || labelText.includes('mobile') || inputName.includes('phone') || inputName.includes('tel')) {
          data.phone = val;
        }
        // Match Name
        else if (placeholder.includes('name') || labelText.includes('name') || inputName.includes('name')) {
          data.name = val;
        }
        // Match Company
        else if (placeholder.includes('company') || labelText.includes('company') || placeholder.includes('organization') || inputName.includes('company')) {
          data.company = val;
        }
        // Match Message
        else if (input.tagName.toLowerCase() === 'textarea' || placeholder.includes('message') || placeholder.includes('detail') || labelText.includes('message') || labelText.includes('detail') || inputName.includes('message')) {
          data.message = val;
        }
        // Match Service Selection
        else if (input.tagName.toLowerCase() === 'select' || placeholder.includes('service') || labelText.includes('service') || labelText.includes('interest') || inputName.includes('service')) {
          data.service = val;
        }
        // General text inputs
        else if (input.type === 'text') {
          if (!data.name && (placeholder.includes('name') || labelText.includes('name'))) {
            data.name = val;
          } else if (!data.company && (placeholder.includes('company') || labelText.includes('company'))) {
            data.company = val;
          } else if (!data.service && (placeholder.includes('service') || labelText.includes('service'))) {
            data.service = val;
          } else {
            data.message = (data.message ? data.message + '\n' : '') + placeholder + ': ' + val;
          }
        }
      });

      // Fallbacks for specific forms (e.g. newsletter)
      const isNewsletter = this.classList.contains('newsletter-form') || this.id === 'newsletter-form';
      if (isNewsletter) {
        data.name = data.name || 'Newsletter Subscriber';
        data.phone = data.phone || '9999999999'; // Dummy number to satisfy database/validator checks
        data.service = data.service || 'Newsletter Subscription';
        data.message = data.message || 'Subscribed to the newsletter alerts.';
      }

      // Fallback service title matching from page title
      if (!data.service) {
        data.service = document.title.split('|')[0].trim() || 'General Enquiry';
      }
      if (!data.name) {
        data.name = 'Web Lead';
      }
      if (!data.phone) {
        data.phone = '0000000000';
      }

      try {
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        // Restore submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (response.ok) {
          showToast('Enquiry submitted successfully!', 'success');
          form.reset();
          
          if (!isNewsletter) {
            setTimeout(() => {
              window.location.href = 'thank-you.html';
            }, 500);
          }
        } else {
          showToast(result.error || 'Submission failed. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Submission error:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        showToast('Server connection failed. Please retry.', 'error');
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  
  inputs.forEach(input => {
    // Clear existing error outline
    input.style.borderColor = '';
    
    // Check blank
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      showToast(`${input.getAttribute('placeholder') || input.name || 'Required field'} cannot be empty`, 'error');
      isValid = false;
    }
    
    // Check Email format
    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        input.style.borderColor = '#ef4444';
        showToast('Please enter a valid email address', 'error');
        isValid = false;
      }
    }
    
    // Check Phone format (10 digit Indian code)
    if (input.type === 'tel' && input.value.trim()) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(input.value.trim().replace(/\D/g, '').slice(-10))) {
        input.style.borderColor = '#ef4444';
        showToast('Please enter a valid 10-digit mobile number', 'error');
        isValid = false;
      }
    }
  });
  
  return isValid;
}
