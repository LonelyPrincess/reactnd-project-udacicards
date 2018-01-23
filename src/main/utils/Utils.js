import { ToastAndroid } from 'react-native';

/**
 * Get the number of days between today and specified date.
 * @param {Date} date
 * @return Days ellapsed since specified date.
 */
export function countDaysSinceDate (date) {
  const today = new Date();

  // Calculate difference between the two dates in days
  const dayCount = (((((today - date) / 1000) / 60) / 60) / 60);

  return Math.round(dayCount);
}

/**
 * Display a toast message on screen.
 * @param {string} message - Message to display.
 */
export function displayToast (message) {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    30
  );
}

/**
 * Get a random number between two values (max is exclusive).
 * @param {number} min - Min value for the range.
 * @param {number} max - Max value for the range.
 * @return Integer between min and max.
 */
export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Shuffle array elements using Durstenfeld algorythm.
 * @param {array} array - Array to shuffle.
 */
export function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
};