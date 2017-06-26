import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from './Icon';
import { durationToString } from '../util/timeUtils';

function Duration(props) {
  var duration = durationToString(props.duration * 1000);

  return React.createElement(
    'span',
    { className: cx(props.className) },
    React.createElement(Icon, { img: 'icon-icon_time' }),
    React.createElement(
      'span',
      { className: 'duration' },
      duration
    )
  );
}

Duration.description = function () {
  return "Displays itinerary's duration in minutes, and a time icon next to it." + 'Takes duration in seconds as props';
};

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Duration;