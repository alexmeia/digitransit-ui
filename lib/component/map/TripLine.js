import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import RouteLine from './route/RouteLine';

var TripLine = function TripLine(props) {
  return React.createElement(RouteLine, _extends({ thin: true }, props));
};

TripLine.propTypes = { pattern: PropTypes.object, filteredStops: PropTypes.array };

export default Relay.createContainer(TripLine, { fragments: {
    pattern: function pattern() {
      return function (RQL_0) {
        return {
          children: [{
            children: [].concat.apply([], [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }, Relay.QL.__frag(RQL_0)]),
            fieldName: 'pattern',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Pattern'
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
          name: 'TripLine_PatternRelayQL',
          type: 'Trip'
        };
      }(RouteLine.getFragment('pattern'));
    }
  } });