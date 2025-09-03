// Main Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle
    initSidebar();
    
    // Initialize theme switcher
    initTheme();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize calendar
    initCalendar();
    
    // Load any additional page-specific functionality
    loadPageScript();
});

// Sidebar Toggle Functionality
function initSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-show');
            document.body.classList.toggle('sidebar-open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !e.target.closest('.dashboard-sidebar') && 
            !e.target.closest('.menu-toggle')) {
            sidebar.classList.remove('mobile-show');
            document.body.classList.remove('sidebar-open');
        }
    });
    
    // Highlight active menu item
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('mobile-show');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
}

// Theme Switcher
function initTheme() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.querySelector('.header-right').appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
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
        if (tooltip) tooltip.remove();
    }
}

// Calendar Initialization
function initCalendar() {
    const calendar = document.getElementById('booking-calendar');
    if (!calendar) return;
    
    // This would be replaced with a real calendar library in production
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Create calendar header
    const header = document.createElement('div');
    header.className = 'calendar-header';
    
    // Create calendar grid
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    
    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        grid.appendChild(dayHeader);
    });
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = i;
        
        // Mark today
        if (i === today.getDate() && currentMonth === today.getMonth()) {
            dayElement.classList.add('today');
        }
        
        // Add random events (demo only)
        const events = document.createElement('div');
        events.className = 'calendar-day-events';
        
        const eventCount = Math.floor(Math.random() * 3);
        for (let j = 0; j < eventCount; j++) {
            const event = document.createElement('div');
            event.className = 'calendar-event';
            events.appendChild(event);
        }
        
        dayElement.appendChild(dayNumber);
        dayElement.appendChild(events);
        grid.appendChild(dayElement);
    }
    
    calendar.appendChild(header);
    calendar.appendChild(grid);
}

// Load page-specific JavaScript
function loadPageScript() {
    const path = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    // This would be expanded to load different scripts for different pages
    if (path.includes('dashboard.html') || path === 'dashboard.html') {
        // Dashboard-specific scripts are already loaded
    }
}