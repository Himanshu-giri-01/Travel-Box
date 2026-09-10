/**
 * TRAVEL BOX HOLIDAYS - CINEMATIC MOTION & INTERACTIVE CORE
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
  }, { passive: true });

  // 3. Hero Background Image Slideshow
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6500);
  }

  // 4. Mobile Navigation Drawer & Animated Hamburger Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  let isDrawerOpen = false;

  function openMobileMenu() {
    isDrawerOpen = true;
    mobileDrawer.classList.add('is-open');
    mobileMenuBtn?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    isDrawerOpen = false;
    mobileDrawer.classList.remove('is-open');
    mobileMenuBtn?.classList.remove('is-active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isDrawerOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close drawer if user presses Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDrawerOpen) {
      closeMobileMenu();
    }
  });

  // 5. Hero Cinematic 3D Mouse Parallax (Desktop Only)
  const heroSection = document.getElementById('hero');
  const heroContent = document.getElementById('heroContentLayer');
  const heroBgLayer = document.getElementById('heroBgLayer');

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && isFinePointer && !prefersReducedMotion) {
    let heroTicking = false;

    heroSection.addEventListener('mousemove', (e) => {
      if (!heroTicking) {
        requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          if (heroContent) {
            heroContent.style.transform = `translate3d(${x * 12}px, ${y * 10}px, 0) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`;
          }
          if (heroBgLayer) {
            heroBgLayer.style.transform = `translate3d(${-x * 16}px, ${-y * 14}px, 0)`;
          }
          heroTicking = false;
        });
        heroTicking = true;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (heroContent) {
        heroContent.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
      }
      if (heroBgLayer) {
        heroBgLayer.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }

  // 6. 3D Hover Tilt on Destination Cards (Desktop Only)
  const destinationCards = document.querySelectorAll('.destination-card');

  if (isFinePointer && !prefersReducedMotion) {
    destinationCards.forEach(card => {
      const cardInner = card.querySelector('.card-inner') || card;
      let cardTicking = false;

      card.addEventListener('mousemove', (e) => {
        if (!cardTicking) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            cardInner.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
            cardTicking = false;
          });
          cardTicking = true;
        }
      });

      card.addEventListener('mouseleave', () => {
        cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // 7. Scroll-Triggered Reveal Animations (IntersectionObserver)
  const scrollElements = document.querySelectorAll('.reveal-on-scroll, .reveal-card');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback if observer is unsupported or reduced motion requested
    scrollElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 8. Destination Regional Filter Tabs
  const destTabBtns = document.querySelectorAll('.dest-tab-btn');

  destTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');

      destTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
        b.classList.add('bg-transparent', 'text-charcoal', 'border-sand/40');
      });
      btn.classList.add('active', 'bg-charcoal-dark', 'text-white', 'border-charcoal-dark');
      btn.classList.remove('bg-transparent', 'text-charcoal', 'border-sand/40');

      destinationCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (region === 'all' || cardCat === region) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('is-revealed'), 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Service Category Switcher
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

  // 10. Destination Card Click to Pre-Fill Planner
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

  // 11. WhatsApp Journey Planner Form Handler
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
