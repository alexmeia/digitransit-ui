import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { routerShape, locationShape, Link } from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import range from 'lodash/range';

import Icon from './Icon';
import FavouriteLocationContainer from './FavouriteLocationContainer';
import FavouriteLocation from './FavouriteLocation';
import EmptyFavouriteLocationSlot from './EmptyFavouriteLocationSlot';
import ComponentUsageExample from './ComponentUsageExample';
import { setEndpoint } from '../action/EndpointActions';
import NoFavouriteLocations from './NoFavouriteLocations';
import { isMobile } from '../util/browser';

var FavouriteLocationContainerRoute = function (_Relay$Route) {
  _inherits(FavouriteLocationContainerRoute, _Relay$Route);

  function FavouriteLocationContainerRoute() {
    _classCallCheck(this, FavouriteLocationContainerRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return FavouriteLocationContainerRoute;
}(Relay.Route);

FavouriteLocationContainerRoute.queries = {
  plan: function plan(Component, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'FavouriteLocationsContainer',
        type: 'QueryType'
      };
    }(Component.getFragment('plan', {
      from: variables.from,
      to: variables.to,
      maxWalkDistance: variables.maxWalkDistance,
      wheelchair: variables.wheelchair,
      preferred: variables.preferred,
      arriveBy: variables.arriveBy,
      disableRemainingWeightHeuristic: variables.disableRemainingWeightHeuristic
    }));
  }
};
FavouriteLocationContainerRoute.paramDefinitions = {
  from: { required: true },
  to: { required: true }
};
FavouriteLocationContainerRoute.routeName = 'FavouriteLocationsContainerRoute';


var SwipeableViewsKB = bindKeyboard(SwipeableViews);

