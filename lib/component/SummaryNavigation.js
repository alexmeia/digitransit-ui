import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';

import OriginDestinationBar from './OriginDestinationBar';
import TimeSelectorContainer from './TimeSelectorContainer';
import RightOffcanvasToggle from './RightOffcanvasToggle';
import ViaPointBarContainer from './ViaPointBarContainer';
import LazilyLoad, { importLazy } from './LazilyLoad';
import { otpToLocation } from '../util/otpStrings';

var SummaryNavigation = function (_React$Component) {
  _inherits(SummaryNavigation, _React$Component);

  function SummaryNavigation() {
    var _temp, _this, _ret;

    _classCallCheck(this, SummaryNavigation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onRequestChange = function (newState) {
      _this.internalSetOffcanvas(newState);
    }, _this.getOffcanvasState = function () {
      return _this.context.location.state && _this.context.location.state.customizeSearchOffcanvas || false;
    }, _this.internalSetOffcanvas = function (newState) {
      if (_this.context.piwik != null) {
        _this.context.piwik.trackEvent('Offcanvas', 'Customize Search', newState ? 'close' : 'open');
      }

      if (newState) {
        _this.context.router.push(_extends({}, _this.context.location, {
          state: _extends({}, _this.context.location.state, {
            customizeSearchOffcanvas: newState
          })
        }));
      } else {
        _this.context.router.goBack();
      }
    }, _this.toggleCustomizeSearchOffcanvas = function () {
      _this.internalSetOffcanvas(!_this.getOffcanvasState());
    }, _this.customizeSearchModules = {
      Drawer: function Drawer() {
        return importLazy(System.import('material-ui/Drawer'));
      },
      CustomizeSearch: function CustomizeSearch() {
        return importLazy(System.import('./CustomizeSearch'));
      }
    }, _this.renderTimeSelectorContainer = function (_ref) {
      var done = _ref.done,
          props = _ref.props;
      return done ? React.createElement(TimeSelectorContainer, _extends({}, props, {
        startTime: _this.props.startTime,
        endTime: _this.props.endTime
      })) : undefined;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SummaryNavigation.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.unlisten = this.context.router.listen(function (location) {
      if (_this2.context.location.state && _this2.context.location.state.customizeSearchOffcanvas && (!location.state || !location.state.customizeSearchOffcanvas) && !_this2.transitionDone && location.pathname.startsWith('/reitti/')) {
        _this2.transitionDone = true;
        var newLocation = _extends({}, _this2.context.location, {
          state: _extends({}, _this2.context.location.state, {
            customizeSearchOffcanvas: false,
            viaPointSearchModalOpen: false
          })
        });
        setTimeout(function () {
          return _this2.context.router.replace(newLocation);
        }, 0);
      } else {
        _this2.transitionDone = false;
      }
    });
  };

  SummaryNavigation.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  SummaryNavigation.prototype.render = function render() {
    var _this3 = this;

    var className = cx({ 'bp-large': this.context.breakpoint === 'large' });
    var drawerWidth = 291;
    if (typeof window !== 'undefined') {
      drawerWidth = 0.5 * window.innerWidth > 291 ? Math.min(600, 0.5 * window.innerWidth) : 291;
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        LazilyLoad,
        { modules: this.customizeSearchModules },
        function (_ref2) {
          var Drawer = _ref2.Drawer,
              CustomizeSearch = _ref2.CustomizeSearch;
          return React.createElement(
            Drawer,
            {
              className: 'offcanvas',
              disableSwipeToOpen: true,
              openSecondary: true,
              docked: false,
              open: _this3.getOffcanvasState(),
              onRequestChange: _this3.onRequestChange
              // Needed for the closing arrow button that's left of the drawer.
              , containerStyle: { background: 'transparent', boxShadow: 'none' },
              width: drawerWidth
            },
            React.createElement(CustomizeSearch, {
              isOpen: _this3.getOffcanvasState(),
              params: _this3.props.params,
              onToggleClick: _this3.toggleCustomizeSearchOffcanvas
            })
          );
        }
      ),
      React.createElement(OriginDestinationBar, {
        className: className,
        origin: otpToLocation(this.props.params.from),
        destination: otpToLocation(this.props.params.to)
      }),
      React.createElement(ViaPointBarContainer, { className: className }),
      React.createElement(
        'div',
        { className: cx('time-selector-settings-row', className) },
        React.createElement(Relay.Renderer, {
          Container: TimeSelectorContainer,
          queryConfig: {
            params: {},
            name: 'ServiceTimeRangRoute',
            queries: { serviceTimeRange: function serviceTimeRange() {
                return function () {
                  return {
                    fieldName: 'serviceTimeRange',
                    kind: 'Query',
                    metadata: {},
                    name: 'SummaryNavigation',
                    type: 'serviceTimeRange'
                  };
                }();
              } }
          },
          environment: Relay.Store,
          render: this.renderTimeSelectorContainer
        }),
        React.createElement(RightOffcanvasToggle, {
          onToggleClick: this.toggleCustomizeSearchOffcanvas,
          hasChanges: !this.props.hasDefaultPreferences
        })
      )
    );
  };

  return SummaryNavigation;
}(React.Component);

SummaryNavigation.propTypes = {
  params: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }).isRequired,
  hasDefaultPreferences: PropTypes.bool.isRequired,
  startTime: PropTypes.number,
  endTime: PropTypes.number
};
SummaryNavigation.defaultProps = {
  startTime: null,
  endTime: null
};
SummaryNavigation.contextTypes = {
  piwik: PropTypes.object,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakpoint: PropTypes.string
};


export default SummaryNavigation;