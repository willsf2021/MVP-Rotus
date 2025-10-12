document.querySelectorAll('.password-field').forEach(field => {
    const input = field.querySelector('.password-input');
    const toggle = field.querySelector('.toggle-password');

    toggle.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.classList.toggle('bi-eye', !isPassword);
        toggle.classList.toggle('bi-eye-slash', isPassword);
    });
});