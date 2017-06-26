import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Relay, { Route } from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import withState from 'recompose/withState';
import moment from 'moment';
import StopPageContentContainer from './StopPageContentContainer';

var initialDate = moment().format('YYYYMMDD');

var StopPageContainerRoute = function (_Route) {
  _inherits(StopPageContainerRoute, _Route);

  function StopPageContainerRoute() {
    _classCallCheck(this, StopPageContainerRoute);

    return _possibleConstructorReturn(this, _Route.apply(this, arguments));
  }

  return StopPageContainerRoute;
}(Route);

StopPageContainerRoute.queries = {
  stop: function stop(RelayComponent, variables) {
    return function (RQL_0) {
      return {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'String!'
          },
          name: 'id',
          value: {
            kind: 'CallVariable',
            callVariableName: 'stopId'
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
        fieldName: 'stop',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'StopPage',
        type: 'Stop'
      };
    }(RelayComponent.getFragment('stop', variables));
  }
};
StopPageContainerRoute.paramDefinitions = {
  startTime: { required: true },
  timeRange: { required: true },
  numberOfDepartures: { required: true }
};
StopPageContainerRoute.routeName = 'StopPageContainerRoute';


var StopPageRootContainer = function StopPageRootContainer(routeProps) {
  return React.createElement(Relay.Renderer, {
    Container: StopPageContentContainer,
    queryConfig: new StopPageContainerRoute(_extends({
      stopId: routeProps.params.stopId
    }, routeProps)),
    environment: Relay.Store,
    render: function render(_ref) {
      var props = _ref.props,
          done = _ref.done;
      return done ? React.createElement(StopPageContentContainer, _extends({}, props, { initialDate: initialDate, setDate: routeProps.setDate })) : undefined;
    }
  });
};

var StopPageContainerWithState = withState('date', 'setDate', initialDate)(StopPageRootContainer);

export default connectToStores(StopPageContainerWithState, ['TimeStore', 'FavouriteStopsStore'], function (_ref2) {
  var getStore = _ref2.getStore;
  return {
    startTime: getStore('TimeStore').getCurrentTime().unix(),
    timeRange: 3600 * 12,
    numberOfDepartures: 100
  };
});