function showRegisterForm() {
  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

function showLoginForm() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function register() {
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const message = document.getElementById("register-message");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    message.textContent = "Invalid email format. Example: user@example.com";
    message.className = "message error";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    message.className = "message error";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.email === email)) {
    message.textContent = "Email already exists!";
    message.className = "message error";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registered Successfully!";
  message.className = "message success";

  setTimeout(() => {
    message.textContent = "";
    showLoginForm();

    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";
  }, 2000);
}

function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("login-message");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    message.textContent = "Login successful!";
    message.className = "message success";
    localStorage.setItem("loggedInUser", email);

    setTimeout(() => {
      message.textContent = "";
      alert("Welcome! Redirecting to your dashboard...");

      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
    }, 2000);
  } else {
    message.textContent = "Invalid email or password.";
    message.className = "message error";
  }
}
