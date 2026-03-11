// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    // Create Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Smooth scroll for anchor links
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

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for better trigger

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('font-bold', 'underline');
            const href = link.getAttribute('href').substring(1); // Remove #
            if (href === current) {
                link.classList.add('font-bold', 'underline');
            }
        });
    }

    // Throttle scroll event for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Update on initial load
    updateActiveNavLink();

    // Add hover effects for tool cards
    const toolCards = document.querySelectorAll('.group');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('[data-lucide]');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('[data-lucide]');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Animate pulse effect for the hero badge
    const pulseBadge = document.querySelector('.animate-pulse');
    if (pulseBadge) {
        setInterval(() => {
            pulseBadge.style.opacity = '0.5';
            setTimeout(() => {
                pulseBadge.style.opacity = '1';
            }, 500);
        }, 2000);
    }

    // Handle external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // You could add analytics here if needed
            console.log('External link clicked:', link.href);
        });
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus (none in this design)
        }
    });

    // Mobile menu toggle (if needed for smaller screens)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('nav .hidden.md\\:block');
            if (nav) {
                // You could implement a mobile menu here
                // For now, we'll just ensure the navigation is usable
                nav.classList.remove('hidden');
                nav.classList.add('block', 'absolute', 'top-20', 'left-0', 'right-0', 'bg-black', 'p-4');
            }
        }
    };

    // Call on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Lazy load images if any are added in the future
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Add smooth transitions for theme toggle (if implemented in future)
    // Currently only black/white theme is supported

    console.log('CosmoTools: All systems initialized');
});

// Handle any errors gracefully
window.addEventListener('error', function(e) {
    console.error('CosmoTools: An error occurred', e.error);
    // You could show a user-friendly error message here
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`CosmoTools: Page loaded in ${pageLoadTime}ms`);
    });
}