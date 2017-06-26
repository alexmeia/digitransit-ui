import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import { TIME_PATTERN, DATE_PATTERN } from '../util/timeUtils';

var time = function time(momentTime) {
  return React.createElement(
    'span',
    { className: 'capitalize' },
    momentTime.format(TIME_PATTERN)
  );
};

/**
 * Returns date time or time if same day as reference
 */
var dateTime = function dateTime(momentTime, momentRefTime) {
  if (momentTime.isSame(momentRefTime, 'day')) {
    return time(momentTime);
  }
  return React.createElement(
    'span',
    { className: 'capitalize' },
    React.createElement(
      'span',
      { className: 'timeframe-nextday' },
      momentTime.format(DATE_PATTERN)
    ),
    '\xA0',
    React.createElement(
      'span',
      null,
      momentTime.format(TIME_PATTERN)
    )
  );
};

var TimeFrame = function TimeFrame(_ref) {
  var className = _ref.className,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      refTime = _ref.refTime;

  var now = moment(refTime);
  var start = moment(startTime);
  var end = moment(endTime);

  return React.createElement(
    'span',
    { className: className },
    dateTime(start, now),
    ' - ',
    time(end)
  );
};

TimeFrame.description = 'Displays the time frame of interval (example: 15:55 - 16:15)';

TimeFrame.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  refTime: PropTypes.number.isRequired,
  className: PropTypes.string
};

TimeFrame.displayName = 'TimeFrame';
export { TimeFrame as default };