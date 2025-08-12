

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // PART 1: EVENT HANDLING
    // ======================
    
    // Click event demo
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', function() {
        this.textContent = 'Clicked!';
        this.style.backgroundColor = '#2196F3';
        setTimeout(() => {
            this.textContent = 'Click me!';
            this.style.backgroundColor = '#4CAF50';
        }, 1000);
    });
    
    // Mouseover/mouseout events demo
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseover', function() {
        this.textContent = 'Mouse is over!';
        this.style.backgroundColor = '#FF9800';
    });
    
    hoverBox.addEventListener('mouseout', function() {
        this.textContent = 'Hover over me!';
        this.style.backgroundColor = '#4CAF50';
    });
    
    // Keyboard input event demo
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('input', function() {
        keyOutput.textContent = 'You typed: ' + this.value;
    });
    
    // ===========================
    // PART 2: INTERACTIVE ELEMENTS
    // ===========================
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
    
    // Counter Game
    const counterDisplay = document.querySelector('.counter-display');
    const counterButtons = document.querySelectorAll('.counter-btn');
    let count = 0;
    
    counterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            
            switch(action) {
                case 'Increment':
                    count++;
                    break;
                case 'Decrement':
                    count--;
                    break;
                case 'Reset':
                    count = 0;
                    break;
            }
            
            counterDisplay.textContent = count;
            
            // Change color based on value
            if (count > 0) {
                counterDisplay.style.color = '#4CAF50';
            } else if (count < 0) {
                counterDisplay.style.color = '#f44336';
            } else {
                counterDisplay.style.color = '';
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Close all other answers first
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.nextElementSibling.style.display = 'none';
                    q.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current answer
            const answer = this.nextElementSibling;
            const isExpanded = answer.style.display === 'block';
            
            answer.style.display = isExpanded ? 'none' : 'block';
            this.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        });
    });
    
    // ======================
    // PART 3: FORM VALIDATION
    // ======================
    
    const userForm = document.getElementById('user-form');
    const formSuccess = document.getElementById('form-success');
    
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous messages
        formSuccess.textContent = '';
        clearErrorMessages();
        
        // Validate each field
        const nameValid = validateName();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        const ageValid = validateAge();
        
        // If all valid, show success
        if (nameValid && emailValid && passwordValid && ageValid) {
            formSuccess.textContent = 'Form submitted successfully!';
            userForm.reset();
        }
    });
    
    // Real-time validation as user types
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('age').addEventListener('input', validateAge);
    
    // Validation functions
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('name-error');
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(errorElement, 'Name is required');
            return false;
        }
        
        if (name.length < 2) {
            showError(errorElement, 'Name must be at least 2 characters');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(errorElement, 'Name can only contain letters and spaces');
            return false;
        }
        
        clearError(errorElement);
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const email = emailInput.value.trim();
        
        if (email === '') {
            showError(errorElement, 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(errorElement, 'Please enter a valid email address');
            return false;
        }
        
        clearError(errorElement);
        return true;
    }
    
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const errorElement = document.getElementById('password-error');
        const password = passwordInput.value;
        
        if (password === '') {
            showError(errorElement, 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            showError(errorElement, 'Password must be at least 8 characters');
            return false;
        }
        
        if (!/[A-Z]/.test(password)) {
            showError(errorElement, 'Password must contain at least one uppercase letter');
            return false;
        }
        
        if (!/[0-9]/.test(password)) {
            showError(errorElement, 'Password must contain at least one number');
            return false;
        }
        
        clearError(errorElement);
        return true;
    }
    
    function validateAge() {
        const ageInput = document.getElementById('age');
        const errorElement = document.getElementById('age-error');
        const age = ageInput.value;
        
        if (age === '') {
            showError(errorElement, 'Age is required');
            return false;
        }
        
        if (isNaN(age) ) {
            showError(errorElement, 'Age must be a number');
            return false;
        }
        
        if (age < 13) {
            showError(errorElement, 'You must be at least 13 years old');
            return false;
        }
        
        if (age > 120) {
            showError(errorElement, 'Please enter a valid age');
            return false;
        }
        
        clearError(errorElement);
        return true;
    }
    
    // Helper functions for error handling
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    }
});