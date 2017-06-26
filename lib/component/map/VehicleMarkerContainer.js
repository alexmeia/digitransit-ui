import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import provideContext from 'fluxible-addons-react/provideContext';
import { intlShape } from 'react-intl';

import { startRealTimeClient, stopRealTimeClient } from '../../action/realTimeClientAction';
import RouteMarkerPopup from './route/RouteMarkerPopup';
import FuzzyTripRoute from '../../route/FuzzyTripRoute';
import { asString as iconAsString } from '../IconWithTail';
import Loading from '../Loading';

import { isBrowser } from '../../util/browser';

var MODES_WITH_ICONS = ['bus', 'tram', 'rail', 'subway', 'ferry'];

var Popup = void 0;
var Marker = void 0;
var L = void 0;

function getVehicleIcon(mode, heading) {
  var useSmallIcon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!isBrowser) {
    return null;
  }

  if (MODES_WITH_ICONS.indexOf(mode) !== -1) {
    return L.divIcon({
      html: iconAsString({ img: 'icon-icon_' + mode + '-live', rotate: heading }),
      className: 'vehicle-icon ' + mode + ' ' + (useSmallIcon ? 'small-map-icon' : ''),
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  return L.divIcon({
    html: iconAsString({ img: 'icon-icon_bus-live', rotate: heading }),
    className: 'vehicle-icon bus ' + (useSmallIcon ? 'small-map-icon' : ''),
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
}

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/lib/Popup').default;
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
  /* eslint-enable global-require */
}

var RouteMarkerPopupWithContext = provideContext(RouteMarkerPopup, {
  // Note: We're not sure this is necessary, since context is  getting passed via props
  // router: PropTypes.object.isRequired,
  // config: React.PropTypes.object.isRequired,
});

var VehicleMarkerContainer = function (_React$PureComponent) {
  _inherits(VehicleMarkerContainer, _React$PureComponent);

  function VehicleMarkerContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, VehicleMarkerContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.onChange = function (id) {
      var message = _this.context.getStore('RealTimeInformationStore').getVehicle(id);
      if (_this.shouldVehicleUpdate(message)) {
        _this.updateVehicle(id, message);
        _this.forceUpdate();
      }
    }, _this.vehicles = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  VehicleMarkerContainer.prototype.componentWillMount = function componentWillMount() {
    this.context.getStore('RealTimeInformationStore').addChangeListener(this.onChange);

    if (this.props.startRealTimeClient) {
      this.context.executeAction(startRealTimeClient);
    }
  };

  VehicleMarkerContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    // Reset vehicles when recieving new props
    this.vehicles = {};
    this.updateVehicles(newProps);
  };

  VehicleMarkerContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.startRealTimeClient && this.context.getStore('RealTimeInformationStore').client) {
      this.context.executeAction(stopRealTimeClient(this.context.getStore('RealTimeInformationStore').client));
    }
    this.context.getStore('RealTimeInformationStore').removeChangeListener(this.onChange);
  };

  VehicleMarkerContainer.prototype.updateVehicles = function updateVehicles(newProps) {
    var _this2 = this;

    var vehicles = this.context.getStore('RealTimeInformationStore').vehicles;

    Object.keys(vehicles).forEach(function (id) {
      // if tripStartTime has been specified,
      // use only the updates for vehicles with matching startTime
      var message = vehicles[id];
      if (_this2.shouldVehicleUpdate(message, newProps)) {
        _this2.updateVehicle(id, message);
      }
    });
  };

  // if tripStartTime has been specified,
  // use only the updates for vehicles with matching startTime


  VehicleMarkerContainer.prototype.shouldVehicleUpdate = function shouldVehicleUpdate(message) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

    return (props.direction === undefined || message.direction === props.direction) && (props.tripStart === undefined || message.tripStartTime === props.tripStart);
  };

  VehicleMarkerContainer.prototype.updateVehicle = function updateVehicle(id, message) {
    var _this3 = this;

    var popup = React.createElement(Relay.RootContainer, {
      Component: RouteMarkerPopup,
      route: new FuzzyTripRoute({
        route: message.route,
        direction: message.direction,
        date: message.operatingDay,
        time: message.tripStartTime.substring(0, 2) * 60 * 60 + message.tripStartTime.substring(2, 4) * 60
      }),
      renderLoading: function renderLoading() {
        return React.createElement(
          'div',
          { className: 'card', style: { height: '12rem' } },
          React.createElement(Loading, null)
        );
      },
      renderFetched: function renderFetched(data) {
        return React.createElement(RouteMarkerPopupWithContext, _extends({}, data, { message: message, context: _this3.context }));
      }
    });

    this.vehicles[id] = React.createElement(
      Marker,
      {
        key: id,
        position: {
          lat: message.lat,
          lng: message.long
        },
        icon: getVehicleIcon(message.mode, message.heading, this.props.useSmallIcons)
      },
      React.createElement(
        Popup,
        {
          offset: [106, 16],
          closeButton: false,
          maxWidth: 250,
          minWidth: 250,
          className: 'popup'
        },
        popup
      )
    );
  };

  VehicleMarkerContainer.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      'div',
      null,
      Object.keys(this.vehicles).map(function (key) {
        return _this4.vehicles[key];
      })
    );
  };

  return VehicleMarkerContainer;
}(React.PureComponent);

VehicleMarkerContainer.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};
VehicleMarkerContainer.propTypes = {
  startRealTimeClient: PropTypes.bool,
  tripStart: PropTypes.string,
  direction: PropTypes.number,
  useSmallIcons: PropTypes.bool
};
export default VehicleMarkerContainer;