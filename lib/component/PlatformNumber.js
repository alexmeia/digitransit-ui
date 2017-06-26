import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';

function PlatformNumber(_ref) {
  var number = _ref.number,
      short = _ref.short;

  if (!number) {
    return false;
  }

  if (short) {
    return React.createElement(
      'span',
      { className: 'platform-short' },
      React.createElement(FormattedMessage, {
        id: 'platform-short',
        values: { platformCode: number },
        defaultMessage: 'Plat. {platformCode}'
      })
    );
  }

  return React.createElement(
    'span',
    { className: 'platform-number' },
    React.createElement(FormattedMessage, {
      id: 'platform-num',
      values: { platformCode: number },
      defaultMessage: 'Platform {platformCode}'
    })
  );
}

PlatformNumber.propTypes = {
  number: PropTypes.string,
  short: PropTypes.bool
};

PlatformNumber.defaultProps = {
  number: false,
  short: true
};

PlatformNumber.displayName = 'PlatformNumber';

PlatformNumber.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Displays the platform number for a specific departure'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(PlatformNumber, {
        number: '2'
      })
    )
  );
};

export default PlatformNumber;