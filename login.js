// Get elements
const signupLink = document.getElementById('signup');
const loginLink = document.getElementById('login');
const loginForm = document.querySelector('.login_form');
const signupForm = document.querySelector('.signup_form');

// Initially show the login form and hide the signup form
signupForm.style.display = 'none';

// Event listener to switch to the signup form
signupLink.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent default link behavior
    loginForm.style.display = 'none';  // Hide login form
    signupForm.style.display = 'block'; // Show signup form
});

// Event listener to switch to the login form
loginLink.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent default link behavior
    signupForm.style.display = 'none'; // Hide signup form
    loginForm.style.display = 'block'; // Show login form
});

// Form validation and account creation for signup
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form submission

    const username = signupForm.querySelector('input[type="text"]').value;
    const password = signupForm.querySelector('input[type="password"]:nth-child(2)').value;
    const confirmPassword = signupForm.querySelector('input[type="password"]:nth-child(3)').value;
    const passwordMismatchMessage = document.getElementById('password-mismatch-message');

    // Clear any previous error message
    if (passwordMismatchMessage) {
        passwordMismatchMessage.style.display = 'none';
    }

    // Check if all fields are filled
    if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('All fields are required!');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        // Display mismatch message
        let errorMessage = document.createElement('p');
        errorMessage.id = 'password-mismatch-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Password and Confirm Password do not match!';
        
        // Append the error message to the form (you can customize where this appears)
        signupForm.appendChild(errorMessage);
        return;
    }

    // Optionally: Check password complexity (e.g., minimum 6 characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Example: at least 6 characters with letters and numbers
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 6 characters long and contain both letters and numbers.');
        return;
    }

    // Store account details in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Show success message after account creation
    alert('Account created successfully! You can now log in.');
    
    // Clear the form after success
    signupForm.reset();
    signupForm.style.display = 'none';  // Hide signup form
    loginForm.style.display = 'block';  // Show login form
});

// Form validation and login for login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form submission

    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Get stored account details from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if username and password are empty
    if (username.trim() === '' || password.trim() === '') {
        alert('Both username and password are required!');
        return;
    }

    // Check if username and password match stored details
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
    } else {
        alert('Incorrect username or password!');
    }
});
