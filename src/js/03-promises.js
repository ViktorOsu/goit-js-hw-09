import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onCreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onCreatePromise(event) {
  event.preventDefault();

  const inputDelay = Number(form.delay.value);
  const inputStep = Number(form.step.value);
  const inputAmount = Number(form.amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    const delay = inputDelay + inputStep * (i - 1);

    createPromise(i, delay)
      .then(value => Notify.success(value))
      .catch(value => Notify.failure(value));
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
