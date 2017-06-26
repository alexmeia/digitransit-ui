import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { intlShape } from 'react-intl';

import Icon from './Icon';
import { openFeedbackModal } from '../action/feedbackActions';
import LazilyLoad, { importLazy } from './LazilyLoad';

var MainMenuContainer = function (_Component) {
  _inherits(MainMenuContainer, _Component);

  function MainMenuContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, MainMenuContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onRequestChange = function (newState) {
      return _this.internalSetOffcanvas(newState);
    }, _this.getOffcanvasState = function () {
      if (_this.context.location.state != null && _this.context.location.state.offcanvasVisible != null) {
        return _this.context.location.state.offcanvasVisible;
      }
      // If the state is missing or doesn't have offcanvasVisible, it's not set
      return false;
    }, _this.toggleOffcanvas = function () {
      return _this.internalSetOffcanvas(!_this.getOffcanvasState());
    }, _this.internalSetOffcanvas = function (newState) {
      if (_this.context.piwik != null) {
        _this.context.piwik.trackEvent('Offcanvas', 'Index', newState ? 'open' : 'close');
      }

      if (newState) {
        _this.context.router.push(_extends({}, _this.context.location, {
          state: _extends({}, _this.context.location.state, {
            offcanvasVisible: newState
          })
        }));
      } else {
        _this.context.router.goBack();
      }
    }, _this.openFeedback = function () {
      _this.context.executeAction(openFeedbackModal);
      _this.toggleOffcanvas();
    }, _this.mainMenuModules = {
      Drawer: function Drawer() {
        return importLazy(System.import('material-ui/Drawer'));
      },
      MainMenu: function MainMenu() {
        return importLazy(System.import('./MainMenu'));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MainMenuContainer.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      React.createElement(
        LazilyLoad,
        { modules: this.mainMenuModules },
        function (_ref) {
          var Drawer = _ref.Drawer,
              MainMenu = _ref.MainMenu;
          return React.createElement(
            Drawer,
            {
              className: 'offcanvas',
              disableSwipeToOpen: true,
              docked: false,
              open: _this2.getOffcanvasState(),
              openSecondary: true,
              onRequestChange: _this2.onRequestChange
            },
            React.createElement(MainMenu, {
              openFeedback: _this2.openFeedback,
              toggleVisibility: _this2.toggleOffcanvas,
              showDisruptionInfo: _this2.getOffcanvasState(),
              visible: _this2.getOffcanvasState()
            })
          );
        }
      ),
      this.context.config.mainMenu.show ? React.createElement(
        'div',
        { className: 'icon-holder cursor-pointer main-menu-toggle' },
        React.createElement(
          'button',
          {
            'aria-label': this.context.intl.formatMessage({
              id: 'main-menu-label-open',
              defaultMessage: 'Open the main menu'
            }),
            onClick: this.toggleOffcanvas,
            className: 'noborder cursor-pointer'
          },
          React.createElement(Icon, { img: 'icon-icon_menu', className: 'icon' })
        )
      ) : null
    );
  };

  return MainMenuContainer;
}(Component);

MainMenuContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  piwik: PropTypes.object,
  router: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};


export default MainMenuContainer;