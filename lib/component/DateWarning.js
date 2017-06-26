import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';

var DATE_PATTERN = 'dd D.M.';

var DateWarning = function DateWarning(_ref) {
  var date = _ref.date,
      refTime = _ref.refTime;

  var now = moment(refTime);
  var start = moment(date);

  if (start.isSame(now, 'day')) {
    return null;
  }

  return React.createElement(
    'span',
    { className: 'date-warning' },
    React.createElement(FormattedMessage, { id: 'leaves', defaultMessage: 'Leaves' }),
    '\xA0',
    start.format(DATE_PATTERN)
  );
};

DateWarning.description = function () {
  var today = moment().hour(12).minute(34).second(0).valueOf();
  var date = 1478611781000;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays a warning if the date is not today.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'today-show-nothing' },
      React.createElement(DateWarning, {
        date: today,
        refTime: today + 1000
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'tomorrow-show-warning' },
      React.createElement(DateWarning, {
        date: date,
        refTime: today
      })
    )
  );
};

DateWarning.propTypes = {
  date: PropTypes.number.isRequired,
  refTime: PropTypes.number.isRequired
};

DateWarning.displayName = 'DateWarning';
export default DateWarning;