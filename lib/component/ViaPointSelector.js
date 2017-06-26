import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';
import { otpToLocation } from '../util/otpStrings';
import ComponentUsageExample from './ComponentUsageExample';

export default function ViaPointSelector(_ref) {
  var intermediatePlaces = _ref.intermediatePlaces,
      openSearchModal = _ref.openSearchModal,
      removeViaPoint = _ref.removeViaPoint;

  return React.createElement(
    'section',
    { className: 'offcanvas-section' },
    React.createElement(FormattedMessage, {
      tagName: 'h4',
      defaultMessage: 'Via point',
      id: 'via-point'
    }),
    intermediatePlaces ? React.createElement(
      'div',
      { className: 'via-point' },
      React.createElement(
        'button',
        { className: 'noborder link-name', onClick: openSearchModal },
        React.createElement(
          'span',
          null,
          otpToLocation(intermediatePlaces).address
        )
      ),
      React.createElement(
        'button',
        { className: 'noborder icon-button', onClick: removeViaPoint },
        React.createElement(Icon, { img: 'icon-icon_close' })
      )
    ) : React.createElement(
      'button',
      { className: 'noborder cursor-pointer', onClick: openSearchModal },
      React.createElement(
        'div',
        { className: 'add-via-point-button-label' },
        React.createElement(Icon, { img: 'icon-icon_plus' }),
        '\xA0\xA0',
        React.createElement(FormattedMessage, {
          id: 'add-itinerary-via-point',
          defaultMessage: 'Add via point for itinerary'
        })
      )
    )
  );
}

ViaPointSelector.propTypes = {
  openSearchModal: PropTypes.func.isRequired,
  removeViaPoint: PropTypes.func.isRequired,
  intermediatePlaces: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};

ViaPointSelector.defaultProps = {
  intermediatePlaces: false
};

var emptyFunction = function emptyFunction() {};

ViaPointSelector.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Via point selector'
    ),
    React.createElement(
      'div',
      { className: 'customize-search' },
      React.createElement(
        ComponentUsageExample,
        { description: 'empty' },
        React.createElement(ViaPointSelector, {
          openSearchModal: emptyFunction,
          removeViaPoint: emptyFunction,
          intermediatePlaces: false
        })
      ),
      React.createElement(
        ComponentUsageExample,
        { description: 'with place' },
        React.createElement(ViaPointSelector, {
          openSearchModal: emptyFunction,
          removeViaPoint: emptyFunction,
          intermediatePlaces: 'Opastinsilta 6, Helsinki::60.199087,24.940641'
        })
      )
    )
  );
};