import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from 'material-ui/Tabs';
import { intlShape } from 'react-intl';

import Icon from './Icon';
import MessageBarMessage from './MessageBarMessage';

/* Small version has constant height,
 * big version has max height of half but can be
 * less if the message is shorter.
 */

var MessageBar = function (_Component) {
  _inherits(MessageBar, _Component);

  function MessageBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, MessageBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      slideIndex: 0,
      maximized: false,
      visible: true
    }, _this.getTabContent = function () {
      return _this.unreadMessages().map(function (el) {
        return React.createElement(MessageBarMessage, {
          key: el.id,
          onMaximize: _this.maximize,
          content: el.content[_this.props.lang]
        });
      });
    }, _this.getTabs = function () {
      return _this.unreadMessages().map(function (el, i) {
        return React.createElement(Tab, {
          key: el.id,
          selected: i === _this.state.slideIndex,
          icon:
          // TODO: This is a hack to get around the hard-coded height in material-ui Tab component
          React.createElement(
            'span',
            null,
            React.createElement(
              'span',
              {
                style: {
                  color: i === _this.state.slideIndex ? '#007ac9' : '#ddd',
                  fontSize: '18px',
                  height: '18px',
                  position: 'absolute',
                  top: 0
                },
                title: _this.context.intl.formatMessage({
                  id: 'messagebar-label-page',
                  defaultMessage: 'Page'
                }) + ' ' + (i + 1)
              },
              '\u2022'
            )
          ),
          value: i,
          style: {
            height: '18px',
            color: i === _this.state.slideIndex ? '#007ac9' : '#ddd',
            fontSize: '18px',
            padding: '0px'
          }
        });
      });
    }, _this.maximize = function () {
      _this.setState(_extends({}, _this.state, {
        maximized: true
      }));
    }, _this.unreadMessages = function () {
      return _this.props.messages.filter(function (el) {
        if (el.read === true) {
          return false;
        }
        if (el.content[_this.props.lang] != null) {
          return true;
        }
        /* eslint-disable no-console */
        console.error('Message ' + el.id + ' doesn\'t have translation for ' + _this.props.lang);
        /* eslint-enable no-console */
        return false;
      });
    }, _this.markRead = function (value) {
      _this.context.getStore('MessageStore').markMessageAsRead(_this.unreadMessages()[value].id);
    }, _this.handleChange = function (value) {
      _this.markRead(value);
      _this.setState(_extends({}, _this.state, {
        slideIndex: value
      }));
    }, _this.handleClose = function () {
      _this.markRead(_this.state.slideIndex);
      _this.setState(_extends({}, _this.state, {
        visible: false
      }));
    }, _this.render = function () {
      if (_this.state.visible && _this.unreadMessages().length > 0) {
        return React.createElement(
          'section',
          { role: 'banner', className: 'message-bar flex-horizontal' },
          React.createElement(Icon, { img: 'icon-icon_info', className: 'info' }),
          React.createElement(
            'div',
            { className: 'flex-grow' },
            React.createElement(
              SwipeableViews,
              {
                index: _this.state.slideIndex,
                onChangeIndex: _this.handleChange,
                className: !_this.state.maximized ? 'message-bar-fade' : '',
                containerStyle: {
                  maxHeight: _this.state.maximized ? '400px' : '60px',
                  transition: 'max-height 300ms'
                },
                slideStyle: {
                  maxHeight: _this.state.maximized ? '400px' : '60px',
                  transition: 'max-height 300ms',
                  padding: '10px',
                  overflow: 'hidden',
                  background: '#fff'
                }
              },
              _this.getTabContent()
            ),
            React.createElement(
              Tabs,
              {
                onChange: _this.handleChange,
                value: _this.state.slideIndex,
                tabItemContainerStyle: {
                  backgroundColor: '#fff',
                  height: '18px',
                  width: '60px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                },
                inkBarStyle: { display: 'none' }
              },
              _this.getTabs()
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              {
                id: 'close-message-bar', title: _this.context.intl.formatMessage({
                  id: 'messagebar-label-close-message-bar',
                  defaultMessage: 'Close banner'
                }),
                onClick: _this.handleClose, className: 'noborder close-button cursor-pointer'
              },
              React.createElement(Icon, { img: 'icon-icon_close', className: 'close' })
            )
          )
        );
      }
      return null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* Find the id of nth unread (we don't show read messages) and mark it as read */


  return MessageBar;
}(Component);

MessageBar.contextTypes = {
  getStore: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};
MessageBar.propTypes = {
  lang: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
};


export default connectToStores(MessageBar, ['MessageStore', 'PreferencesStore'], function (context) {
  return { lang: context.getStore('PreferencesStore').getLanguage(),
    messages: Array.from(context.getStore('MessageStore').messages.values()) };
});