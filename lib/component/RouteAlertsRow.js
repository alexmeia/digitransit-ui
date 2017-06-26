import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import RouteNumber from './RouteNumber';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';

export default function RouteAlertsRow(_ref) {
  var header = _ref.header,
      description = _ref.description,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      routeMode = _ref.routeMode,
      routeLine = _ref.routeLine,
      expired = _ref.expired;

  return React.createElement(
    'div',
    { className: cx('route-alert-row', { expired: expired }) },
    React.createElement(RouteNumber, { mode: routeMode, text: routeLine, vertical: true }),
    React.createElement(Icon, { img: 'icon-icon_caution', className: 'caution' }),
    React.createElement(
      'div',
      { className: 'route-alert-contents' },
      React.createElement(
        'div',
        { className: 'route-alert-duration' },
        startTime,
        ' \u2013 ',
        endTime
      ),
      React.createElement(
        'div',
        { className: cx('route-alert-header', routeMode) },
        header
      ),
      React.createElement(
        'div',
        { className: 'route-alert-body' },
        description
      )
    )
  );
}

RouteAlertsRow.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  routeMode: PropTypes.string.isRequired,
  routeLine: PropTypes.string.isRequired,
  expired: PropTypes.bool.isRequired
};

RouteAlertsRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a disruption alert for a specific route.'
    ),
    React.createElement(
      'div',
      { className: 'route-alerts-list' },
      React.createElement(
        ComponentUsageExample,
        {
          description: 'Currently active disruption'
        },
        React.createElement(RouteAlertsRow, {
          header: 'Raitiolinja 2 - Myöhästyy',
          description: 'Raitiolinjat: 2 Kaivopuiston suuntaan ja 3 Nordenskiöldinkadun ' + 'suuntaan, myöhästyy. Syy: tekninen vika. Paikka: Kauppatori, Hakaniemi. ' + 'Arvioitu kesto: 14:29 - 15:20.',
          startTime: '11:32',
          endTime: '12:20',
          routeMode: 'tram',
          routeLine: '2',
          day: 'Today',
          expired: false
        })
      ),
      React.createElement(
        ComponentUsageExample,
        { description: 'Past disruption' },
        React.createElement(RouteAlertsRow, {
          header: 'Raitiolinja 2 - Myöhästyy',
          description: 'Raitiolinjat: 2 Kaivopuiston suuntaan ja 3 Nordenskiöldinkadun ' + 'suuntaan, myöhästyy. Syy: tekninen vika. Paikka: Kauppatori, Hakaniemi. ' + 'Arvioitu kesto: 14:29 - 15:20.',
          startTime: '11:32',
          endTime: '12:20',
          routeMode: 'tram',
          routeLine: '2',
          day: 'Yesterday',
          expired: true
        })
      )
    )
  );
};