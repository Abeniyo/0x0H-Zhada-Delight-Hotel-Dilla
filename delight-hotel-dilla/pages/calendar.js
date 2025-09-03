// Calendar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.calendar-card .btn:first-child');
    const nextBtn = document.querySelector('.calendar-card .btn:last-child');
    const monthDisplay = document.querySelector('.calendar-card .card-actions span');
    
    if (prevBtn && nextBtn && monthDisplay) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        
        function updateCalendar() {
            monthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
            // In a real implementation, we would regenerate the calendar grid here
        }
        
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
        
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
        
        updateCalendar();
    }
});