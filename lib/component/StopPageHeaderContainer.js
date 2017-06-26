import Relay from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';

import StopCardHeaderContainer from './StopCardHeaderContainer';
import StopPageHeader from './StopPageHeader';

var StopPageHeaderContainer = Relay.createContainer(StopPageHeader, {
  fragments: {
    stop: function stop() {
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopPageHeaderContainer_StopRelayQL',
          type: 'Stop'
        };
      }(StopCardHeaderContainer.getFragment('stop'));
    }
  }
});

export default connectToStores(StopPageHeaderContainer, ['FavouriteStopsStore'], function (_ref, _ref2) {
  var getStore = _ref.getStore;
  var params = _ref2.params;
  return {
    favourite: getStore('FavouriteStopsStore').isFavourite(params.stopId)
  };
});