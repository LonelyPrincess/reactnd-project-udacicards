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
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
}
