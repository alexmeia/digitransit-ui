import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { intlShape, FormattedMessage } from 'react-intl';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import { currentTime as exampleCurrentTime, departure as exampleDeparture, realtimeDeparture as exampleRealtimeDeparture } from './ExampleData';

function DepartureTime(props, context) {
  var shownTime = void 0;
  var timeDiffInMinutes = Math.floor((props.departureTime - props.currentTime) / 60);

  if (timeDiffInMinutes < 0 || timeDiffInMinutes > context.config.minutesToDepartureLimit) {
    var departureTime = moment(props.departureTime * 1000);
    if (props.useUTC) {
      departureTime.utc();
    }
    shownTime = departureTime.format('HH:mm');
  } else if (timeDiffInMinutes === 0) {
    shownTime = React.createElement(FormattedMessage, { id: 'arriving-soon', defaultMessage: 'Now' });
  } else {
    shownTime = React.createElement(FormattedMessage, {
      id: 'departure-time-in-minutes',
      defaultMessage: '{minutes} min',
      values: { minutes: timeDiffInMinutes }
    });
  }

  var realtime = void 0;
  if (props.realtime && !props.canceled) {
    realtime = React.createElement(Icon, { img: 'icon-icon_realtime', className: 'realtime-icon realtime' });
  }
  return React.createElement(
    'span',
    {
      style: props.style,
      className: cx('time', {
        realtime: props.realtime,
        canceled: props.canceled
      }, props.className)
    },
    realtime,
    shownTime
  );
}

DepartureTime.contextTypes = {
  intl: intlShape.isRequired
};

DepartureTime.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display time in correct format. Displays minutes for 20 minutes, otherwise in HH:mm format. Also, it takes into account if the time is realtime. The prop useUTC forces rendering in UTC, not local TZ, for testing.'
    ),
    React.createElement(
      ComponentUsageExample,
      {
        description: 'real time'
      },
      React.createElement(DepartureTime, {
        departureTime: exampleRealtimeDeparture.stoptime,
        realtime: exampleRealtimeDeparture.realtime,
        currentTime: exampleCurrentTime,
        useUTC: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'not real time' },
      React.createElement(DepartureTime, {
        departureTime: exampleDeparture.stoptime,
        realtime: exampleDeparture.realtime,
        currentTime: exampleCurrentTime,
        useUTC: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'canceled' },
      React.createElement(DepartureTime, {
        departureTime: exampleDeparture.stoptime,
        realtime: exampleDeparture.realtime,
        currentTime: exampleCurrentTime,
        canceled: true,
        useUTC: true
      })
    )
  );
};

DepartureTime.displayName = 'DepartureTime';

DepartureTime.propTypes = {
  className: PropTypes.string,
  canceled: PropTypes.bool,
  currentTime: PropTypes.number.isRequired,
  departureTime: PropTypes.number.isRequired,
  realtime: PropTypes.bool,
  style: PropTypes.object,
  useUTC: PropTypes.bool
};

DepartureTime.contextTypes = {
  config: PropTypes.object.isRequired
};

export default DepartureTime;

/**
 * maps stoptime to data structure required by DepartureTime. This is copied
 * from departure-list-container.
 *
 *  @param stoptime stoptime from graphql
 *  @param pattern pattern from graphql
 */

export var mapStopTime = function mapStopTime(stoptime, pattern) {
  return {
    stop: stoptime.stop,
    canceled: stoptime.realtimeState === 'CANCELED',
    departureTime: stoptime.serviceDay + (stoptime.realtimeState === 'CANCELED' || stoptime.realtimeDeparture === -1 ? stoptime.scheduledDeparture : stoptime.realtimeDeparture),
    realtime: stoptime.realtimeDeparture !== -1 && stoptime.realtime,
    pattern: pattern && pattern.pattern,
    trip: stoptime.trip
  };
};

/**
 * maps stoptime to DepartureTime component
 *  @param stoptime stoptime from graphql
 *  @param currentTime
 */
export var fromStopTime = function fromStopTime(stoptime, currentTime) {
  return React.createElement(DepartureTime, _extends({
    currentTime: currentTime }, mapStopTime(stoptime), { style: { whiteSpace: 'nowrap' }
  }));
};