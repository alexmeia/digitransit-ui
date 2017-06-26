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

var TerminalPageContainerRoute = function (_Route) {
  _inherits(TerminalPageContainerRoute, _Route);

  function TerminalPageContainerRoute() {
    _classCallCheck(this, TerminalPageContainerRoute);

    return _possibleConstructorReturn(this, _Route.apply(this, arguments));
  }

  return TerminalPageContainerRoute;
}(Route);

TerminalPageContainerRoute.queries = {
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
            callVariableName: 'terminalId'
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
        fieldName: 'station',
        kind: 'Query',
        metadata: {
          identifyingArgName: 'id',
          identifyingArgType: 'String!'
        },
        name: 'TerminalPage',
        type: 'Stop'
      };
    }(RelayComponent.getFragment('stop', variables));
  }
};
TerminalPageContainerRoute.paramDefinitions = {
  startTime: { required: true },
  timeRange: { required: true },
  numberOfDepartures: { required: true }
};
TerminalPageContainerRoute.routeName = 'StopPageContainerRoute';


var TerminalPageRootContainer = function TerminalPageRootContainer(routeProps) {
  return React.createElement(Relay.Renderer, {
    Container: StopPageContentContainer,
    queryConfig: new TerminalPageContainerRoute(_extends({
      terminalId: routeProps.params.terminalId
    }, routeProps)),
    environment: Relay.Store,
    render: function render(_ref) {
      var props = _ref.props,
          done = _ref.done;
      return done ? React.createElement(StopPageContentContainer, _extends({}, props, { initialDate: initialDate, setDate: routeProps.setDate })) : undefined;
    }
  });
};

var TerminalPageContainerWithState = withState('date', 'setDate', initialDate)(TerminalPageRootContainer);

export default connectToStores(TerminalPageContainerWithState, ['TimeStore', 'FavouriteStopsStore'], function (_ref2) {
  var getStore = _ref2.getStore;
  return {
    startTime: getStore('TimeStore').getCurrentTime().unix(),
    timeRange: 3600,
    numberOfDepartures: 100
  };
});