var FavouriteLocationsContainer = function (_React$Component) {
  _inherits(FavouriteLocationsContainer, _React$Component);

  function FavouriteLocationsContainer() {
    _classCallCheck(this, FavouriteLocationsContainer);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this));

    _this2.onChangeIndex = function (index) {
      if (index > _this2.props.favourites.length - 2) {
        _this2.setState({ slideIndex: index }, function () {
          var newSlideIndex = Math.max(0, _this2.props.favourites.length - 2);
          _this2.setState({ slideIndex: newSlideIndex });
        });
      } else {
        _this2.setState({ slideIndex: index });
      }
    };

    _this2.onPrev = function () {
      var newSlideIndex = Math.max(0, _this2.state.slideIndex - FavouriteLocationsContainer.SLOTS_PER_CLICK);
      _this2.setState({ slideIndex: newSlideIndex });
    };

    _this2.onNext = function () {
      var newSlideIndex = Math.min(_this2.state.slideIndex + FavouriteLocationsContainer.SLOTS_PER_CLICK, _this2.props.favourites.length - 2);
      _this2.setState({ slideIndex: newSlideIndex });
    };

    _this2.setDestination = function (locationName, lat, lon) {
      var location = {
        lat: lat,
        lon: lon,
        address: locationName
      };

      _this2.context.executeAction(setEndpoint, {
        target: 'destination',
        endpoint: location,
        router: _this2.context.router,
        location: _this2.context.location
      });
    };

    _this2.slideRenderer = function (_ref) {
      var key = _ref.key,
          index = _ref.index;

      // 'add-new' slot at the end
      if (index === _this2.props.favourites.length) {
        return React.createElement(EmptyFavouriteLocationSlot, { key: key, index: index });
      }

      var favourite = _this2.props.favourites[index];

      var favouriteLocation = React.createElement(FavouriteLocation, {
        key: key,
        favourite: favourite, clickFavourite: _this2.setDestination
      });

      if (_this2.props.location) {
        var config = _this2.context.config;

        return React.createElement(Relay.RootContainer, {
          Component: FavouriteLocationContainer, forceFetch: true,
          route: new FavouriteLocationContainerRoute({
            from: {
              lat: _this2.props.location.lat,
              lon: _this2.props.location.lon
            },

            to: {
              lat: favourite.lat,
              lon: favourite.lon
            },

            maxWalkDistance: config.maxWalkDistance + 0.1,
            wheelchair: false,

            preferred: {
              agencies: config.preferredAgency || ''
            },

            arriveBy: false,
            disableRemainingWeightHeuristic: false
          }), renderLoading: function renderLoading() {
            return favouriteLocation;
          }, renderFetched: function renderFetched(data) {
            return React.createElement(FavouriteLocationContainer, _extends({
              favourite: favourite,
              onClickFavourite: _this2.setDestination,
              currentTime: _this2.props.currentTime.unix()
            }, data));
          }
        });
      }
      return favouriteLocation;
    };

    _this2.state = { slideIndex: 0 };
    return _this2;
  }

  FavouriteLocationsContainer.prototype.render = function render() {
    var _this3 = this;

    if (this.props.favourites.length === 0) {
      return React.createElement(NoFavouriteLocations, null);
    }
    var styles = {
      root: {
        padding: '0px 0.1em',
        overflowX: 'visible',
        width: '100%',
        marginLeft: '10%'
      },
      slideContainer: {
        padding: '0px',
        margin: '0px',
        width: '100%'
      }
    };

    var displayLeft = this.state.slideIndex > 0;
    var displayRight = this.state.slideIndex < this.props.favourites.length - FavouriteLocationsContainer.SLOTS_PER_CLICK + 1;

    var fadeClass = displayLeft && displayRight && 'double-overflow-fade' || displayLeft && 'overflow-fade-left' || displayRight && 'overflow-fade' || '';

    displayLeft = !isMobile && displayLeft;
    displayRight = !isMobile && displayRight;

    return React.createElement(
      'div',
      { style: { position: 'relative' } },
      React.createElement(
        'div',
        { className: 'favourite-locations-container ' + fadeClass + ' border-bottom' },
        React.createElement(
          'div',
          { key: 'fav-locations-' + this.props.favourites.length, style: { padding: '1em 0px', width: '32%' } },
          React.createElement(
            SwipeableViewsKB,
            {
              style: styles.root, slideStyle: styles.slideContainer,
              index: this.state.slideIndex,
              onChangeIndex: this.onChangeIndex
            },
            range(this.props.favourites.length + 1).map(function (v) {
              return _this3.slideRenderer({ key: v, index: v });
            })
          )
        )
      ),
      displayLeft && React.createElement(
        Link,
        { className: 'fav-location-nav-button-container-left', onClick: this.onPrev },
        React.createElement(
          'span',
          { className: 'fav-location-nav-button' },
          React.createElement(Icon, { img: 'icon-icon_arrow-collapse--left' })
        )
      ),
      displayRight && React.createElement(
        Link,
        { className: 'fav-location-nav-button-container-right', onClick: this.onNext },
        React.createElement(
          'span',
          { className: 'fav-location-nav-button' },
          React.createElement(Icon, { img: 'icon-icon_arrow-collapse--right' })
        )
      )
    );
  };

  return FavouriteLocationsContainer;
}(React.Component);

FavouriteLocationsContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  config: PropTypes.object.isRequired
};
FavouriteLocationsContainer.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a container with favourite locations'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(FavouriteLocationsContainer, null)
  )
);
FavouriteLocationsContainer.propTypes = {
  favourites: PropTypes.array.isRequired,
  currentTime: PropTypes.object.isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  })
};
FavouriteLocationsContainer.SLOTS_PER_CLICK = 3;


export default connectToStores(FavouriteLocationsContainer, ['TimeStore', 'FavouriteLocationStore', 'EndpointStore'], function (context) {
  var position = context.getStore('PositionStore').getLocationState();
  var origin = context.getStore('EndpointStore').getOrigin();

  return {
    currentTime: context.getStore('TimeStore').getCurrentTime(),
    favourites: context.getStore('FavouriteLocationStore').getLocations(),

    location: function () {
      if (origin.useCurrentPosition) {
        if (position.hasLocation) {
          return position;
        }
        return null;
      }
      return origin;
    }()
  };
});