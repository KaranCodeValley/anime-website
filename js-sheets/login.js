const loginForm = document.getElementById('loginForm');
const feedback = document.getElementById('loginFeedback');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'All fields are required';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            feedback.className = 'form-feedback success';
            feedback.textContent = data.message || 'Logged in successfully!';

            // Store user name for homepage greeting
            if (data.name) {
                localStorage.setItem('userName', data.name);
            }

            // Redirect to home page
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            feedback.className = 'form-feedback error';
            feedback.textContent = data.message || 'Invalid email or password';
        }
    } catch (error) {
        console.error('Error:', error);
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Cannot connect to backend server. Make sure server is running.';
    }
});
