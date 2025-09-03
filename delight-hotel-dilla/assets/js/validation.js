function validateSettingsForm() {
    const form = document.querySelector('#settings-form');
    if (!form) return true;
    
    let isValid = true;
    const email = form.querySelector('#email');
    const currentPassword = form.querySelector('#current-password');
    const newPassword = form.querySelector('#new-password');
    const confirmPassword = form.querySelector('#confirm-password');
    
    // Reset error states
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    // Email validation
    if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation if changing password
    if (newPassword && newPassword.value) {
        if (newPassword.value.length < 8) {
            showError(newPassword, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (!currentPassword || !currentPassword.value) {
            showError(currentPassword, 'Current password is required to change password');
            isValid = false;
        }
        
        if (newPassword.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
    }
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const error = document.createElement('div');
    error.className = 'error-message text-danger mt-1';
    error.style.fontSize = '0.875rem';
    error.textContent = message;
    input.parentNode.appendChild(error);
}