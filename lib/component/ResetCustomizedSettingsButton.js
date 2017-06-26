import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

var ResetCustomizedSettingsButton = function (_React$Component) {
  _inherits(ResetCustomizedSettingsButton, _React$Component);

  function ResetCustomizedSettingsButton() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResetCustomizedSettingsButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.resetSettings = function () {
      _this.props.onReset();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResetCustomizedSettingsButton.prototype.render = function render() {
    return React.createElement(
      'section',
      { className: 'offcanvas-section' },
      React.createElement(
        'button',
        { className: 'reset-settings', onClick: this.resetSettings },
        React.createElement(
          'div',
          { className: 'reset-settings-button' },
          React.createElement(FormattedMessage, {
            defaultMessage: 'Palauta oletusasetukset',
            id: 'settings-reset'
          })
        )
      )
    );
  };

  return ResetCustomizedSettingsButton;
}(React.Component);

ResetCustomizedSettingsButton.propTypes = {
  onReset: PropTypes.func.isRequired
};


export default ResetCustomizedSettingsButton;