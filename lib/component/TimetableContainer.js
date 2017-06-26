import Relay from 'react-relay';

import Timetable from './Timetable';

export default Relay.createContainer(Timetable, {
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
            fieldName: 'url',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'date',
              value: {
                kind: 'CallVariable',
                callVariableName: 'date'
              }
            }],
            children: [{
              children: [{
                fieldName: 'headsign',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'code',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                children: [{
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isRequisite: true
                  },
                  type: 'ID'
                }, {
                  fieldName: 'shortName',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'longName',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'mode',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  children: [{
                    fieldName: 'id',
                    kind: 'Field',
                    metadata: {
                      isRequisite: true
                    },
                    type: 'ID'
                  }, {
                    fieldName: 'name',
                    kind: 'Field',
                    metadata: {},
                    type: 'String'
                  }],
                  fieldName: 'agency',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true,
                    inferredRootCallName: 'node',
                    inferredPrimaryKey: 'id'
                  },
                  type: 'Agency'
                }],
                fieldName: 'route',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Route'
              }, {
                fieldName: 'id',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'ID'
              }],
              fieldName: 'pattern',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Pattern'
            }, {
              children: [{
                fieldName: 'scheduledDeparture',
                kind: 'Field',
                metadata: {},
                type: 'Int'
              }, {
                fieldName: 'serviceDay',
                kind: 'Field',
                metadata: {},
                type: 'Long'
              }, {
                fieldName: 'headsign',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'pickupType',
                kind: 'Field',
                metadata: {},
                type: 'PickupDropoffType'
              }],
              fieldName: 'stoptimes',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'Stoptime'
            }],
            fieldName: 'stoptimesForServiceDate',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'StoptimesInPattern'
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
          name: 'Timetable',
          type: 'Stop'
        };
      }();
    }
  },
  initialVariables: { date: null }
});