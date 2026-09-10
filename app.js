/**
 * TRAVEL BOX HOLIDAYS - INTERACTIVE SCRIPT
 * Location: Exhibition Road, Patna, Bihar
 * Contact / WhatsApp: +91 96544 22590
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Navbar Transition on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Hero Background Image Slideshow
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6000);
  }

  // 4. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 5. Service Category Tabs Switcher
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const servicePanels = document.querySelectorAll('.service-panel');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-category');

      // Update button active state
      serviceTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
        b.classList.add('bg-transparent', 'text-charcoal', 'border-sand/40');
      });
      btn.classList.add('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
      btn.classList.remove('bg-transparent', 'text-charcoal', 'border-sand/40');

      // Switch panels
      servicePanels.forEach(panel => {
        if (panel.id === targetCategory) {
          panel.classList.remove('hidden');
          setTimeout(() => panel.classList.add('active'), 20);
        } else {
          panel.classList.remove('active');
          panel.classList.add('hidden');
        }
      });
    });
  });

  // 6. Destination Quick Inquire
  const destinationCards = document.querySelectorAll('.destination-card');
  const destinationInput = document.getElementById('clientDestination');
  destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicked on direct link, let it proceed
      if (e.target.closest('a')) return;

      const destName = card.getAttribute('data-destination');
      if (destinationInput) {
        destinationInput.value = destName;
        const plannerSection = document.getElementById('planner');
        if (plannerSection) {
          plannerSection.scrollIntoView({ behavior: 'smooth' });
          destinationInput.focus();
        }
      }
    });
  });

  // 7. Journey Planner / WhatsApp Form Dispatcher
  const journeyForm = document.getElementById('journeyEnquiryForm');
  if (journeyForm) {
    journeyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || 'Valued Traveller';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'Not specified';
      const email = document.getElementById('clientEmail')?.value.trim() || 'Not specified';
      const destination = document.getElementById('clientDestination')?.value.trim() || 'Custom Trip';
      const travelDate = document.getElementById('travelDate')?.value || 'Flexible / Upcoming';
      const travellers = document.getElementById('travelCount')?.value.trim() || 'Not specified';
      const travelType = document.getElementById('travelType')?.value || 'Holiday Package';
      const budget = document.getElementById('travelBudget')?.value.trim() || 'To be discussed';
      const message = document.getElementById('travelMessage')?.value.trim() || 'Please share available package options & customized itinerary.';

      // Format WhatsApp Message
      const formattedMessage = 
`Hello Travel Box Holidays,

I would like to plan a trip.

Name: ${name}
Phone: ${phone}
Email: ${email}
Destination: ${destination}
Travel Date: ${travelDate}
Travellers: ${travellers}
Travel Type: ${travelType}
Budget: ${budget}
Message: ${message}

Please help me plan my journey.`;

      const whatsappNumber = '919654422590';
      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Open WhatsApp in new tab/window
      window.open(whatsappUrl, '_blank');
    });
  }
});
