const registerForm = document.getElementById('registerForm');
const feedback = document.getElementById('registerFeedback');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (!name || !email || !password) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'All fields are required';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            feedback.className = 'form-feedback success';
            feedback.textContent = data.message || 'Registered successfully!';
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = './login.html';
            }, 1500);
        } else {
            feedback.className = 'form-feedback error';
            feedback.textContent = data.message || 'Registration failed';
        }
    } catch (error) {
        console.error('Error:', error);
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Cannot connect to backend server. Make sure server is running.';
    }
});
