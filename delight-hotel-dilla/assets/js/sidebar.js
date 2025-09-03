function initSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const body = document.body;
    
    if (sidebar && sidebarToggle) {
        // Check for saved sidebar state
        const sidebarState = localStorage.getItem('sidebarState') || 'expanded';
        
        if (sidebarState === 'collapsed') {
            collapseSidebar();
        }
        
        // Toggle sidebar
        sidebarToggle.addEventListener('click', function() {
            if (sidebar.classList.contains('collapsed')) {
                expandSidebar();
            } else {
                collapseSidebar();
            }
        });
        
        // Handle responsive behavior
        window.addEventListener('resize', function() {
            if (window.innerWidth < 992) {
                collapseSidebar();
            } else {
                if (localStorage.getItem('sidebarState') !== 'collapsed') {
                    expandSidebar();
                }
            }
        });
    }
    
    function collapseSidebar() {
        sidebar.classList.add('collapsed');
        body.classList.add('sidebar-collapsed');
        localStorage.setItem('sidebarState', 'collapsed');
    }
    
    function expandSidebar() {
        sidebar.classList.remove('collapsed');
        body.classList.remove('sidebar-collapsed');
        localStorage.setItem('sidebarState', 'expanded');
    }
    
    // Initialize menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth < 992) {
                collapseSidebar();
            }
        });
    });
}