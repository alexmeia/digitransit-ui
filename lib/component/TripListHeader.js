import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

var TripListHeader = function TripListHeader(_ref) {
  var className = _ref.className;
  return React.createElement(
    'div',
    { className: cx('route-list-header route-stop row padding-vertical-small', className) },
    React.createElement(
      'div',
      { className: 'columns small-3 route-stop-now' },
      React.createElement(FormattedMessage, { id: 'right-now', defaultMessage: 'Right now' })
    ),
    React.createElement(
      'div',
      { className: 'columns small-7 route-stop-name' },
      React.createElement(FormattedMessage, { id: 'stop', defaultMessage: 'Stop' })
    ),
    React.createElement(
      'div',
      { className: 'columns small-2 route-stop-time' },
      React.createElement(FormattedMessage, { id: 'leaves', defaultMessage: 'Leaves' })
    )
  );
};

TripListHeader.propTypes = {
  className: PropTypes.string
};

export default TripListHeader;