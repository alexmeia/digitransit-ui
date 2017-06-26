import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import MarkerPopupBottom from '../MarkerPopupBottom';
import ParkAndRideAvailability from './ParkAndRideAvailability';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import ComponentUsageExample from '../../ComponentUsageExample';

var ParkAndRidePopup = function (_React$Component) {
  _inherits(ParkAndRidePopup, _React$Component);

  function ParkAndRidePopup() {
    _classCallCheck(this, ParkAndRidePopup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ParkAndRidePopup.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'card' },
      React.createElement(
        Card,
        { className: 'padding-small' },
        React.createElement(CardHeader, {
          name: this.context.intl.formatMessage({
            id: 'park-and-ride',
            defaultMessage: 'Park and Ride'
          }),
          description: this.props.name,
          icon: 'icon-icon_car',
          unlinked: true
        }),
        React.createElement(ParkAndRideAvailability, {
          realtime: this.props.realtime,
          maxCapacity: this.props.maxCapacity,
          spacesAvailable: this.props.spacesAvailable
        })
      ),
      React.createElement(MarkerPopupBottom, {
        location: {
          address: this.props.name,
          lat: this.props.lat,
          lon: this.props.lon
        }
      })
    );
  };

  return ParkAndRidePopup;
}(React.Component);

ParkAndRidePopup.contextTypes = {
  getStore: PropTypes.func.isRequired,
  intl: intlShape
};
ParkAndRidePopup.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a citybike popup.'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(
      ParkAndRidePopup,
      { context: 'context object here' },
      'Im content of a citybike card'
    )
  )
);
ParkAndRidePopup.propTypes = {
  realtime: PropTypes.bool.isRequired,
  maxCapacity: PropTypes.number.isRequired,
  spacesAvailable: PropTypes.number.isRequired,
  context: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
};
export default ParkAndRidePopup;