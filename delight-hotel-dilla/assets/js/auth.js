// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.querySelector('.auth-form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your login logic here
            alert('Login successful! Redirecting to your account...');
            // window.location.href = 'account.html';
        });
    }

    // Register Form
    const registerForm = document.querySelector('.auth-form');
    if (registerForm && window.location.pathname.includes('register.html')) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long!');
                return;
            }
            
            // Add your registration logic here
            alert('Registration successful! Please check your email for verification.');
            // window.location.href = 'login.html';
        });
    }

    // Forgot Password Form
    const forgotPasswordForm = document.querySelector('.auth-form');
    if (forgotPasswordForm && window.location.pathname.includes('forgot-password.html')) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your password reset logic here
            alert('Password reset link has been sent to your email!');
            // window.location.href = 'login.html';
        });
    }


    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggle = document.createElement('span');
        toggle.className = 'password-toggle';
        toggle.innerHTML = '<i class="fas fa-eye"></i>';
        
        // Find the parent container (input-with-icon)
        const container = field.parentNode;
        
        // Append the toggle inside the container
        container.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            if (field.type === 'password') {
                field.type = 'text';
                toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                field.type = 'password';
                toggle.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
});