/**
 * PachaPacha - Main JavaScript
 * パチャパチャ - メインスクリプト
 * 
 * Table of Contents:
 * 1. Language Management
 * 2. Mobile Menu
 * 3. Scroll Animations
 * 4. Navigation Effects
 * 5. Smooth Scrolling
 * 6. Contact Form (EmailJS)
 * 7. Initialization
 */

// ==========================================================================
// 1. Language Management
// ==========================================================================

/**
 * Current language state
 * Default: Japanese (ja), stored in localStorage
 */
let currentLang = localStorage.getItem('pachapacha-lang') || 'ja';

/**
 * Get current language
 * @returns {string} Current language code ('ja' or 'en')
 */
function getCurrentLang() {
    return localStorage.getItem('pachapacha-lang') || 'ja';
}

/**
 * Set the display language for the entire site
 * @param {string} lang - Language code ('ja' or 'en')
 */
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pachapacha-lang', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    
    // Update all text elements with data-ja and data-en attributes
    document.querySelectorAll('[data-ja]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
    
    // Update placeholders for form inputs
    document.querySelectorAll('[data-placeholder-ja]').forEach(el => {
        const placeholder = el.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            el.placeholder = placeholder;
        }
    });
    
    // Update desktop language buttons
    updateLanguageButtons('lang-ja', 'lang-en', lang);
    
    // Update mobile language buttons
    updateLanguageButtons('mobile-lang-ja', 'mobile-lang-en', lang);
}

/**
 * Update the active state of language toggle buttons
 * @param {string} jaId - ID of the Japanese button
 * @param {string} enId - ID of the English button
 * @param {string} activeLang - Currently active language
 */
function updateLanguageButtons(jaId, enId, activeLang) {
    const jaBtn = document.getElementById(jaId);
    const enBtn = document.getElementById(enId);
    
    if (jaBtn && enBtn) {
        if (activeLang === 'ja') {
            jaBtn.classList.add('active');
            jaBtn.setAttribute('aria-pressed', 'true');
            enBtn.classList.remove('active');
            enBtn.setAttribute('aria-pressed', 'false');
        } else {
            jaBtn.classList.remove('active');
            jaBtn.setAttribute('aria-pressed', 'false');
            enBtn.classList.add('active');
            enBtn.setAttribute('aria-pressed', 'true');
        }
    }
}

// ==========================================================================
// 2. Mobile Menu
// ==========================================================================

/**
 * Toggle the mobile navigation menu
 * Also handles body scroll lock when menu is open
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.querySelector('[aria-controls="mobile-menu"]');
    
    menu.classList.toggle('translate-x-full');
    
    const isOpen = !menu.classList.contains('translate-x-full');
    
    // Update aria-expanded
    if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    
    // Lock/unlock body scroll
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ==========================================================================
// 3. Scroll Animations
// ==========================================================================

/**
 * Reveal elements as they enter the viewport
 * Elements with class 'reveal' will animate in when visible
 */
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 120; // Pixels before element is considered visible
    
    for (let i = 0; i < reveals.length; i++) {
        const elementTop = reveals[i].getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// ==========================================================================
// 4. Navigation Effects
// ==========================================================================

/**
 * Handle navbar background change on scroll
 * Adds solid background when user scrolls down
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('bg-water-950/98');
    } else {
        navbar.classList.remove('bg-water-950/98');
    }
}

// ==========================================================================
// 5. Smooth Scrolling
// ==========================================================================

/**
 * Initialize smooth scrolling for anchor links
 * Accounts for fixed navbar height
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSelector = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetSelector === '#') return;
            
            const target = document.querySelector(targetSelector);
            
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menu = document.getElementById('mobile-menu');
                if (menu && !menu.classList.contains('translate-x-full')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// ==========================================================================
// 6. Contact Form (EmailJS)
// ==========================================================================

/**
 * EmailJS Configuration
 * ============================================================
 * IMPORTANT: Replace these values with your actual EmailJS credentials
 * 
 * Setup instructions:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an email service (Gmail recommended) 
 * 3. Create an email template with these variables:
 *    - {{user_name}} - Sender's name
 *    - {{user_email}} - Sender's email
 *    - {{company}} - Company name
 *    - {{message}} - Message content
 * 4. Replace the values below with your actual IDs
 * ============================================================
 */
const EMAILJS_CONFIG = {
    publicKey: 'rY9Q-SYP1J8wzF0AB',      // From EmailJS Dashboard > Account > API Keys
    serviceId: 'service_fcsamys',      // From EmailJS Dashboard > Email Services
    templateId: 'template_f51blcj'     // From EmailJS Dashboard > Email Templates
};

/**
 * Status messages for the contact form (bilingual)
 */
const formMessages = {
    sending: {
        ja: '送信中...',
        en: 'Sending...'
    },
    success: {
        ja: 'メッセージを送信しました！24時間以内にご連絡いたします。',
        en: 'Message sent successfully! We\'ll contact you within 24 hours.'
    },
    error: {
        ja: '送信に失敗しました。もう一度お試しいただくか、直接メールでお問い合わせください。',
        en: 'Failed to send. Please try again or contact us directly via email.'
    },
    validation: {
        ja: '必須項目をすべて入力してください。',
        en: 'Please fill in all required fields.'
    }
};

/**
 * Show status message on the contact form
 * @param {string} type - Message type ('success', 'error', or 'info')
 * @param {string} messageKey - Key from formMessages object
 */
function showFormStatus(type, messageKey) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    const lang = getCurrentLang();
    formStatus.textContent = formMessages[messageKey][lang];
    
    // Reset classes
    formStatus.classList.remove(
        'hidden', 
        'bg-green-500/20', 'text-green-300', 
        'bg-red-500/20', 'text-red-300', 
        'bg-water-500/20', 'text-water-300'
    );
    
    // Add appropriate styling
    if (type === 'success') {
        formStatus.classList.add('bg-green-500/20', 'text-green-300');
    } else if (type === 'error') {
        formStatus.classList.add('bg-red-500/20', 'text-red-300');
    } else {
        formStatus.classList.add('bg-water-500/20', 'text-water-300');
    }
    
    formStatus.classList.remove('hidden');
}

