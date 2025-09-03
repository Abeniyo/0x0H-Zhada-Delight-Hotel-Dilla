// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponents();
    
    // Initialize theme
    initTheme();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize tooltips
    initTooltips();
    
    // Load page specific JS
    loadPageScript();
});

// Load HTML components
function loadComponents() {
    const includes = document.querySelectorAll('[data-include]');
    includes.forEach(include => {
        const file = include.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                include.innerHTML = data;
                // Reinitialize any components after load
                initSidebar();
                initTheme();
            })
            .catch(error => console.error('Error loading component:', error));
    });
}

// Initialize theme
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + '-theme');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Set initial icon
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Load page specific JS
function loadPageScript() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
        'index.html': 'dashboard.js',
        'orders.html': 'orders.js',
        'products.html': 'products.js',
        'analytics.html': 'analytics.js'
    };
    
    if (pageMap[path]) {
        const script = document.createElement('script');
        script.src = `assets/js/pages/${pageMap[path]}`;
        document.body.appendChild(script);
    }
}