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

let submitButton = document.querySelector(".submit-button")

submitButton.addEventListener('click', (e) => {
    submitForm(e)
})

function submitForm(e) {

    page = e.target.dataset.page;
    if (page == 'recovery' || page == 'alter') {
        return;
    }

    let alertHeading = page == 'login' ? 'Validado!' : 'Cadastrado!'
    let alertMessage = page == 'login' ? 'Redirecionando para página segura...' : 'Redirecionando para página de autenticação...';

    let section = document.querySelector('.section-form');
    section.innerHTML = '';

    let alertContainerEl = document.createElement('div')
    alertContainerEl.classList.add('alert_container')

    alertContainerEl.innerHTML = `
        <img src="./assets/images/success_action.svg" alt="">
        <h4>${alertHeading}</h4>
        <p>${alertMessage}</p>
                                `

    section.appendChild(alertContainerEl);
    redirectTo(alertContainerEl, page)

}


function redirectTo(alertContainerEl, page) {
    setTimeout(() => {
        alertContainerEl.classList.add('visibility')
    }, 50)
    setTimeout(() => {
        alertContainerEl.classList.remove('hidden')
        if (page == 'login') {
            window.location.href = "/MVP-Rotus/home.html";
        } else if (page = 'register') {
            window.location.href = "/MVP-Rotus/login.html";
        }
    }, 3000)
}