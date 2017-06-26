import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { intlShape } from 'react-intl';
import some from 'lodash/some';
import get from 'lodash/get';

import meta from '../meta';
import AppBarContainer from './AppBarContainer';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import HSLAdformTrackingPixel from './HSLAdformTrackingPixel';

var TopLevel = function (_React$Component) {
  _inherits(TopLevel, _React$Component);

  function TopLevel(props, context) {
    _classCallCheck(this, TopLevel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.getBreakpoint = function () {
      return !_this.props.width && 'none' || _this.props.width < 400 && 'small' || _this.props.width < 900 && 'medium' || 'large';
    };

    var host = context.headers && (context.headers['x-forwarded-host'] || context.headers.host);
    var url = context.url;

    var hasTrackingPixel = get(context, 'config.showAdformTrackingPixel', false);
    _this.trackingPixel = host && host.indexOf('127.0.0.1') === -1 && host.indexOf('localhost') === -1 && hasTrackingPixel ? React.createElement(HSLAdformTrackingPixel, null) : undefined;

    _this.metadata = meta(_this.context.intl.locale, host, url, _this.context.config);
    return _this;
  }

  TopLevel.prototype.getChildContext = function getChildContext() {
    return {
      location: this.props.location,
      breakpoint: this.getBreakpoint()
    };
  };

  TopLevel.prototype.render = function render() {
    this.topBarOptions = Object.assign.apply(Object, [{}].concat(this.props.routes.map(function (route) {
      return route.topBarOptions;
    })));
    this.disableMapOnMobile = some(this.props.routes, function (route) {
      return route.disableMapOnMobile;
    });

    var content = void 0;

    if (this.props.children || !(this.props.map || this.props.header)) {
      content = this.props.children || this.props.content;
    } else if (this.props.width < 900) {
      content = React.createElement(MobileView, {
        map: this.disableMapOnMobile || this.props.map,
        content: this.props.content,
        header: this.props.header
      });
    } else if (this.props.width >= 900) {
      content = React.createElement(DesktopView, {
        title: this.props.title,
        map: this.props.map,
        content: this.props.content,
        header: this.props.header
      });
    }

    var menuHeight = this.getBreakpoint() === 'large' && '60px' || '40px';

    return React.createElement(
      'div',
      { className: 'fullscreen' },
      !this.topBarOptions.hidden && React.createElement(AppBarContainer, _extends({ title: this.props.title }, this.topBarOptions)),
      React.createElement(Helmet, this.metadata),
      React.createElement(
        'section',
        { className: 'content', style: { height: 'calc(100% - ' + menuHeight + ')' } },
        this.props.meta,
        content
      ),
      this.trackingPixel
    );
  };

  return TopLevel;
}(React.Component);

TopLevel.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  header: PropTypes.node,
  map: PropTypes.node,
  content: PropTypes.node,
  title: PropTypes.node,
  meta: PropTypes.node,
  routes: PropTypes.arrayOf(PropTypes.shape({
    topBarOptions: PropTypes.object,
    disableMapOnMobile: PropTypes.bool
  }).isRequired).isRequired
};
TopLevel.contextTypes = {
  getStore: PropTypes.func.isRequired,
  intl: intlShape,
  url: PropTypes.string.isRequired,
  headers: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
TopLevel.childContextTypes = {
  location: PropTypes.object,
  breakpoint: PropTypes.string.isRequired
};


export default TopLevel;