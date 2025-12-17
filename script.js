// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Search Box Toggle
const searchIcon = document.querySelector('.search-box i');
const searchInput = document.querySelector('.search-box input');

searchIcon.addEventListener('click', function() {
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});

// User Dropdown Menu
const userProfile = document.querySelector('.user-profile');
const dropdownMenu = document.querySelector('.dropdown-menu');

userProfile.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

document.addEventListener('click', function() {
    dropdownMenu.classList.remove('active');
});

// Movie Carousel Navigation
const featuredContainer = document.querySelector('.featured .movies-container');
const prevFeaturedBtn = document.querySelector('.prev-featured');
const nextFeaturedBtn = document.querySelector('.next-featured');

nextFeaturedBtn.addEventListener('click', function() {
    featuredContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

prevFeaturedBtn.addEventListener('click', function() {
    featuredContainer.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

// Static hero - no slideshow for better quality

// Particle Effect
const particlesContainer = document.getElementById('particles');
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = opacity;
    
    particlesContainer.appendChild(particle);
}

// Movie Card Hover Effect
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const info = this.querySelector('.movie-info');
        info.style.opacity = '1';
        info.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
        const info = this.querySelector('.movie-info');
        info.style.opacity = '0';
        info.style.transform = 'translateY(20px)';
    });
    
    // Open modal on click
    card.addEventListener('click', function() {
        const modal = document.getElementById('movieModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
const modalClose = document.querySelector('.modal-close');
const modal = document.getElementById('movieModal');

modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Floating Animation for Featured Section
const featuredMovies = document.querySelectorAll('.featured .movie-card');

featuredMovies.forEach((movie, index) => {
    movie.style.animationDelay = `${index * 0.1}s`;
    movie.classList.add('floating');
});

// Pulse animation for popular plan
const popularPlan = document.querySelector('.plan-card.popular');
popularPlan.classList.add('pulse');
