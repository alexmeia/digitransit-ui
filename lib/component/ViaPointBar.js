import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import ViaPointSearchModal from './ViaPointSearchModal';
import Icon from './Icon';
import { otpToLocation } from '../util/otpStrings';
import ComponentUsageExample from './ComponentUsageExample';

export default function ViaPointBar(_ref) {
  var intermediatePlaces = _ref.intermediatePlaces,
      openSearchModal = _ref.openSearchModal,
      removeViaPoint = _ref.removeViaPoint,
      className = _ref.className;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: cx('via-point-bar', className) },
      intermediatePlaces && React.createElement(
        'div',
        { className: 'via-point' },
        React.createElement(FormattedMessage, {
          id: 'via-point',
          defaultMessage: 'Via point',
          className: 'via-point-header'
        }),
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
      )
    ),
    React.createElement(ViaPointSearchModal, null)
  );
}

ViaPointBar.propTypes = {
  className: PropTypes.string,
  openSearchModal: PropTypes.func.isRequired,
  removeViaPoint: PropTypes.func.isRequired,
  intermediatePlaces: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};

ViaPointBar.defaultProps = {
  className: false,
  intermediatePlaces: false
};

var emptyFunction = function emptyFunction() {};

ViaPointBar.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Via point selector'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'empty' },
      React.createElement(ViaPointBar, {
        openSearchModal: emptyFunction,
        removeViaPoint: emptyFunction,
        intermediatePlaces: false
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with place' },
      React.createElement(ViaPointBar, {
        openSearchModal: emptyFunction,
        removeViaPoint: emptyFunction,
        intermediatePlaces: 'Opastinsilta 6, Helsinki::60.199087,24.940641'
      })
    )
  );
};