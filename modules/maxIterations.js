/** @type HTMLInputElement */
const sliderElement = document.getElementById('max-iterations-slider');
/** @type HTMLInputElement */
const inputElement = document.getElementById('max-iterations');

let maxIterations = 100;
const listeners = new Set();

function onMaxIterationsUpdated(newMaxIterations) {
  maxIterations = newMaxIterations;
  sliderElement.value = maxIterations;
  inputElement.value = maxIterations;
  for (const listener of listeners) {
    listener(maxIterations);
  }
}

export function attachMaxIterationsListener() {
  sliderElement.addEventListener('input', () => {
    const value = Number(sliderElement.value);
    if (value === maxIterations) return;
  
    onMaxIterationsUpdated(value);
  });
  
  inputElement.addEventListener('input', () => {
    const value = Number(inputElement.value);
    if (value === maxIterations) return;
  
    onMaxIterationsUpdated(value);
  });
}

/**
 * @param {(maxIterations: number) => void)} listener 
 */
export function listenToMaxIterations(listener) {
  listeners.add(listener);
}