//Public html
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


//Private html
function toggleCardContent(button) {
  const card = button.parentElement;
  const cardContent = card.querySelector('.card-content');

  if (cardContent.style.display === 'none') {
      cardContent.style.display = 'block';
      button.textContent = '-';
  } else {
      cardContent.style.display = 'none';
      button.textContent = '+';
  }
}


//public html SQL

const apiBaseURL = 'http://localhost:3000';

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  try {
    const response = await fetch(`${apiBaseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmpassword: confirmPassword,
      }),
    });

    const data = await response.json();
    alert(data.msg);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${apiBaseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      showUserDetails();
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


// Check if the user is already authenticated (if token exists)
const token = localStorage.getItem('token');
if (token) {
  showUserDetails();
} else {
  const loginSection = document.getElementById('login');
  loginSection.style.display = 'block';
}
