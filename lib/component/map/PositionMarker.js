import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import pure from 'recompose/pure';
import { intlShape } from 'react-intl';

import OriginPopup from './OriginPopup';
import Icon from '../Icon';
import { isBrowser } from '../../util/browser';

var Marker = void 0;
var L = void 0;

/* eslint-disable global-require */
if (isBrowser) {
  Marker = require('react-leaflet/lib/Marker').default;
  L = require('leaflet');
}
/* eslint-enable global-require */

var currentLocationIcon = isBrowser ? L.divIcon({
  html: Icon.asString('icon-icon_mapMarker-location-animated'),
  className: 'current-location-marker',
  iconSize: [40, 40]
}) : null;

function PositionMarker(_ref, _ref2) {
  var coordinates = _ref.coordinates,
      useCurrentPosition = _ref.useCurrentPosition,
      displayOriginPopup = _ref.displayOriginPopup;
  var intl = _ref2.intl;

  var popup = void 0;

  if (!coordinates) {
    return null;
  }

  if (displayOriginPopup) {
    popup = React.createElement(OriginPopup, {
      shouldOpen: useCurrentPosition,
      header: intl.formatMessage({ id: 'origin', defaultMessage: 'From' }),
      text: intl.formatMessage({ id: 'own-position', defaultMessage: 'Your current location' }),
      yOffset: 20
    });
  }

  return React.createElement(
    Marker,
    {
      keyboard: false,
      zIndexOffset: 5,
      position: coordinates,
      icon: currentLocationIcon
    },
    popup
  );
}

PositionMarker.contextTypes = {
  intl: intlShape.isRequired
};

PositionMarker.propTypes = {
  coordinates: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.oneOf([false])]),
  displayOriginPopup: PropTypes.bool,
  useCurrentPosition: PropTypes.bool.isRequired
};

export default connectToStores(pure(PositionMarker), ['PositionStore', 'EndpointStore'], function (context) {
  var coordinates = context.getStore('PositionStore').getLocationState();

  return {
    useCurrentPosition: context.getStore('EndpointStore').getOrigin().useCurrentPosition,
    coordinates: coordinates.hasLocation ? [coordinates.lat, coordinates.lon] : false
  };
});