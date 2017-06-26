import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';

import { isBrowser } from '../../../util/browser';

var Popup = isBrowser ? require('react-leaflet/lib/Popup').default : null; // eslint-disable-line global-require

var SelectedStopPopup = function (_React$Component) {
  _inherits(SelectedStopPopup, _React$Component);

  function SelectedStopPopup() {
    _classCallCheck(this, SelectedStopPopup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SelectedStopPopup.prototype.render = function render() {
    return React.createElement(
      Popup,
      {
        position: { lat: this.props.lat, lng: this.props.lon },
        offset: [50, 25],
        closeButton: false,
        maxWidth: this.context.config.map.genericMarker.popup.maxWidth,
        autoPan: false,
        className: 'origin-popup'
      },
      this.props.children
    );
  };

  return SelectedStopPopup;
}(React.Component);

SelectedStopPopup.propTypes = {
  shouldOpen: PropTypes.bool,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};
SelectedStopPopup.contextTypes = {
  config: PropTypes.object.isRequired
};
SelectedStopPopup.defaultProps = {
  shouldOpen: true
};
SelectedStopPopup.displayName = 'SelectedStopLabel';


export default SelectedStopPopup;