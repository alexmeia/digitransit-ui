import PropTypes from 'prop-types';
import React from 'react';
import IconMarker from './IconMarker';

export default function LocationMarker(_ref) {
  var position = _ref.position,
      className = _ref.className,
      noText = _ref.noText;

  return React.createElement(IconMarker, {
    position: position,
    className: className,
    icon: noText ? 'icon-icon_place' : 'icon-icon_mapMarker-point'
  });
}

LocationMarker.propTypes = {
  position: IconMarker.position,
  className: PropTypes.string,
  noText: PropTypes.bool
};