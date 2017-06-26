import Relay from 'react-relay';
import StopCardHeader from './StopCardHeader';

export default Relay.createContainer(StopCardHeader, {
  fragments: {
    stop: function stop() {
      return function () {
        return {
          children: [{
            fieldName: 'gtfsId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'code',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'desc',
            kind: 'Field',
            metadata: {},
            type: 'String'
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
          metadata: {},
          name: 'StopCardHeaderContainer_StopRelayQL',
          type: 'Stop'
        };
      }();
    }
  }
});