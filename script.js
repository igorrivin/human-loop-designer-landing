// Enhanced JavaScript for Human-in-the-Loop AI Designer Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (entry.target.classList.contains('workflow-step')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                }
                
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const animatedElements = document.querySelectorAll('.workflow-step, .feature-card, .tech-category, .showcase-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced counter animation for showcase stats
    function animateCounters() {
        const counters = document.querySelectorAll('.showcase-stat span');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const number = parseFloat(text.replace(/[^\d.-]/g, ''));
            
            if (!isNaN(number)) {
                let start = 0;
                const duration = 2000;
                const increment = number / (duration / 16);
                
                const updateCounter = () => {
                    if (start < number) {
                        start += increment;
                        if (text.includes('%')) {
                            counter.textContent = Math.floor(start) + '%';
                        } else if (text.includes('+')) {
                            counter.textContent = '+' + Math.floor(start) + '%';
                        } else {
                            counter.textContent = Math.floor(start);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = text; // Restore original text
                    }
                };
                
                updateCounter();
            }
        });
    }

    // Trigger counter animation when showcase section is visible
    const showcaseObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                showcaseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const showcaseSection = document.querySelector('.showcase');
    if (showcaseSection) {
        showcaseObserver.observe(showcaseSection);
    }

    // Interactive demo boxes
    const demoBoxes = document.querySelectorAll('.demo-box');
    
    demoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Technology item hover effects
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Feature pills animation in hero
    const featurePills = document.querySelectorAll('.feature-pill');
    
    featurePills.forEach((pill, index) => {
        pill.style.animationDelay = `${index * 0.1}s`;
        pill.style.animation = 'fadeInUp 0.6s ease forwards';
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .feature-pill {
            animation-fill-mode: both;
            opacity: 0;
        }
        
        .workflow-step:hover {
            animation: pulse 2s infinite;
        }
        
        .metric-value {
            transition: color 0.3s ease;
        }
        
        .demo-box:hover .metric-value {
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);

    // Progressive enhancement for modern browsers
    if ('IntersectionObserver' in window) {
        // Add parallax effect to hero background
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add loading states for demo content
    const demoContent = document.querySelectorAll('.demo-content');
    
    demoContent.forEach(content => {
        // Simulate loading animation
        const items = content.querySelectorAll('.analysis-item, .metric, .showcase-stat');
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 200);
        });
    });

    // Contact form enhancement (if added later)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission logic here
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    console.log('🎨 Human-in-the-Loop AI Designer - Landing page loaded successfully!');
    console.log('🚀 Built with modern web technologies and enhanced user experience');
});