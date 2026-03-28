/* ================================
   SUKALEYAN — The Atelier
   Subtle interactions and animations
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Smooth reveal on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  // Add reveal class to sections and cards
  const elementsToReveal = document.querySelectorAll('.section, .about__card, .trace-item, .works__placeholder');

  elementsToReveal.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // Add CSS for revealed state
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .about__card--main.revealed {
      transform: rotate(-0.5deg) !important;
    }
    .about__card--note.revealed {
      transform: rotate(2deg) !important;
    }
    .works__placeholder--1.revealed {
      transform: rotate(-1deg) !important;
    }
    .works__placeholder--2.revealed {
      transform: rotate(0.5deg) translateY(20px) !important;
    }
    .works__placeholder--3.revealed {
      transform: rotate(-0.5deg) !important;
    }
  `;
  document.head.appendChild(style);

  // Stagger the trace items
  const traceItems = document.querySelectorAll('.trace-item');
  traceItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
  });

  // Stagger the work placeholders
  const workPlaceholders = document.querySelectorAll('.works__placeholder');
  workPlaceholders.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // Active nav highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav__item');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.style.color = '';
          item.style.borderColor = '';
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.style.color = 'var(--wine)';
            item.style.borderColor = 'var(--wine)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // Smooth scroll for nav links
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 40;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect on intro photo
  const photoFrame = document.querySelector('.intro__photo-frame');

  if (photoFrame && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.15;

      if (scrolled < 600) {
        photoFrame.style.transform = `rotate(2deg) translateY(${rate}px)`;
      }
    }, { passive: true });
  }

  // Subtle hover effect on intro name
  const introName = document.querySelector('.intro__name');

  if (introName) {
    introName.addEventListener('mouseenter', () => {
      introName.style.transition = 'letter-spacing 0.4s ease';
      introName.style.letterSpacing = '0.02em';
    });

    introName.addEventListener('mouseleave', () => {
      introName.style.letterSpacing = '-0.02em';
    });
  }

  // Re-trigger vine animation when scrolled into view
  const vineSection = document.querySelector('.section--vine');
  const vineLine = document.querySelector('.vine-line');
  const vineGrapes = document.querySelectorAll('.vine-grape');
  const vineLeaves = document.querySelectorAll('.vine-leaf');

  if (vineSection && vineLine) {
    const vineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset and replay animations
          vineLine.style.animation = 'none';
          vineGrapes.forEach(g => g.style.animation = 'none');
          vineLeaves.forEach(l => l.style.animation = 'none');

          // Trigger reflow
          void vineLine.offsetWidth;

          // Restart animations
          vineLine.style.animation = 'drawVine 3s ease forwards';
          vineGrapes.forEach((g, i) => {
            g.style.animation = `fadeIn 0.5s ease forwards ${1.5 + i * 0.2}s`;
          });
          vineLeaves.forEach((l, i) => {
            l.style.animation = `fadeIn 0.5s ease forwards ${2.5 + i * 0.3}s`;
          });

          vineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    vineObserver.observe(vineSection);
  }

});
