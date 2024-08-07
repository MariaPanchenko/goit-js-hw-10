// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо посилання на елементи DOM
const dataPickerEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const deysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// let currentDate = new Date();
// let selectedDate = null;
// let deltaTime = null;
// let intervalId = null;
// let isValidDate = true;

// Спочатку кнопка "Start" вимкнена
buttonEl.disabled = true;
// let timerInterval;
let userSelectedDate = null;
let countdownInterval = null;

// Параметри для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Колбек, що викликається при закритті календаря
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Якщо вибрана дата в минулому, показуємо повідомлення про помилку
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      buttonEl.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      buttonEl.disabled = false;
    }
  },
};

// ініціалізація flatpickr
flatpickr(dataPickerEl, options);

buttonEl.addEventListener('click', onClick);

// Колбек для обробки події натискання на кнопку "Start"
// buttonEl.addEventListener('click', () => {
//   buttonEl.disabled = true;
//   dataPickerEl.disabled = true;

function onClick() {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
    buttonEl.disabled = true;
    dataPickerEl.disabled = true;
  }
}

// Функція для запуску зворотного відліку

function startCountdown(endDate) {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = endDate - now;

    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      dataPickerEl.disabled = false;
      buttonEl.disabled = true;
      return;
    }

    // timerInterval = setInterval(() => {
    //   let currentDate = new Date();
    //   const timeRemaining = userSelectedDate - currentDate;

    //   if (timeRemaining <= 0) {
    //     clearInterval(timerInterval);
    //     dataPickerEl.disabled = false;
    //     buttonEl.disabled = true;
    //     updateTimerDisplay(0, 0, 0, 0);
    //     return;
    //   }
    const time = convertMs(timeRemaining);
    updateComponentsTimer(time);
  }, 1000);
}

// Функція для конвертації мілісекунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для оновлення відображення таймера
function updateComponentsTimer({ days, hours, minutes, seconds }) {
  deysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Функція для додавання нулів до числа, якщо воно менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
