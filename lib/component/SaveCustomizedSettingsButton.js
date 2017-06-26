import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import { FormattedMessage } from 'react-intl';
import { locationShape } from 'react-router';
import { setCustomizedSettings } from '../store/localStorage';

var SaveCustomizedSettingsButton = function (_React$Component) {
  _inherits(SaveCustomizedSettingsButton, _React$Component);

  function SaveCustomizedSettingsButton(props) {
    _classCallCheck(this, SaveCustomizedSettingsButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.setSettingsData = function () {
      // Test if has new set values
      var settings = {
        accessibilityOption: !(typeof _this.context.location.query.accessibilityOption === 'undefined') ? _this.context.location.query.accessibilityOption : undefined,
        minTransferTime: _this.context.location.query.minTransferTime ? _this.context.location.query.minTransferTime : undefined,
        modes: decodeURI(_this.context.location.query.modes) !== 'undefined' && decodeURI(_this.context.location.query.modes) !== 'TRAM,RAIL,SUBWAY,FERRY,WALK,BUS' ? decodeURI(_this.context.location.query.modes).split(',') : undefined,
        walkBoardCost: _this.context.location.query.walkBoardCost ? _this.context.location.query.walkBoardCost : undefined,
        walkReluctance: _this.context.location.query.walkReluctance ? _this.context.location.query.walkReluctance : undefined,
        walkSpeed: _this.context.location.query.walkSpeed ? _this.context.location.query.walkSpeed : undefined
      };

      setCustomizedSettings(settings);
      _this.setState({
        open: true
      });
    };

    _this.getSnackbarDimensions = function () {
      // Since the settings container gets its dimensions dynamically the Snackbar modal
      // has to be calculated by javascript watching the settings container's width
      var containerStyles = void 0;
      var containerWidth = document.getElementsByClassName('customize-search')[0] ? document.getElementsByClassName('customize-search')[0].parentElement.offsetWidth * 0.7428 : null;
      if (window.innerWidth <= 320) {
        containerStyles = {
          maxWidth: 'auto',
          width: window.innerWidth + 'px'
        };
      } else if (window.innerWidth <= 768) {
        containerStyles = {
          maxWidth: 'auto',
          left: '55%',
          width: containerWidth + 'px'
        };
      } else {
        containerStyles = {
          maxWidth: 'auto',
          left: '52%',
          width: containerWidth + 'px'
        };
      }
      return containerStyles;
    };

    _this.handleRequestClose = function () {
      _this.setState({
        open: false
      });
    };

    _this.state = {
      autoHideDuration: 940,
      message: 'settings-saved',
      open: false
    };
    return _this;
  }

  SaveCustomizedSettingsButton.prototype.render = function render() {
    var containerStyles = this.getSnackbarDimensions();
    return React.createElement(
      'div',
      null,
      React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(
          'div',
          { className: 'save-settings' },
          React.createElement('hr', null),
          React.createElement(
            'button',
            { className: 'save-settings-button', onClick: this.setSettingsData },
            React.createElement(FormattedMessage, { defaultMessage: 'Tallenna asetukset', id: 'settings-savebutton' })
          )
        )
      ),
      React.createElement(Snackbar, {
        open: this.state.open,
        message: React.createElement(FormattedMessage, { tagName: 'span', defaultMessage: 'Tallenna asetukset', id: 'settings-saved' }),
        autoHideDuration: this.state.autoHideDuration,
        onRequestClose: this.handleRequestClose,
        style: containerStyles,
        bodyStyle: {
          backgroundColor: '#585a5b',
          color: '#fff',
          textAlign: 'center',
          width: containerStyles.width,
          fontSize: '0.8rem',
          fontFamily: '"Gotham Rounded SSm A", "Gotham Rounded SSm B", Arial, Georgia, Serif'
        }
      })
    );
  };

  return SaveCustomizedSettingsButton;
}(React.Component);

SaveCustomizedSettingsButton.contextTypes = {
  location: locationShape.isRequired
};


export default SaveCustomizedSettingsButton;