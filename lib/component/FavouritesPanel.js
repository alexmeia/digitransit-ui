import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import FavouriteRouteListContainer from './FavouriteRouteListContainer';
import FavouriteLocationsContainer from './FavouriteLocationsContainer';
import NextDeparturesListHeader from './NextDeparturesListHeader';
import NoFavouritesPanel from './NoFavouritesPanel';
import Loading from './Loading';

var FavouriteRouteListContainerRoute = function (_Relay$Route) {
  _inherits(FavouriteRouteListContainerRoute, _Relay$Route);

  function FavouriteRouteListContainerRoute() {
    _classCallCheck(this, FavouriteRouteListContainerRoute);

    return _possibleConstructorReturn(this, _Relay$Route.apply(this, arguments));
  }

  return FavouriteRouteListContainerRoute;
}(Relay.Route);

FavouriteRouteListContainerRoute.queries = {
  routes: function routes(Component, variables) {
    return function (RQL_0) {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: '[String]'
          },
          name: 'ids',
          value: {
            kind: 'CallVariable',
            callVariableName: 'ids'
          }
        }],
        children: [].concat.apply([], [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }, Relay.QL.__frag(RQL_0)]),
        fieldName: 'routes',
        kind: 'Query',
        metadata: {
          isPlural: true,
          identifyingArgName: 'ids',
          identifyingArgType: '[String]'
        },
        name: 'FavouritesPanel',
        type: 'Route'
      };
    }(Component.getFragment('routes', {
      ids: variables.ids
    }));
  }
};
FavouriteRouteListContainerRoute.paramDefinitions = {
  ids: { required: true }
};
FavouriteRouteListContainerRoute.routeName = 'FavouriteRouteRowRoute';


var FavouriteRoutes = function FavouriteRoutes(_ref) {
  var routes = _ref.routes;

  if (routes.length > 0) {
    return React.createElement(Relay.RootContainer, {
      Component: FavouriteRouteListContainer,
      forceFetch: true, route: new FavouriteRouteListContainerRoute({
        ids: routes
      }), renderLoading: Loading
    });
  }
  return React.createElement(NoFavouritesPanel, null);
};

FavouriteRoutes.propTypes = {
  routes: PropTypes.array.isRequired
};

var FavouritesPanel = function FavouritesPanel(_ref2) {
  var routes = _ref2.routes;
  return React.createElement(
    'div',
    { className: 'frontpage-panel' },
    React.createElement(FavouriteLocationsContainer, null),
    React.createElement(NextDeparturesListHeader, null),
    React.createElement(
      'div',
      { className: 'scrollable momentum-scroll favourites' },
      React.createElement(FavouriteRoutes, { routes: routes })
    )
  );
};

FavouritesPanel.propTypes = {
  routes: PropTypes.array.isRequired
};

export default connectToStores(FavouritesPanel, ['FavouriteRoutesStore'], function (context) {
  return {
    routes: context.getStore('FavouriteRoutesStore').getRoutes()
  };
});