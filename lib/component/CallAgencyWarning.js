import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import get from 'lodash/get';

import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';

var CallAgencyWarning = function CallAgencyWarning(_ref) {
  var route = _ref.route;
  return React.createElement(
    'div',
    { className: 'route-warning-message padding-normal' },
    React.createElement(
      'div',
      { className: 'upper' },
      React.createElement(Icon, { className: 'warning-message-icon', img: 'icon-icon_call' }),
      React.createElement(FormattedMessage, { id: 'warning-call-agency-no-route', defaultMessage: 'Only on demand. Needs to be booked in advance.' })
    ),
    get(route, 'agency.phone', false) ? React.createElement(
      'div',
      { className: 'call-button' },
      React.createElement(
        Link,
        { href: 'tel:' + route.agency.phone },
        React.createElement(FormattedMessage, { id: 'call', defaultMessage: 'Call' }),
        route.agency.phone
      )
    ) : ''
  );
};

CallAgencyWarning.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays a warning message.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'normal' },
      React.createElement(CallAgencyWarning, null)
    )
  );
};

CallAgencyWarning.propTypes = {
  route: PropTypes.object.isRequired
};
CallAgencyWarning.contextTypes = {
  config: PropTypes.object.isRequired
};

export default CallAgencyWarning;