/**
 * Hide the form status message
 */
function hideFormStatus() {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.classList.add('hidden');
    }
}

/**
 * Set the loading state on the submit button
 * @param {boolean} isLoading - Whether the form is currently submitting
 */
function setFormLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnArrow = document.getElementById('btn-arrow');
    const btnSpinner = document.getElementById('btn-spinner');
    
    if (!submitBtn || !btnText) return;
    
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
        btnText.textContent = formMessages.sending[getCurrentLang()];
        if (btnArrow) btnArrow.classList.add('hidden');
        if (btnSpinner) btnSpinner.classList.remove('hidden');
    } else {
        // Restore original button text based on language
        const lang = getCurrentLang();
        btnText.textContent = lang === 'ja' ? '橋渡しを始める' : 'Start Bridging';
        if (btnArrow) btnArrow.classList.remove('hidden');
        if (btnSpinner) btnSpinner.classList.add('hidden');
    }
}

/**
 * Initialize the contact form with EmailJS
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    // Check if form exists and EmailJS is loaded
    if (!contactForm) return;
    
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS SDK not loaded. Contact form will not work.');
        return;
    }
    
    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_CONFIG.publicKey);
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide any previous status
        hideFormStatus();
        
        // Get form values
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const company = document.getElementById('company')?.value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showFormStatus('error', 'validation');
            return;
        }
        
        // Set loading state
        setFormLoading(true);
        
        // Prepare template parameters
        const templateParams = {
            user_name: name,
            user_email: email,
            company: company || '(未記入 / Not provided)',
            message: message,
            to_email: 'pachapachajp@gmail.com'
        };
        
        // Send email via EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log('EmailJS Success:', response.status, response.text);
                showFormStatus('success', 'success');
                contactForm.reset();
                
                // Track conversion in Google Analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'contact_form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'Contact Form'
                    });
                }
            })
            .catch(function(error) {
                console.error('EmailJS Error:', error);
                showFormStatus('error', 'error');
            })
            .finally(function() {
                setFormLoading(false);
            });
    });
}

// ==========================================================================
// 7. Initialization
// ==========================================================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLang);
    
    // Run initial reveal animation
    reveal();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize contact form
    initContactForm();
});

/**
 * Handle scroll events
 * - Update navbar background
 * - Trigger reveal animations
 */
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    reveal();
});

// Export functions for global access (used in onclick handlers)
window.setLanguage = setLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.getCurrentLang = getCurrentLang;