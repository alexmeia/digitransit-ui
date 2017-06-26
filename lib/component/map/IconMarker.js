import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

import { isBrowser } from '../../util/browser';

var L = void 0;
var Marker = void 0;

/* eslint-disable global-require */
if (isBrowser) {
  L = require('leaflet');
  Marker = require('react-leaflet/lib/Marker').default;
}
/* eslint-enaable global-require */

export default function IconMarker(_ref) {
  var position = _ref.position,
      className = _ref.className,
      icon = _ref.icon;

  return React.createElement(Marker, {
    zIndexOffset: 10,
    position: position,
    keyboard: false,
    icon: L.divIcon({
      html: Icon.asString(icon),
      className: className,
      iconAnchor: [12, 24]
    })
  });
}

IconMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired,
  className: PropTypes.string,
  icon: PropTypes.string
};