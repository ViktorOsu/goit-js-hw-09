import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');

let dataDays = document.querySelector('.value[data-days]');
let dataHours = document.querySelector('.value[data-hours]');
let dataMinutes = document.querySelector('.value[data-minutes]');
let dataSeconds = document.querySelector('.value[data-seconds]');

setStateButton(true);

function setStateButton(state) {
  startBtn.disabled = state;
}

const timer = {
  deadline: new Date(),
  intervalId: null,
  rootSelector: document.querySelector('.timer'),

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();

      if (diff < 0) {
        this.stop();

        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      dataDays.textContent = this.pad(days);
      dataHours.textContent = this.pad(hours);
      dataMinutes.textContent = this.pad(minutes);
      dataSeconds.textContent = this.pad(seconds);

      console.log(diff);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

function selectedDate(dataInput) {
  const currentDate = Date.now();

  if (dataInput <= currentDate) {
    Notify.failure('Please choose a date in the future', {
      timeout: 6000,
    });
    setStateButton(true);
  } else {
    timer.deadline = dataInput;
    setStateButton(false);
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate(selectedDates[0]);
  },
};

const flatpick = flatpickr('#datetime-picker', options);

const onStartClick = () => {
  timer.start();
  setStateButton(true);
};

startBtn.addEventListener('click', onStartClick);
