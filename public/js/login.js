const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log('got to post');
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      localStorage.setItem('email', email); 
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      localStorage.setItem('email', email); 
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

const signUpToggle = async (event) => {
  event.stopPropagation();
  const ls=document.querySelector('#login-section')
  ls.classList.toggle('d-none');
  const ss=document.querySelector('#signup-section');
  ss.classList.toggle('d-none');
  }

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler)

  document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler)

document
  .querySelector('#sign-up-toggle')
  .addEventListener('click', signUpToggle)

  document
  .querySelector('#sign-in-toggle')
  .addEventListener('click', signUpToggle)
