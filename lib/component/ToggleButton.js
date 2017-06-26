import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

var ToggleButton = function ToggleButton(_ref) {
  var checkedClass = _ref.checkedClass,
      state = _ref.state,
      icon = _ref.icon,
      className = _ref.className,
      onBtnClick = _ref.onBtnClick,
      style = _ref.style,
      children = _ref.children;

  var iconTag = void 0;

  var classes = {
    btn: true
  };

  if (state) {
    classes[checkedClass] = state;
  }

  if (icon) {
    iconTag = React.createElement(
      'div',
      { className: 'icon-holder' },
      React.createElement(Icon, { img: 'icon-icon_' + icon, className: '' })
    );
  }

  return React.createElement(
    'div',
    {
      className: cx('cursor-pointer', classes, className),
      onClick: onBtnClick,
      style: style
    },
    iconTag,
    React.createElement(
      'div',
      null,
      children
    )
  );
};

ToggleButton.propTypes = {
  onBtnClick: PropTypes.func,
  checkedClass: PropTypes.string,
  state: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.array
};

export default ToggleButton;