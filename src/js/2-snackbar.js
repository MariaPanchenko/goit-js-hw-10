// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// отримуємо доступ до форми і вішаємо на неї обробник події
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

const delayInputEl = document.querySelector('.delay-input');
const buttonEl = document.querySelector('button');
const radioInputs = document.getElementsByName('state');

function getPromiseType() {
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked) return radioInputs[i].value;
  }
}

function createPromise(type, delayValue) {
  const delay = Number(delayValue);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type === 'fulfilled') {
        // Fulfill
        resolve({ type, delay });
      } else {
        // Reject
        reject({ type, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const promiseType = getPromiseType();
  const delayValue = delayInputEl.value;

  if (promiseType && delayValue) {
    createPromise(promiseType, delayValue)
      .then(({ type, delay }) => {
        iziToast.success({
          timeout: 3000,
          position: 'topRight',
          title: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(({ type, delay }) => {
        iziToast.error({
          timeout: 3000,
          position: 'topRight',
          title: `❌ Rejected promise in ${delay}ms`,
        });
      });
  }
}

// buttonEl.addEventListener('click', onCreateNotification);
