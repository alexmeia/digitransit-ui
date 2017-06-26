import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormattedMessage } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';

import { getRoutePath } from '../util/path';

var MobileItineraryWrapper = function (_React$Component) {
  _inherits(MobileItineraryWrapper, _React$Component);

  function MobileItineraryWrapper() {
    var _temp, _this, _ret;

    _classCallCheck(this, MobileItineraryWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      lat: undefined,
      lon: undefined
    }, _this.itineraryTabs = [], _this.toggleFullscreenMap = function () {
      if (_this.props.fullscreenMap) {
        _this.context.router.goBack();
      } else {
        _this.context.router.push(_extends({}, _this.context.location, {
          pathname: _this.context.location.pathname + '/kartta'
        }));
      }
    }, _this.focusMap = function (lat, lon) {
      return _this.props.focus(lat, lon);
    }, _this.switchSlide = function (index) {
      _this.context.router.replace(_extends({}, _this.context.location, {
        pathname: getRoutePath(_this.props.params.from, _this.props.params.to) + '/' + index
      }));
      var itineraryTab = _this.itineraryTabs[index];

      if (itineraryTab) {
        var coords = itineraryTab.refs.component.getState();
        _this.focusMap(coords.lat, coords.lon);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MobileItineraryWrapper.getTabs = function getTabs(itineraries, selectedIndex) {
    return itineraries.map(function (itinerary, i) {
      return React.createElement(Tab, {
        selected: i === selectedIndex,
        key: i // eslint-disable-line react/no-array-index-key
        , label: '\u2022',
        value: i,
        className: i === selectedIndex ? 'itinerary-tab-root--selected' : 'itinerary-tab-root',
        style: {
          height: 'auto',
          color: i === selectedIndex ? '#007ac9' : '#ddd',
          fontSize: '34px',
          padding: '0px'
        }
      });
    });
  };

  MobileItineraryWrapper.prototype.render = function render() {
    var _this2 = this;

    var index = parseInt(this.props.params.hash, 10) || 0;

    if (!this.props.children) {
      return React.createElement(
        'div',
        { className: 'itinerary-no-route-found' },
        React.createElement(FormattedMessage, {
          id: 'no-route-msg',
          defaultMessage: '\n              Unfortunately no route was found between the locations you gave.\n              Please change origin and/or destination address.\n            '
        })
      );
    }

    var swipe = this.props.fullscreenMap ? undefined : React.createElement(
      SwipeableViews,
      {
        index: index,
        key: 'swipe',
        className: 'itinerary-swipe-views-root',
        slideStyle: { minHeight: '100%' },
        containerStyle: { minHeight: '100%' },
        onChangeIndex: function onChangeIndex(idx) {
          return setTimeout(_this2.switchSlide, 500, idx);
        }
      },
      React.Children.map(this.props.children, function (el, i) {
        return React.cloneElement(el, {
          focus: _this2.focusMap,
          ref: function ref(innerElement) {
            _this2.itineraryTabs[i] = innerElement;
          }
        });
      })
    );
    var tabs = this.props.fullscreenMap ? undefined : React.createElement(
      'div',
      { className: 'itinerary-tabs-container', key: 'tabs' },
      React.createElement(
        Tabs,
        {
          onChange: this.switchSlide,
          value: index,
          tabItemContainerStyle: {
            backgroundColor: '#eef1f3',
            lineHeight: '18px',
            width: '60px',
            marginLeft: 'auto',
            marginRight: 'auto'
          },
          inkBarStyle: { display: 'none' }
        },
        MobileItineraryWrapper.getTabs(this.props.children, index)
      )
    );

    return React.createElement(
      ReactCSSTransitionGroup,
      {
        transitionName: 'itinerary-container-content',
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300,
        component: 'div',
        className: 'itinerary-container-content',
        onTouchStart: function onTouchStart(e) {
          return e.stopPropagation();
        },
        onMouseDown: function onMouseDown(e) {
          return e.stopPropagation();
        }
      },
      swipe,
      tabs
    );
  };

  return MobileItineraryWrapper;
}(React.Component);

MobileItineraryWrapper.propTypes = {
  fullscreenMap: PropTypes.bool,
  focus: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  params: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired
};
MobileItineraryWrapper.contextTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
export default MobileItineraryWrapper;