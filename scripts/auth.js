// Authentication functionality
class AuthManager {
    constructor() {
        this.authModal = document.getElementById('authModal');
        this.authForm = document.getElementById('authFormElement');
        this.authTitle = document.getElementById('authTitle');
        this.nameField = document.getElementById('nameField');
        this.nameInput = document.getElementById('nameInput');
        this.emailInput = document.getElementById('emailInput');
        this.passwordInput = document.getElementById('passwordInput');
        this.authSubmit = document.getElementById('authSubmit');
        this.authSwitchText = document.getElementById('authSwitchText');
        this.authSwitchBtn = document.getElementById('authSwitchBtn');
        this.togglePasswordBtn = document.getElementById('togglePassword');
        
        this.isSignUp = false;
        this.init();
    }

    init() {
        // Form submission
        this.authForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Switch between sign in and sign up
        this.authSwitchBtn.addEventListener('click', () => this.toggleMode());
        
        // Toggle password visibility
        this.togglePasswordBtn.addEventListener('click', () => this.togglePassword());
        
        // Check if user is already logged in
        this.updateUI();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();
        const name = this.nameInput.value.trim();

        if (!email || !password) {
            this.showError('Please fill in all required fields');
            return;
        }

        if (this.isSignUp && !name) {
            this.showError('Please enter your full name');
            return;
        }

        // Show loading state
        this.authSubmit.textContent = 'Processing...';
        this.authSubmit.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            let success = false;
            
            if (this.isSignUp) {
                success = window.userData.signup(name, email, password);
            } else {
                success = window.userData.login(email, password);
            }

            if (success) {
                this.closeModal();
                this.updateUI();
                this.showSuccess(this.isSignUp ? 'Account created successfully!' : 'Welcome back!');
            } else {
                this.showError('Invalid credentials. Please try again.');
            }

            // Reset button state
            this.authSubmit.textContent = this.isSignUp ? 'Sign Up' : 'Sign In';
            this.authSubmit.disabled = false;
        }, 1000);
    }

    toggleMode() {
        this.isSignUp = !this.isSignUp;
        
        if (this.isSignUp) {
            this.authTitle.textContent = 'Sign Up';
            this.nameField.style.display = 'block';
            this.nameInput.required = true;
            this.authSubmit.textContent = 'Sign Up';
            this.authSwitchText.textContent = 'Already have an account?';
            this.authSwitchBtn.textContent = 'Sign in';
        } else {
            this.authTitle.textContent = 'Sign In';
            this.nameField.style.display = 'none';
            this.nameInput.required = false;
            this.authSubmit.textContent = 'Sign In';
            this.authSwitchText.textContent = 'New to Netflix?';
            this.authSwitchBtn.textContent = 'Sign up now';
        }
        
        // Clear form
        this.authForm.reset();
        this.clearError();
    }

    togglePassword() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        // Update icon
        const icon = this.togglePasswordBtn.querySelector('svg');
        if (type === 'text') {
            icon.innerHTML = `
                <path d="M17.94 17.94C16.2306 19.6494 13.8899 20.6303 11.4453 20.6569C9.00061 20.6835 6.63622 19.7544 4.89 18.08C3.14378 16.4056 2.14999 14.0412 2.14999 11.5965C2.14999 9.15182 3.14378 6.78743 4.89 5.11321L17.94 17.94Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C14.4447 4.02656 16.8091 4.95544 18.5533 6.62966C20.2975 8.30388 21.2913 10.6683 21.318 13.113C21.3446 15.5577 20.4155 17.9221 18.741 19.666" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        } else {
            icon.innerHTML = `
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            `;
        }
    }

    showModal() {
        this.authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.emailInput.focus();
    }

    closeModal() {
        this.authModal.classList.remove('active');
        document.body.style.overflow = '';
        this.authForm.reset();
        this.clearError();
    }

    showError(message) {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-form__error';
        errorDiv.style.cssText = `
            background: rgba(229, 9, 20, 0.1);
            border: 1px solid #e50914;
            color: #e50914;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 16px;
            font-size: 14px;
        `;
        errorDiv.textContent = message;
        this.authForm.insertBefore(errorDiv, this.authSubmit);
    }

    clearError() {
        const existingError = this.authForm.querySelector('.auth-form__error');
        if (existingError) {
            existingError.remove();
        }
    }

    showSuccess(message) {
        // Create a temporary success notification
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        // Animate in
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }, 3000);
    }

    updateUI() {
        const user = window.userData.getCurrentUser();
        const signInBtn = document.getElementById('signInBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (user) {
            // User is logged in
            signInBtn.style.display = 'none';
            profileDropdown.style.display = 'flex';
            
            // Update profile info
            const profileImg = profileDropdown.querySelector('.navbar__profile-img');
            const profileInfoImg = document.querySelector('.navbar__profile-info img');
            const profileInfoSpan = document.querySelector('.navbar__profile-info span');
            
            if (profileImg) profileImg.src = user.avatar;
            if (profileInfoImg) profileInfoImg.src = user.avatar;
            if (profileInfoSpan) profileInfoSpan.textContent = user.name;
        } else {
            // User is not logged in
            signInBtn.style.display = 'block';
            profileDropdown.style.display = 'none';
        }
    }

    logout() {
        window.userData.logout();
        this.updateUI();
        this.showSuccess('You have been signed out');
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});