    // Navbar scroll effect with throttling
    let lastScrollY = 0;
    let ticking = false;

    function updateNav() {
      const nav = document.getElementById('nav');
      nav.classList.toggle('scrolled', window.scrollY > 30);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;

      // Update scroll progress bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const scrollBar = document.getElementById('scroll-progress');
      if (scrollBar) {
        scrollBar.style.width = scrolled + '%';
      }

      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    });

    // Mouse tracking glow logic for cards
    document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
      // Optionally reset the mouse position when leaving so it doesn't stay at edge
      card.addEventListener('mouseleave', () => {
        setTimeout(() => {
          card.style.setProperty('--mouse-x', `-500px`);
          card.style.setProperty('--mouse-y', `-500px`);
        }, 300);
      });
    });

    // Mobile menu toggle
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('hamburger-icon');
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');

      // Swap icon
      icon.innerHTML = isOpen
        ? '<line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/>'
        : '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Smooth scroll with offset for fixed nav is handled by CSS scroll-padding-top

    // Enhanced animate on scroll with staggered delays
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    // Apply animations to different sections
    document.querySelectorAll('.feature-card').forEach((el, i) => {
      el.classList.add('animate-target');
      el.style.transitionDelay = `${(i % 3) * 120}ms`;
      observer.observe(el);
    });

    document.querySelectorAll('.step').forEach((el, i) => {
      el.classList.add('animate-target');
      el.style.transitionDelay = `${i * 150}ms`;
      observer.observe(el);
    });

    document.querySelectorAll('.stat-card').forEach((el, i) => {
      el.classList.add('animate-target');
      el.style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });

    document.querySelectorAll('.about-value').forEach((el, i) => {
      el.classList.add('animate-target');
      el.style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });

    // Fallback: force show all animated elements after 3s
    setTimeout(() => {
      document.querySelectorAll('.animate-target').forEach(el => el.classList.add('animate-in'));
    }, 3000);

    // Add parallax effect to hero background elements
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < hero.offsetHeight) {
        hero.style.setProperty('--parallax', `${scrolled * 0.3}px`);
      }
    });
    // Counter animation
    function animateCounter(el) {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const useComma = el.dataset.comma === 'true';
      const duration = 2000;
      const startTime = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(easedProgress * target);

        el.textContent = (useComma ? current.toLocaleString() : current) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-count]').forEach(el => {
      counterObserver.observe(el);
    });
