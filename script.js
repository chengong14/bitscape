// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Like button functionality
document.querySelectorAll('.like-btn').forEach(button => {
    // Check if this review was previously liked
    const reviewId = button.closest('.review-card').querySelector('p').textContent;
    const wasLiked = localStorage.getItem(`liked_${reviewId}`);
    if (wasLiked) {
        button.classList.add('liked');
    }

    button.addEventListener('click', function() {
        const likeCount = this.querySelector('.like-count');
        const reviewId = this.closest('.review-card').querySelector('p').textContent;
        
        if (!localStorage.getItem(`liked_${reviewId}`)) {
            // Increment like count
            let count = parseInt(likeCount.textContent);
            count++;
            likeCount.textContent = count;
            
            // Add liked state
            this.classList.add('liked');
            
            // Store the like in localStorage
            localStorage.setItem(`liked_${reviewId}`, 'true');
            
            // Add animation
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = null;
        } else {
            // Optional: Add a small shake animation to indicate already liked
            this.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        }
    });
});

// Add shake animation keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}`;
document.head.appendChild(style);

// Social sharing functionality
function shareOnTwitter() {
    const text = "Check out Bitscape - An awesome incremental game inspired by Old School RuneScape! 🎮";
    const hashtags = "incrementalgame,bitscapegame,SchoolRuneScape";
    const url = window.location.href;
    
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(hashtags)}&url=${encodeURIComponent(url)}`,
        '_blank'
    );
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
    );
}

function shareOnReddit() {
    const title = "Bitscape - An awesome incremental game inspired by Old School RuneScape!";
    const url = window.location.href;
    window.open(
        `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        '_blank'
    );
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add animation to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
}); 