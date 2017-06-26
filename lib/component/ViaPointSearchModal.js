import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from 'material-ui/Tabs/Tab';
import { intlShape } from 'react-intl';
import cx from 'classnames';

import { getAllEndpointLayers } from '../util/searchUtils';
import { locationToOTP } from '../util/otpStrings';
import SearchInputContainer from './SearchInputContainer';
import SearchModal from './SearchModal';
import SearchModalLarge from './SearchModalLarge';

var ViaPointSearchModal = function (_React$Component) {
  _inherits(ViaPointSearchModal, _React$Component);

  function ViaPointSearchModal() {
    var _temp, _this, _ret;

    _classCallCheck(this, ViaPointSearchModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onSuggestionSelected = function (name, item) {
      _this.context.router.replace(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          viaPointSearchModalOpen: false
        }),
        query: _extends({}, _this.context.location.query, {
          intermediatePlaces: locationToOTP({
            lat: item.geometry.coordinates[1],
            lon: item.geometry.coordinates[0],
            address: name
          })
        })
      }));
      setTimeout(_this.context.router.go, 0, _this.context.location.state.viaPointSearchModalOpen * -1);
    }, _this.modalIsOpen = function () {
      return _this.context.location.state ? Boolean(_this.context.location.state.viaPointSearchModalOpen) : false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ViaPointSearchModal.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.modalIsOpen() && this.searchInputContainer) {
      this.searchInputContainer.focus();
    }
  };

  ViaPointSearchModal.prototype.render = function render() {
    var _this2 = this;

    if (!this.modalIsOpen()) {
      return false;
    }

    var label = this.context.intl.formatMessage({
      id: 'via-point',
      defaultMessage: 'Via point'
    });

    label = label.charAt(0).toUpperCase() + label.slice(1);
    var searchTabLabel = void 0;
    var Component = void 0;
    var responsiveClass = '';
    var placeholder = void 0;

    if (this.context.breakpoint === 'large') {
      Component = SearchModalLarge;
      responsiveClass = 'bp-large';
      searchTabLabel = '';
      placeholder = label;
    } else {
      Component = SearchModal;
      searchTabLabel = label;
    }

    return React.createElement(
      'div',
      { className: cx('onetab-search-modal-container', 'via-point-modal', responsiveClass) },
      React.createElement(
        'div',
        { className: cx('fake-search-container', responsiveClass) },
        React.createElement(
          Component,
          {
            selectedTab: 'tab',
            modalIsOpen: true,
            closeModal: this.context.router.goBack
          },
          React.createElement(
            Tab,
            { className: 'search-header__button--selected', label: searchTabLabel, value: 'tab' },
            React.createElement(SearchInputContainer, {
              ref: function ref(c) {
                _this2.searchInputContainer = c;
              },
              placeholder: placeholder,
              type: 'endpoint',
              layers: getAllEndpointLayers(),
              onSuggestionSelected: this.onSuggestionSelected,
              close: this.context.router.goBack
            })
          )
        )
      )
    );
  };

  return ViaPointSearchModal;
}(React.Component);

ViaPointSearchModal.contextTypes = {
  intl: intlShape.isRequired,
  router: PropTypes.object,
  location: PropTypes.object,
  breakpoint: PropTypes.string.isRequired
};


export default ViaPointSearchModal;