// Toggle mobile menu
function toggleMenu() {
  const menuList = document.querySelector('nav ul');
  menuList.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.querySelector('nav');
  const menuList = document.querySelector('nav ul');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!nav.contains(event.target) && menuList.classList.contains('active')) {
    menuList.classList.remove('active');
  }
});

// Scroll reveal animation
document.addEventListener('DOMContentLoaded', function() {
  // Add reveal class to elements
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('reveal');
  });
  
  const services = document.querySelectorAll('.service');
  services.forEach(service => {
    service.classList.add('reveal');
  });
  
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.classList.add('reveal');
  });
  
  // Reveal elements on scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  // Initialize on load
  revealOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', revealOnScroll);
  
  // Initialize skill bars if they exist
  const skillBars = document.querySelectorAll('.skill-progress-value');
  if (skillBars.length > 0) {
    skillBars.forEach(bar => {
      const value = bar.getAttribute('data-value');
      setTimeout(() => {
        bar.style.width = value + '%';
      }, 500);
    });
  }
  
  // Custom cursor effect
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('visible');
  });
  
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });
  
  // Links and buttons hover effect
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .service');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
  
  // Create and add scroll to top button
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.classList.add('scroll-top');
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  // Add theme switcher
  const themeSwitch = document.createElement('div');
  themeSwitch.classList.add('theme-switch');
  themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>';
  document.body.appendChild(themeSwitch);
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  
  // Toggle theme
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
  
  // Add scroll indicator to home page
  const homeSection = document.getElementById('home');
  if (homeSection) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = `
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow">
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    `;
    homeSection.appendChild(scrollIndicator);
    
    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  const thankYouMessage = document.getElementById('thank-you');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Send form data to Formspree (already set up in your HTML)
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          if (thankYouMessage) {
            thankYouMessage.style.display = 'block';
            setTimeout(() => {
              thankYouMessage.style.display = 'none';
            }, 5000);
          }
        } else {
          alert('There was a problem submitting your form. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was a problem submitting your form. Please try again.');
      });
    });
  }
  
  // Testimonial slider functionality
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  
  if (testimonialSlider && testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Update active dot
        testimonialDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        
        // Slide to the corresponding testimonial
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
      });
    });
    
    // Auto-slide functionality
    let currentSlide = 0;
    const totalSlides = testimonialDots.length;
    
    function autoSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      
      testimonialDots.forEach(d => d.classList.remove('active'));
      testimonialDots[currentSlide].classList.add('active');
      
      testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Start auto-slide with interval
    const slideInterval = setInterval(autoSlide, 5000);
    
    // Pause auto-slide on hover
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume auto-slide on mouse leave
    testimonialSlider.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      setInterval(autoSlide, 5000);
    });
  }
  
  // Page transitions
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    // Only apply to internal links
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', function(e) {
        // Skip if it's a same-page anchor
        if (link.hash && link.pathname === window.location.pathname) {
          return;
        }
        
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Create transition overlay
        const transition = document.createElement('div');
        transition.classList.add('page-transition');
        document.body.appendChild(transition);
        
        // Trigger transition
        setTimeout(() => {
          transition.classList.add('active');
        }, 10);
        
        // Navigate to the new page after transition
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    }
  });
  
  // Smooth scroll for same-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animate typing effect for hero text
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }
});