const stepNumbers = document.querySelectorAll('.steps-items-span');
const stepNames = document.querySelectorAll('.steps-item-name');
const stepContainers = document.querySelectorAll('.steps-item-container');
const stepSections = document.querySelectorAll('.section-step');

const buttonNext = document.querySelector('.next-step');
const buttonPrev = document.querySelector('.prev-step');


let stepNumber = localStorage.getItem('currentStep')
    ? parseInt(localStorage.getItem('currentStep'))
    : 0;

init();

function init() {
    changeStep(stepNumber);
    managePrevButton();
}

function managePrevButton() {
    if (stepNumber === 0) {
        buttonPrev.classList.add('prev-step_hidden');
    } else {
        buttonPrev.classList.remove('prev-step_hidden');
    }
}

function manageNextButton() {
    if (stepNumber === 0) {
        buttonPrev.classList.add('prev-step_hidden');
    } else {
        buttonPrev.classList.remove('prev-step_hidden');
    }
}

function nextStep() {
    if (stepNumber < stepSections.length - 1) {
        changeStep(stepNumber + 1);
        managePrevButton();
    }
}

function prevStep() {
    if (stepNumber > 0) {
        changeStep(stepNumber - 1);
        managePrevButton();
    }
}

function changeStep(index) {
    stepNumber = index;

    stepNumbers.forEach((num) => num.classList.remove('active'));
    stepNames.forEach((name) => name.classList.remove('p-active'));
    stepSections.forEach((section) => section.classList.remove('section-active'));

    if (stepNumbers[index]) stepNumbers[index].classList.add('active');
    if (stepNames[index]) stepNames[index].classList.add('p-active');
    if (stepSections[index]) stepSections[index].classList.add('section-active');

    localStorage.setItem('currentStep', stepNumber);
    managePrevButton();
}

// Listeners

stepContainers.forEach((container, idx) => {
    container.addEventListener('click', () => changeStep(idx));
});

buttonNext.addEventListener('click', nextStep)
buttonPrev.addEventListener('click', prevStep)

// Fim Lógica de Steps



