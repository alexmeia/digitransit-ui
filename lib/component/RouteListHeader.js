import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

var RouteListHeader = function RouteListHeader(_ref) {
  var className = _ref.className;
  return React.createElement(
    'div',
    { className: cx('route-list-header route-stop row padding-vertical-small', className) },
    React.createElement(
      'div',
      { className: 'columns route-stop-now' },
      React.createElement(FormattedMessage, { id: 'right-now', defaultMessage: 'Right now' })
    ),
    React.createElement(
      'div',
      { className: 'columns route-stop-name' },
      React.createElement(FormattedMessage, { id: 'stop', defaultMessage: 'Stop' })
    ),
    React.createElement(
      'div',
      { className: 'columns route-stop-time' },
      React.createElement(FormattedMessage, { id: 'leaves', defaultMessage: 'Leaves' })
    ),
    React.createElement(
      'div',
      { className: 'columns route-stop-time' },
      React.createElement(FormattedMessage, { id: 'next', defaultMessage: 'Next' })
    )
  );
};

RouteListHeader.propTypes = {
  className: PropTypes.string
};

export default RouteListHeader;