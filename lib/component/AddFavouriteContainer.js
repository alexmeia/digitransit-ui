import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { Link, routerShape, locationShape } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import without from 'lodash/without';
import Icon from './Icon';
import FavouriteIconTable from './FavouriteIconTable';
import { addFavouriteLocation, deleteFavouriteLocation } from '../action/FavouriteActions';
import FakeSearchBar from './FakeSearchBar';
import OneTabSearchModal from './OneTabSearchModal';
import { getAllEndpointLayers } from '../util/searchUtils';

var AddFavouriteContainer = function (_React$Component) {
  _inherits(AddFavouriteContainer, _React$Component);

  function AddFavouriteContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, AddFavouriteContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillMount = function () {
      if (_this.isEdit()) {
        _this.setState({ favourite: _this.props.favourite });
      } else {
        _this.setState({
          favourite: {
            selectedIconId: undefined,
            lat: undefined,
            lon: undefined,
            locationName: undefined,
            address: undefined,
            version: 1
          }
        });
      }
    }, _this.setCoordinatesAndAddress = function (name, location) {
      var address = name;
      if (location.type === 'CurrentLocation') {
        var position = _this.context.getStore('PositionStore').getLocationState();
        if (position.address.length > 0) {
          address = position.address;
        }
      }
      _this.setState({ favourite: _extends({}, _this.state.favourite, {
          lat: location.geometry.coordinates[1],
          lon: location.geometry.coordinates[0],
          address: address
        }) });
    }, _this.isEdit = function () {
      return _this.props.favourite !== undefined && _this.props.favourite.id !== undefined;
    }, _this.canSave = function () {
      return !isEmpty(_this.state.favourite.selectedIconId) && isNumber(_this.state.favourite.lat) && isNumber(_this.state.favourite.lon) && !isEmpty(_this.state.favourite.locationName);
    }, _this.save = function () {
      if (_this.canSave()) {
        _this.context.executeAction(addFavouriteLocation, _this.state.favourite);
        _this.quit();
      }
    }, _this.delete = function () {
      _this.context.executeAction(deleteFavouriteLocation, _this.state.favourite);
      _this.quit();
    }, _this.quit = function () {
      _this.context.router.replace('/suosikit');
    }, _this.specifyName = function (event) {
      _this.setState({ favourite: _extends({}, _this.state.favourite, { locationName: event.target.value }) });
    }, _this.selectIcon = function (id) {
      _this.setState({ favourite: _extends({}, _this.state.favourite, { selectedIconId: id }) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AddFavouriteContainer.prototype.render = function render() {
    var _this2 = this;

    var destinationPlaceholder = this.context.intl.formatMessage({
      id: 'address',
      defaultMessage: 'Address'
    });

    var searchTabLabel = this.context.intl.formatMessage({
      id: 'favourite-target',
      defaultMessage: 'Favourite location'
    });

    var favourite = this.state.favourite;
    var favouriteLayers = without(getAllEndpointLayers(), 'FavouritePlace');

    return React.createElement(
      'div',
      { className: 'fullscreen' },
      React.createElement(
        'div',
        { className: 'add-favourite-container' },
        React.createElement(
          Link,
          { to: '/suosikit', className: 'right cursor-pointer' },
          React.createElement(Icon, { id: 'add-favourite-close-icon', img: 'icon-icon_close' })
        ),
        React.createElement(
          'row',
          null,
          React.createElement(
            'div',
            { className: 'add-favourite-container__content small-12 small-centered columns' },
            React.createElement(
              'header',
              { className: 'add-favourite-container__header row' },
              React.createElement(
                'div',
                { className: 'cursor-pointer add-favourite-star small-1 columns' },
                React.createElement(Icon, { className: cx('add-favourite-star__icon', 'selected'), img: 'icon-icon_star' })
              ),
              React.createElement(
                'div',
                { className: 'add-favourite-container__header-text small-11 columns' },
                React.createElement(
                  'h3',
                  null,
                  !this.isEdit() && React.createElement(FormattedMessage, {
                    id: 'add-location-to-favourites',
                    defaultMessage: 'Add an important location to your Favorites'
                  }) || React.createElement(FormattedMessage, {
                    id: 'edit-favourites',
                    defaultMessage: 'Edit the location in the Favorites'
                  })
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'add-favourite-container__search search-form' },
              React.createElement(
                'h4',
                null,
                React.createElement(FormattedMessage, { id: 'specify-location', defaultMessage: 'Specify location' })
              ),
              React.createElement(FakeSearchBar, {
                endpointAddress: (this.state != null ? favourite.address : undefined) || '',
                placeholder: destinationPlaceholder,
                onClick: function onClick(e) {
                  e.preventDefault();
                  _this2.context.router.push(_extends({}, _this2.context.location, {
                    state: _extends({}, _this2.context.location.state, {
                      oneTabSearchModalOpen: true
                    })
                  }));
                }, id: 'destination', className: 'add-favourite-container__input-placeholder'
              })
            ),
            React.createElement(
              'div',
              { className: 'add-favourite-container__give-name' },
              React.createElement(
                'h4',
                null,
                React.createElement(FormattedMessage, { id: 'give-name-to-location', defaultMessage: 'Give the location a descriptive name' })
              ),
              React.createElement(
                'div',
                { className: 'add-favourite-container__input-placeholder' },
                React.createElement('input', {
                  className: 'add-favourite-container__input',
                  value: favourite.locationName,
                  placeholder: this.context.intl.formatMessage({
                    id: 'location-examples',
                    defaultMessage: 'e.g. Home, Work, School,...'
                  }), onChange: this.specifyName
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'add-favourite-container__pick-icon' },
              React.createElement(
                'h4',
                null,
                React.createElement(FormattedMessage, { id: 'pick-icon', defaultMessage: 'Select icon' })
              ),
              React.createElement(FavouriteIconTable, {
                selectedIconId: function () {
                  if (favourite.selectedIconId !== 'undefined' || null) {
                    return favourite.selectedIconId;
                  }
                  return undefined;
                }(),
                favouriteIconIds: AddFavouriteContainer.FavouriteIconIds,
                handleClick: this.selectIcon
              })
            ),
            React.createElement(
              'div',
              { className: 'add-favourite-container__save' },
              React.createElement(
                'div',
                {
                  className: 'add-favourite-container-button ' + (this.canSave() ? '' : 'disabled'),
                  onClick: this.save
                },
                React.createElement(FormattedMessage, { id: 'save', defaultMessage: 'Save' })
              )
            ),
            this.isEdit() && [React.createElement(
              'div',
              { key: 'delete', className: 'add-favourite-container__save' },
              React.createElement(
                'div',
                {
                  className: 'add-favourite-container-button delete', onClick: this.delete
                },
                React.createElement(FormattedMessage, { id: 'delete', defaultMessage: 'Delete' })
              )
            ), React.createElement(
              'div',
              { key: 'cancel', className: 'add-favourite-container__save' },
              React.createElement(
                'div',
                {
                  className: 'add-favourite-container-button cancel', onClick: this.quit
                },
                React.createElement(FormattedMessage, { id: 'cancel', defaultMessage: 'Cancel' })
              )
            )]
          )
        )
      ),
      React.createElement(OneTabSearchModal, {
        customTabLabel: searchTabLabel,
        layers: favouriteLayers,
        customOnSuggestionSelected: function customOnSuggestionSelected(name, item) {
          _this2.setCoordinatesAndAddress(name, item);
          return _this2.context.router.goBack();
        }
      })
    );
  };

  return AddFavouriteContainer;
}(React.Component);

AddFavouriteContainer.FavouriteIconIds = ['icon-icon_place', 'icon-icon_home', 'icon-icon_work', 'icon-icon_sport', 'icon-icon_school', 'icon-icon_shopping'];
AddFavouriteContainer.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  getStore: PropTypes.func.isRequired
};
AddFavouriteContainer.propTypes = {
  favourite: PropTypes.object // if specified edit mode is activated
};


var AddFavouriteContainerWithFavourite = connectToStores(AddFavouriteContainer, ['FavouriteLocationStore'], function (context, props) {
  return { favourite: props.params.id !== undefined ? context.getStore('FavouriteLocationStore').getById(parseInt(props.params.id, 10)) : {}
  };
});

export default AddFavouriteContainerWithFavourite;