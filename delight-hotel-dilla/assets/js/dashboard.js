document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponents();
    
    // Initialize sidebar toggle
    initSidebar();
    
    // Load default content
    loadContent('../../content/dashboard.html');
    
    // Set up navigation
    setupNavigation();
});

function loadComponents() {
    // Load header
    fetch('../../partials/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        });
    
    // Load sidebar
    fetch('../../partials/sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('sidebar-container').innerHTML = html;
            highlightActiveMenu();
        });
}

function initSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Adjust content area margin
            if (sidebar.classList.contains('collapsed')) {
                document.querySelector('.content-area').style.marginLeft = '80px';
            } else {
                document.querySelector('.content-area').style.marginLeft = '250px';
            }
            
            // For mobile view
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('mobile-show');
                document.body.classList.toggle('sidebar-open');
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && !e.target.closest('.dashboard-sidebar') && !e.target.closest('.menu-toggle')) {
            sidebar.classList.remove('mobile-show');
            document.body.classList.remove('sidebar-open');
        }
    });
}

function loadContent(url) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.classList.add('content-transition');
    
    fetch(url)
        .then(response => response.text())
        .then(html => {
            contentContainer.innerHTML = html;
            contentContainer.classList.remove('content-transition');
            highlightActiveMenu();
            
            // Initialize any content-specific JS
            if (url.includes('settings.html')) {
                initSettingsValidation();
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentContainer.innerHTML = '<div class="alert alert-danger">Error loading content. Please try again.</div>';
        });
}

function setupNavigation() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.menu-item')) {
            e.preventDefault();
            const link = e.target.closest('.menu-item');
            const url = link.getAttribute('data-content');
            
            if (url) {
                loadContent(url);
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                link.classList.add('active');
                
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 992) {
                    document.querySelector('.dashboard-sidebar').classList.remove('mobile-show');
                    document.body.classList.remove('sidebar-open');
                }
            }
        }
    });
}

function highlightActiveMenu() {
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemPath = item.getAttribute('data-content').split('/').pop();
        if (itemPath === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// For settings validation (example)
function initSettingsValidation() {
    const form = document.querySelector('#settings-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSettingsForm()) {
                // Form is valid, submit it
                form.submit();
            }
        });
    }
}