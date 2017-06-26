import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { locationShape } from 'react-router';
import Splash from './Splash';

import { getIntroShown, setIntroShown } from '../store/localStorage';
import { isBrowser } from '../util/browser';

var SplashOrComponent = function (_React$Component) {
  _inherits(SplashOrComponent, _React$Component);

  function SplashOrComponent(props, _ref) {
    var config = _ref.config;

    _classCallCheck(this, SplashOrComponent);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.setIntroShown = function () {
      _this.setState({ shouldShowIntro: false }, setIntroShown);
    };

    _this.state = { shouldShowIntro: config.shouldShowIntro && getIntroShown() !== true &&
      // Do not show intro in mock mode
      !(isBrowser && window.mock)
    };
    return _this;
  }

  SplashOrComponent.prototype.render = function render() {
    var location = this.context.location;
    var searchOpen = location && location.state && location.state.oneTabSearchModalOpen;

    if (!this.props.displaySplash && !searchOpen && !this.state.shouldShowIntro) {
      return this.props.children;
    }
    return React.createElement(Splash, { setIntroShown: this.setIntroShown, shouldShowIntro: this.state.shouldShowIntro });
  };

  return SplashOrComponent;
}(React.Component);

SplashOrComponent.propTypes = {
  displaySplash: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
SplashOrComponent.contextTypes = {
  config: PropTypes.object.isRequired,
  location: locationShape.isRequired
};


export default connectToStores(SplashOrComponent, ['PositionStore', 'EndpointStore'], function (context) {
  var origin = context.getStore('EndpointStore').getOrigin();

  return {
    displaySplash: origin.useCurrentPosition && !context.getStore('PositionStore').getLocationState().hasLocation || !origin.useCurrentPosition && (!origin.lat || !origin.lon) // selected location
  };
});