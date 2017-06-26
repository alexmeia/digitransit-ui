import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.stopClickPropagation = function (e) {
      if (_this.props.allowClicks !== true) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Modal.prototype.render = function render() {
    var isActive = {
      'is-active': this.props.open
    };

    var modalClasses = {
      modal: true,
      'small-11': true,
      column: true
    };

    var overlayStyle = {
      zIndex: 1400
    };

    return React.createElement(
      'div',
      {
        className: cx('modal-overlay', 'cursor-pointer', isActive),
        style: overlayStyle,
        onClick: this.props.toggleVisibility
      },
      React.createElement(
        'div',
        {
          'data-closable': true,
          className: cx(modalClasses, isActive),
          onClick: this.stopClickPropagation
        },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'h2',
            { className: 'left' },
            this.props.title
          ),
          React.createElement(
            'div',
            { className: 'small-1 columns right text-right modal-top-nav' },
            React.createElement(
              'a',
              { onClick: this.props.toggleVisibility, className: 'close-button cursor-pointer' },
              React.createElement(Icon, { img: 'icon-icon_close' })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'modal-wrapper' },
          React.createElement(
            'div',
            { className: 'modal-content momentum-scroll' },
            this.props.children
          )
        )
      )
    );
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  allowClicks: PropTypes.bool,
  children: PropTypes.node,
  open: PropTypes.bool,
  title: PropTypes.node,
  toggleVisibility: PropTypes.func.isRequired
};


export default Modal;