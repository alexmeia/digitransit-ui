import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Relay, { Route } from 'react-relay';
import NearbyRouteListContainer from './NearbyRouteListContainer';
import NetworkError from './NetworkError';
import Loading from './Loading';

var NearbyRouteListContainerRoute = function (_Route) {
  _inherits(NearbyRouteListContainerRoute, _Route);

  function NearbyRouteListContainerRoute() {
    _classCallCheck(this, NearbyRouteListContainerRoute);

    return _possibleConstructorReturn(this, _Route.apply(this, arguments));
  }

  return NearbyRouteListContainerRoute;
}(Route);

NearbyRouteListContainerRoute.queries = {
  nearest: function nearest(RelayComponent, variables) {
    return function (RQL_0) {
      return {
        children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'NearestRoutesContainer',
        type: 'QueryType'
      };
    }(RelayComponent.getFragment('nearest', variables));
  }
};
NearbyRouteListContainerRoute.paramDefinitions = {
  lat: { required: true },
  lon: { required: true },
  currentTime: { required: true },
  modes: { required: true },
  placeTypes: { required: true },
  maxDistance: { required: true },
  maxResults: { required: true },
  timeRange: { required: true }
};
NearbyRouteListContainerRoute.routeName = 'NearbyRouteListContainerRoute';

var NearestRoutesContainer = function (_Component) {
  _inherits(NearestRoutesContainer, _Component);

  function NearestRoutesContainer() {
    _classCallCheck(this, NearestRoutesContainer);

    // useSpinner is used to only render the spinner on initial render.
    // After the initial render it is changed to false and data will be updated silently.
    var _this2 = _possibleConstructorReturn(this, _Component.call(this));

    _this2.useSpinner = true;
    return _this2;
  }

  NearestRoutesContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.lat !== this.props.lat || nextProps.lon !== this.props.lon || nextProps.currentTime !== this.props.currentTime || nextProps.modes !== this.props.modes || nextProps.placeTypes !== this.props.placeTypes || nextProps.maxDistance !== this.props.maxDistance || nextProps.maxResults !== this.props.maxResults || nextProps.timeRange !== this.props.timeRange;
  };

  NearestRoutesContainer.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(Relay.Renderer, {
      Container: NearbyRouteListContainer,
      queryConfig: new NearbyRouteListContainerRoute({
        lat: this.props.lat,
        lon: this.props.lon,
        currentTime: this.props.currentTime,
        modes: this.props.modes,
        placeTypes: this.props.placeTypes,
        maxDistance: this.props.maxDistance,
        maxResults: this.props.maxResults,
        timeRange: this.props.timeRange
      }),
      environment: Relay.Store,

      render: function render(_ref) {
        var error = _ref.error,
            props = _ref.props,
            retry = _ref.retry;

        if (error) {
          _this3.useSpinner = true;
          return React.createElement(NetworkError, { retry: retry });
        } else if (props) {
          _this3.useSpinner = false;
          return React.createElement(NearbyRouteListContainer, props);
        }
        if (_this3.useSpinner === true) {
          return React.createElement(Loading, null);
        }
        return undefined;
      }
    });
  };

  return NearestRoutesContainer;
}(Component);

NearestRoutesContainer.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  modes: PropTypes.array.isRequired,
  placeTypes: PropTypes.array.isRequired,
  maxDistance: PropTypes.number.isRequired,
  maxResults: PropTypes.number.isRequired,
  timeRange: PropTypes.number.isRequired
};
export default NearestRoutesContainer;