import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';
import Tab from 'material-ui/Tabs/Tab';
import cx from 'classnames';
import without from 'lodash/without';

import { setEndpoint, setUseCurrent } from '../action/EndpointActions';
import FakeSearchBar from './FakeSearchBar';
import FakeSearchWithButtonContainer from './FakeSearchWithButtonContainer';
import SearchInputContainer from './SearchInputContainer';
import SearchModal from './SearchModal';
import SearchModalLarge from './SearchModalLarge';
import Icon from './Icon';
import { getAllEndpointLayers, withCurrentTime } from '../util/searchUtils';

var SearchMainContainer = function (_React$Component) {
  _inherits(SearchMainContainer, _React$Component);

  function SearchMainContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, SearchMainContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onTabChange = function (tab) {
      return _this.changeToTab(tab.props.value);
    }, _this.onSuggestionSelected = function (name, item) {
      if (item.properties.link) {
        var newLocation = _extends({}, _this.context.location, {
          state: _extends({}, _this.context.location.state, {
            searchModalIsOpen: false
          }),
          pathname: item.properties.link
        });
        return _this.context.router.replace(newLocation);
      }

      var locationWithTime = withCurrentTime(_this.context.getStore, _this.context.location);

      if (item.type === 'CurrentLocation') {
        _this.context.executeAction(setUseCurrent, {
          target: _this.props.selectedTab,
          router: _this.context.router,
          location: locationWithTime
        });
      } else {
        _this.context.executeAction(setEndpoint, {
          target: _this.props.selectedTab,
          router: _this.context.router,
          location: locationWithTime,
          endpoint: {
            lat: item.geometry.coordinates[1],
            lon: item.geometry.coordinates[0],
            address: name
          }
        });
      }

      return _this.closeModal();
    }, _this.searchInputs = [], _this.clickSearch = function () {
      var origin = _this.context.getStore('EndpointStore').getOrigin();
      var geolocation = _this.context.getStore('PositionStore').getLocationState();
      var hasOrigin = origin.lat || origin.useCurrentPosition && geolocation.hasLocation;

      _this.openDialog(hasOrigin ? 'destination' : 'origin');
    }, _this.openDialog = function (tab) {
      _this.context.router.push(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          searchModalIsOpen: true,
          selectedTab: tab
        })
      }));
    }, _this.focusInput = function (tab) {
      return _this.searchInputs[tab] && _this.searchInputs[tab].focus();
    }, _this.closeModal = function () {
      return _this.context.router.goBack();
    }, _this.renderEndpointTab = function (tabname, tablabel, placeholder, type, layers) {
      return React.createElement(
        Tab,
        {
          className: 'search-header__button' + (_this.props.selectedTab === tabname ? '--selected' : ''),
          label: tablabel,
          value: tabname,
          id: tabname,
          onActive: _this.onTabChange
        },
        _this.props.selectedTab === tabname && React.createElement(SearchInputContainer, {
          ref: function ref(c) {
            _this.searchInputs[tabname] = c;
          },
          id: 'search-' + tabname,
          placeholder: placeholder,
          type: type,
          layers: layers,
          close: _this.closeModal,
          onSuggestionSelected: _this.onSuggestionSelected
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SearchMainContainer.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.searchModalIsOpen) {
      this.focusInput(this.props.selectedTab);
    }
  };

  SearchMainContainer.prototype.changeToTab = function changeToTab(tabname) {
    this.context.router.replace(_extends({}, this.context.location, {
      state: _extends({}, this.context.location.state, {
        selectedTab: tabname
      })
    }));
    this.focusInput(tabname);
  };

  SearchMainContainer.prototype.render = function render() {
    var destinationPlaceholder = this.context.intl.formatMessage({
      id: 'destination-placeholder',
      defaultMessage: 'Enter destination, route or stop'
    });

    var fakeSearchBar = React.createElement(FakeSearchBar, {
      placeholder: destinationPlaceholder,
      id: 'front-page-search-bar'
    });

    var Component = this.context.breakpoint === 'large' ? SearchModalLarge : SearchModal;

    var origin = this.context.getStore('EndpointStore').getOrigin();
    var searchLayers = getAllEndpointLayers();
    if (origin.useCurrentPosition) {
      // currpos-currpos routing not allowed
      searchLayers = without(searchLayers, 'CurrentPosition');
    }

    return React.createElement(
      'div',
      {
        className: cx('fake-search-container', 'bp-' + this.context.breakpoint, this.props.className)
      },
      React.createElement(FakeSearchWithButtonContainer, { fakeSearchBar: fakeSearchBar, onClick: this.clickSearch }),
      React.createElement(
        Component,
        {
          selectedTab: this.props.selectedTab,
          modalIsOpen: this.props.searchModalIsOpen,
          closeModal: this.closeModal
        },
        this.renderEndpointTab('origin', React.createElement(
          'div',
          null,
          React.createElement(FormattedMessage, { id: 'origin', defaultMessage: 'Origin' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            { className: 'search-current-origin-tip' },
            !origin.useCurrentPosition ? origin.address : [React.createElement(Icon, { img: 'icon-icon_position', key: 'icon' }), React.createElement(FormattedMessage, {
              key: 'text',
              id: 'own-position',
              defaultMessage: 'Your current location'
            })]
          )
        ), this.context.intl.formatMessage({
          id: 'origin',
          defaultMessage: 'Origin'
        }), 'endpoint', searchLayers),
        this.renderEndpointTab('destination', React.createElement(
          'div',
          null,
          React.createElement(FormattedMessage, { id: 'search', defaultMessage: 'Search' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            { className: 'search-current-origin-tip' },
            React.createElement(FormattedMessage, {
              id: 'place-route-or-keyword',
              defaultMessage: 'Destination, route or stop'
            })
          )
        ), this.context.intl.formatMessage({
          id: 'place-route-or-keyword',
          defaultMessage: 'Destination, route or stop'
        }), 'all', searchLayers)
      )
    );
  };

  return SearchMainContainer;
}(React.Component);

SearchMainContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  intl: intlShape.isRequired,
  breakpoint: PropTypes.string.isRequired
};
SearchMainContainer.propTypes = {
  className: PropTypes.string,
  searchModalIsOpen: PropTypes.bool.isRequired,
  selectedTab: PropTypes.string.isRequired
};


export default SearchMainContainer;