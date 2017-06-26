import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Tab from 'material-ui/Tabs/Tab';
import { intlShape } from 'react-intl';
import cx from 'classnames';

import SearchInputContainer from './SearchInputContainer';
import { setEndpoint, setUseCurrent } from '../action/EndpointActions';
import SearchModal from './SearchModal';
import SearchModalLarge from './SearchModalLarge';

var OneTabSearchModal = function (_React$Component) {
  _inherits(OneTabSearchModal, _React$Component);

  function OneTabSearchModal() {
    var _temp, _this, _ret;

    _classCallCheck(this, OneTabSearchModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onSuggestionSelected = function (name, item) {
      var newLocation = _extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          oneTabSearchModalOpen: false
        })
      });

      if (item.type === 'CurrentLocation') {
        _this.context.executeAction(setUseCurrent, {
          target: _this.props.target,
          router: _this.context.router,
          location: newLocation
        });
      } else {
        _this.context.executeAction(setEndpoint, {
          target: _this.props.target,
          endpoint: {
            lat: item.geometry.coordinates[1],
            lon: item.geometry.coordinates[0],
            address: name
          },
          router: _this.context.router,
          location: newLocation
        });
      }
      _this.context.router.goBack();
    }, _this.modalIsOpen = function () {
      return _this.context.location.state ? Boolean(_this.context.location.state.oneTabSearchModalOpen) : false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  OneTabSearchModal.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.modalIsOpen() && this.searchInputContainer) {
      this.searchInputContainer.focus();
    }
  };

  OneTabSearchModal.prototype.render = function render() {
    var _this2 = this;

    if (!this.modalIsOpen()) {
      return false;
    }

    var label = this.props.customTabLabel ? this.props.customTabLabel : this.context.intl.formatMessage({
      id: this.props.target || 'Origin',
      defaultMessage: this.props.target || 'Origin'
    });

    label = label.charAt(0).toUpperCase() + label.slice(1);
    var searchTabLabel = void 0;
    var Component = void 0;
    var responsiveClass = '';
    var placeholder = void 0;

    if (this.context.breakpoint === 'large' && this.props.responsive) {
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
      { className: cx('onetab-search-modal-container', responsiveClass) },
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
              layers: this.props.layers,
              onSuggestionSelected: this.props.customOnSuggestionSelected || this.onSuggestionSelected,
              close: this.context.router.goBack
            })
          )
        )
      )
    );
  };

  return OneTabSearchModal;
}(React.Component);

OneTabSearchModal.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  router: PropTypes.object,
  location: PropTypes.object,
  breakpoint: PropTypes.string.isRequired
};
OneTabSearchModal.propTypes = {
  customOnSuggestionSelected: PropTypes.func,
  customTabLabel: PropTypes.string,
  target: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  layers: PropTypes.array,
  responsive: PropTypes.bool // a switch to force use of fullscreen modal
};


export default OneTabSearchModal;