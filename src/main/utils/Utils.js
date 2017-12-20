import uuidv4 from 'uuid/v4';

/* Obtain difference between two dates in hours. */
export function countDaysSinceDate (date) {
  const today = new Date();

  // Calculate difference between the two dates in hours
  const dayCount = (((((today - date) / 1000) / 60) / 60) / 60);

  return Math.round(dayCount);
}

/**
 * Generate random uuid.
 *
 * @returns {string} Generated id.
 */
export function generateRandomId () {
  return uuidv4();
}
