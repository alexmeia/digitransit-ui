import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';

var StopPageTabContainer = function (_React$Component) {
  _inherits(StopPageTabContainer, _React$Component);

  function StopPageTabContainer(props) {
    _classCallCheck(this, StopPageTabContainer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.selectedTab = function (val) {
      _this.props.selectedTab(val);
    };

    _this.state = {
      active: 'right-now' // show departures as the default
    };
    return _this;
  }

  StopPageTabContainer.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'stop-tab-container' },
      React.createElement(
        'button',
        {
          className: 'stop-tab-singletab ' + (this.state.active === 'right-now' ? 'active' : 'inactive'),
          onClick: function onClick() {
            _this2.setState({ active: 'right-now' });_this2.selectedTab('right-now');
          }
        },
        React.createElement(
          'div',
          { className: 'stop-tab-singletab-container' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'svg',
              { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 1024 1024' },
              React.createElement('path', { d: 'M368.356 1024.014c-44.781 0-81.079-36.302-81.079-81.079 0-361.528 294.123-655.658 655.651-655.658 44.781 0 81.079 36.302 81.079 81.079s-36.298 81.079-81.079 81.079c-272.112 0-493.497 221.385-493.497 493.5 0.004 44.773-36.295 81.079-81.075 81.079z' }),
              React.createElement('path', { d: 'M81.072 1024.014c-44.781 0-81.079-36.302-81.079-81.079 0-519.948 423.002-942.946 942.939-942.946 44.781 0 81.079 36.302 81.079 81.079s-36.298 81.079-81.079 81.079c-430.524 0-780.781 350.257-780.781 780.788 0 44.773-36.298 81.079-81.079 81.079z' })
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(FormattedMessage, {
              id: 'right-now',
              defaultMessage: 'right now'
            })
          )
        )
      ),
      React.createElement(
        'button',
        {
          className: 'stop-tab-singletab ' + (this.state.active === 'timetable' ? 'active' : 'inactive'),
          onClick: function onClick() {
            _this2.setState({ active: 'timetable' });_this2.selectedTab('timetable');
          }
        },
        React.createElement(
          'div',
          { className: 'stop-tab-singletab-container' },
          React.createElement(
            'div',
            null,
            React.createElement(Icon, { img: 'icon-icon_schedule', className: 'stop-page-tab_icon' })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(FormattedMessage, {
              id: 'timetable',
              defaultMessage: 'timetable'
            })
          )
        )
      )
    );
  };

  return StopPageTabContainer;
}(React.Component);

StopPageTabContainer.propTypes = {
  selectedTab: PropTypes.func.isRequired
};


export default StopPageTabContainer;