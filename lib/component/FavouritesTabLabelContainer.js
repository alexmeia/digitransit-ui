import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import mapProps from 'recompose/mapProps';
import some from 'lodash/some';
import flatten from 'lodash/flatten';
import RoutesRoute from '../route/RoutesRoute';
import FavouritesTabLabel from './FavouritesTabLabel';
import { isBrowser } from '../util/browser';

var hasDisruption = function hasDisruption(routes) {
  return some(flatten(routes.map(function (route) {
    return route.alerts.length > 0;
  })));
};

var alertReducer = mapProps(function (_ref) {
  var routes = _ref.routes,
      rest = _objectWithoutProperties(_ref, ['routes']);

  return _extends({
    hasDisruption: hasDisruption(routes)
  }, rest);
});

var FavouritesTabLabelRelayConnector = Relay.createContainer(alertReducer(FavouritesTabLabel), {
  fragments: {
    routes: function routes() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'alerts',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
            },
            type: 'Alert'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'FavouritesTabLabelContainer_RoutesRelayQL',
          type: 'Route'
        };
      }();
    }
  }
});

function FavouritesTabLabelContainer(_ref2) {
  var routes = _ref2.routes,
      rest = _objectWithoutProperties(_ref2, ['routes']);

  if (isBrowser) {
    return React.createElement(Relay.Renderer, {
      Container: FavouritesTabLabelRelayConnector,
      queryConfig: new RoutesRoute({ ids: routes }),
      environment: Relay.Store,
      render: function render(_ref3) {
        var done = _ref3.done,
            props = _ref3.props;
        return done ? React.createElement(FavouritesTabLabelRelayConnector, _extends({}, props, rest)) : React.createElement(FavouritesTabLabel, rest);
      }
    });
  }
  return React.createElement('div', null);
}

FavouritesTabLabelContainer.propTypes = {
  routes: PropTypes.array.isRequired
};

export default connectToStores(FavouritesTabLabelContainer, ['FavouriteRoutesStore'], function (context) {
  return {
    routes: context.getStore('FavouriteRoutesStore').getRoutes()
  };
});