// Get elements
const signupLink = document.getElementById("signup");
const loginLink = document.getElementById("login");
const loginForm = document.querySelector(".login_form");
const signupForm = document.querySelector(".signup_form");

// Initially show the login form and hide the signup form
signupForm.style.display = "none";

// Event listener to switch to the signup form
signupLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  loginForm.style.display = "none"; // Hide login form
  signupForm.style.display = "block"; // Show signup form
});

// Event listener to switch to the login form
loginLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  signupForm.style.display = "none"; // Hide signup form
  loginForm.style.display = "block"; // Show login form
});

// Form validation and account creation for signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const username = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector("#sign-up-password").value;
  const confirmPassword = signupForm.querySelector(
    "#sign-up-confirm-password"
  ).value;
  const passwordMismatchMessage = document.getElementById(
    "password-mismatch-message"
  );

  // Clear any previous error message
  if (passwordMismatchMessage) {
    passwordMismatchMessage.style.display = "none";
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    // Display mismatch message
    let errorMessage = document.createElement("p");
    errorMessage.id = "password-mismatch-message";
    errorMessage.style.color = "red";
    errorMessage.textContent = "Password and Confirm Password do not match!";

    // Append the error message to the form (you can customize where this appears)
    signupForm.appendChild(errorMessage);
    return;
  }

  // Optionally: Check password complexity (e.g., minimum 6 characters)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Example: at least 6 characters with letters and numbers
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 6 characters long and contain both letters and numbers."
    );
    return;
  }

  fetch(`${CONFIG.SERVER_URL}/register`, {
    method: "POST", // Set method as POST
    headers: {
      "Content-Type": "application/json", // Specify JSON content
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      // Clear the form after success
      if (res.status) {
        alert("Register Successfull. Please Login");
        signupForm.reset();
        signupForm.style.display = "none"; // Hide signup form
        loginForm.style.display = "block"; // Show login form
      } else {
        alert(res.error);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Form validation and login for login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  fetch(`${CONFIG.SERVER_URL}/login`, {
    method: "POST", // Set method as POST
    headers: {
      "Content-Type": "application/json", // Specify JSON content
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.status) {
        alert("Login successful!");
        const token = res.data;
        localStorage.setItem("token", token);
        const currentPath = window.location.pathname
          .split("/")
          .slice(0, -1)
          .join("/");
        window.location.href = `${window.location.origin}${currentPath}/index.html`;
      } else {
        alert(res.error);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
