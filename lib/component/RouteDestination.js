import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';
import { realtimeDeparture as ExampleData } from './ExampleData';

function RouteDestination(props, context) {
  var destination = void 0;
  if (props.isArrival) {
    destination = React.createElement(
      'span',
      { className: 'destination arrival' },
      React.createElement('span', { className: cx('last-stop-icon', props.mode.toLowerCase()) }),
      React.createElement(
        'span',
        null,
        context.intl.formatMessage({
          id: 'route-destination-arrives',
          defaultMessage: 'Arrives / Terminus'
        })
      )
    );
  } else {
    destination = React.createElement(
      'span',
      { className: 'destination' },
      props.destination
    );
  }

  return React.createElement(
    'span',
    { className: cx('route-destination', 'overflow-fade', props.className) },
    destination
  );
}

RouteDestination.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display the destination of the route (headsign)'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RouteDestination, {
        mode: ExampleData.pattern.route.mode,
        destination: ExampleData.pattern.headsign || ExampleData.pattern.route.longName
      })
    ),
    React.createElement(
      ComponentUsageExample,
      {
        description: 'isArrival true'
      },
      React.createElement(RouteDestination, {
        mode: ExampleData.pattern.route.mode,
        destination: ExampleData.pattern.headsign || ExampleData.pattern.route.longName,
        isArrival: true
      })
    )
  );
};

RouteDestination.propTypes = {
  mode: PropTypes.string,
  destination: PropTypes.string,
  className: PropTypes.string,
  isArrival: PropTypes.bool
};

RouteDestination.contextTypes = {
  intl: intlShape.isRequired
};

RouteDestination.displayName = 'RouteDestination';
export default RouteDestination;