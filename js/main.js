const buttons = document.querySelectorAll('.option');
const slider = document.querySelector('.slider');
const documentSection = document.querySelector(".document");
const clientSection = document.querySelector(".client");

window.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector('.option[data-value="documents"]');
    if (defaultBtn) switchContainer(defaultBtn, 0);
});

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        switchContainer(btn, index);
    });
});

function switchContainer(btn, index) {
    document.querySelector('.option.active')?.classList.remove('active');
    btn.classList.add('active');
    slider.style.transform = `translateX(${index * 100}%)`;

    if (btn.dataset.value === 'documents') {
        documentSection.style.display = 'block';
        documentSection.classList.add('container-visible');
        clientSection.style.display = 'none';
        clientSection.classList.remove('container-visible');
    } else {
        documentSection.style.display = 'none';
        documentSection.classList.remove('container-visible');
        clientSection.style.display = 'block';
        clientSection.classList.add('container-visible');
    }
}

// Data
const today = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const formatedDate = new Intl.DateTimeFormat('pt-BR', options).format(today);
document.querySelector('#now-date').innerText = `Hoje é ${formatedDate}`;
