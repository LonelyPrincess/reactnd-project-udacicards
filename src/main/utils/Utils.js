import { ToastAndroid } from 'react-native';

/* Obtain difference between two dates in hours. */
export function countDaysSinceDate (date) {
  const today = new Date();

  // Calculate difference between the two dates in hours
  const dayCount = (((((today - date) / 1000) / 60) / 60) / 60);

  return Math.round(dayCount);
}

/**
 * Display a toast message on screen.
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
 * @return Integer between min and max.
 */
export function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
