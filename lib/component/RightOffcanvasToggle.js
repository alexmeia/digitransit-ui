import PropTypes from 'prop-types';
import React from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

export default function RightOffcanvasToggle(_ref, _ref2) {
  var onToggleClick = _ref.onToggleClick,
      hasChanges = _ref.hasChanges;
  var formatMessage = _ref2.intl.formatMessage;

  var label = formatMessage({ id: 'settings-label-change', defaultMessage: 'Change settings' });
  return React.createElement(
    'div',
    { className: 'right-offcanvas-toggle' },
    React.createElement(
      'button',
      {
        onClick: onToggleClick,
        'aria-label': label,
        title: label,
        className: 'noborder cursor-pointer'
      },
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'icon-holder' },
          hasChanges ? React.createElement(Icon, { img: 'icon-icon_settings-adjusted' }) : React.createElement(Icon, { img: 'icon-icon_settings' }),
          hasChanges ? React.createElement(Icon, { img: 'icon-icon_attention', className: 'super-icon' }) : null
        ),
        React.createElement(
          'div',
          null,
          React.createElement(FormattedMessage, { id: 'settings', defaultMessage: 'Settings' })
        )
      )
    )
  );
}

RightOffcanvasToggle.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  hasChanges: PropTypes.bool
};

RightOffcanvasToggle.contextTypes = {
  intl: intlShape.isRequired
};

RightOffcanvasToggle.displayName = 'RightOffcanvasToggle';

RightOffcanvasToggle.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'A toggle for the itinerary search preferences.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Preferences are default preferences' },
      React.createElement(RightOffcanvasToggle, { onToggleClick: function onToggleClick() {} })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'User has modified the preferences' },
      React.createElement(RightOffcanvasToggle, { onToggleClick: function onToggleClick() {}, hasChanges: true })
    )
  );
};