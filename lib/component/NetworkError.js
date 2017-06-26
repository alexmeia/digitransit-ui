import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Link, locationShape } from 'react-router';
import Icon from './Icon';

var NetworkError = function NetworkError(_ref, _ref2) {
  var retry = _ref.retry;
  var location = _ref2.location;
  return React.createElement(
    'div',
    { className: 'page-not-found' },
    React.createElement(Icon, { img: 'icon-icon_error_page_not_found' }),
    React.createElement(
      'p',
      null,
      React.createElement(FormattedMessage, { id: 'network-error', defaultMessage: 'There was a network error' })
    ),
    React.createElement(
      'p',
      null,
      React.createElement(
        Link,
        { to: location, onClick: retry },
        React.createElement(FormattedMessage, { id: 'try-again', defaultMessage: 'Try again \u203A' })
      )
    )
  );
};

NetworkError.propTypes = { retry: PropTypes.func.isRequired };
NetworkError.contextTypes = { location: locationShape.isRequired };

export default NetworkError;