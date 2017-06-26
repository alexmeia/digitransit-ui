import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage, intlShape } from 'react-intl';

function RelativeDuration(props) {
  var duration = moment.duration(props.duration);

  var hourShort = React.createElement(FormattedMessage, { id: 'hour-short', defaultMessage: 'h' });

  var minuteShort = React.createElement(FormattedMessage, { id: 'minute-short', defaultMessage: 'min' });

  if (duration.asHours() >= 1) {
    var hours = duration.hours() + duration.days() * 24;
    return React.createElement(
      'span',
      null,
      hours,
      ' ',
      hourShort,
      ' ',
      duration.minutes(),
      ' ',
      minuteShort
    );
  }
  return React.createElement(
    'span',
    null,
    duration.minutes(),
    ' ',
    minuteShort
  );
}

RelativeDuration.contextTypes = {
  intl: intlShape.isRequired
};

RelativeDuration.propTypes = {
  duration: PropTypes.number.isRequired
};

export default RelativeDuration;