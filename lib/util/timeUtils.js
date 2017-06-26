import moment from 'moment';

export var TIME_PATTERN = 'HH:mm';
export var DATE_PATTERN = 'dd D.M.';

// converts the given parameter into a string in format HHmm
// Input: time - seconds since midnight
export function getStartTime(time) {
  var hours = ('0' + Math.floor(time / 60 / 60)).slice(-2);
  var mins = ('0' + time / 60 % 60).slice(-2);
  return hours + mins;
}

// renders trip duration to string
// input: time duration - milliseconds
export function durationToString(inDuration) {
  var duration = moment.duration(inDuration);

  if (duration.asHours() >= 1) {
    return duration.hours() + duration.days() * 24 + ' h ' + duration.minutes() + ' min';
  }

  return duration.minutes() + ' min';
}

/**
 * Returns date or '' if same day as reference
 */
export var dateOrEmpty = function dateOrEmpty(momentTime, momentRefTime) {
  if (momentTime.isSame(momentRefTime, 'day')) {
    return '';
  }
  return momentTime.format(DATE_PATTERN);
};

export var sameDay = function sameDay(x, y) {
  return dateOrEmpty(x, y) === '';
};