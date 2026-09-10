/**
 * TRAVEL BOX HOLIDAYS - INTERACTIVE CORE
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

  // 5. Destination Regional Filter Tabs
  const destTabBtns = document.querySelectorAll('.dest-tab-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  destTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');

      // Update button state
      destTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
        b.classList.add('bg-transparent', 'text-charcoal', 'border-sand/40');
      });
      btn.classList.add('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
      btn.classList.remove('bg-transparent', 'text-charcoal', 'border-sand/40');

      // Filter cards
      destinationCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (region === 'all' || cardCat === region) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Service Category Switcher
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const servicePanels = document.querySelectorAll('.service-panel');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-category');

      serviceTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
        b.classList.add('bg-transparent', 'text-charcoal', 'border-sand/40');
      });
      btn.classList.add('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
      btn.classList.remove('bg-transparent', 'text-charcoal', 'border-sand/40');

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

  // 7. Destination Card Click to Pre-Fill Planner
  const destinationInput = document.getElementById('clientDestination');
  destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Allow direct link clicks

      const destName = card.getAttribute('data-name');
      if (destinationInput && destName) {
        destinationInput.value = destName;
        const plannerSection = document.getElementById('planner');
        if (plannerSection) {
          plannerSection.scrollIntoView({ behavior: 'smooth' });
          destinationInput.focus();
        }
      }
    });
  });

  // 8. WhatsApp Journey Planner Form Handler
  const journeyForm = document.getElementById('journeyEnquiryForm');
  if (journeyForm) {
    journeyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || 'Valued Traveller';
      const destination = document.getElementById('clientDestination')?.value.trim() || 'Custom Trip';
      const travelDate = document.getElementById('travelDate')?.value || 'Flexible / Upcoming';
      const travellers = document.getElementById('travelCount')?.value.trim() || 'Not specified';
      const tripType = document.getElementById('travelType')?.value || 'Holiday Package';
      const message = document.getElementById('travelMessage')?.value.trim() || 'Please share available package options & customized itinerary.';

      // Format exact WhatsApp Message according to specifications
      const formattedMessage = 
`Hello Travel Box Holidays,

I would like to plan a trip.

Name: ${name}
Destination: ${destination}
Travel Date: ${travelDate}
Travellers: ${travellers}
Trip Type: ${tripType}
Message: ${message}

Please help me plan my journey.`;

      const whatsappNumber = '919654422590';
      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Open WhatsApp in new window/tab
      window.open(whatsappUrl, '_blank');
    });
  }
});
