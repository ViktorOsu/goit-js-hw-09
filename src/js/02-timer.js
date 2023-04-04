import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
 
const timer = {
  deadline: new Date(),
  intervalId: null,
  rootSelector: document.querySelector('.timer'),
   

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
       
      if (diff < 500) {
        this.stop();
       
          return;
         }
        
       

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      console.dir(this.rootSelector);

      this.rootSelector.querySelector('.value[data-days]').innerHTML =
        this.pad(days);
      this.rootSelector.querySelector('.value[data-hours]').innerHTML =
        this.pad(hours);
      this.rootSelector.querySelector('.value[data-minutes]').innerHTML =
        this.pad(minutes);
      this.rootSelector.querySelector('.value[data-seconds]').innerHTML =
        this.pad(seconds);

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
      startBtn.disabled = true;
    } else {

      timer.deadline = dataInput;
      startBtn.disabled = false;  
   
  }
};


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
  startBtn.disabled = true;
};

startBtn.addEventListener('click', onStartClick);