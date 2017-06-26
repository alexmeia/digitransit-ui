import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import Icon from '../Icon';
import { isBrowser } from '../../util/browser';

var Popup = isBrowser ? require('react-leaflet/lib/Popup').default : null; // eslint-disable-line global-require

var OriginPopup = function (_React$Component) {
  _inherits(OriginPopup, _React$Component);

  function OriginPopup() {
    var _temp, _this, _ret;

    _classCallCheck(this, OriginPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.display = function () {
      return _this.context.popupContainer.openPopup();
    }, _this.openDialog = function () {
      return _this.context.router.push(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          searchModalIsOpen: true,
          selectedTab: 'origin'
        })
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  OriginPopup.prototype.componentDidMount = function componentDidMount() {
    return this.props.shouldOpen && setTimeout(this.display);
  };

  OriginPopup.prototype.render = function render() {
    return React.createElement(
      Popup,
      {
        context: this.context,
        offset: [50, this.props.yOffset],
        closeButton: false,
        maxWidth: this.context.config.map.genericMarker.popup.maxWidth,
        autoPan: false,
        className: 'origin-popup'
      },
      React.createElement(
        'div',
        { onClick: this.openDialog },
        React.createElement(
          'div',
          { className: 'origin-popup-header' },
          this.props.header,
          React.createElement(Icon, { className: 'icon-edit', img: 'icon-icon_edit' })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'origin-popup-name' },
            this.props.text
          ),
          React.createElement('div', { className: 'shade-to-white' })
        )
      )
    );
  };

  return OriginPopup;
}(React.Component);

OriginPopup.contextTypes = {
  intl: intlShape.isRequired,
  popupContainer: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
OriginPopup.propTypes = {
  shouldOpen: PropTypes.bool,
  yOffset: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired
};


export default OriginPopup;