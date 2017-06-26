import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import get from 'lodash/get';
import { intlShape } from 'react-intl';
import AgencyInfo from './AgencyInfo';

function LegAgencyInfo(_ref, _ref2) {
  var leg = _ref.leg;
  var config = _ref2.config;

  var agencyName = get(leg, 'agency.name');
  var url = get(leg, 'agency.fareUrl') || get(leg, 'agency.url');
  var show = get(config, 'agency.show', false);
  if (show) {
    return React.createElement(
      'div',
      { className: 'itinerary-leg-agency' },
      React.createElement(AgencyInfo, { url: url, agencyName: agencyName })
    );
  }
  return null;
}

LegAgencyInfo.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};

LegAgencyInfo.propTypes = {
  leg: PropTypes.object
};

export default Relay.createContainer(LegAgencyInfo, {
  fragments: {
    leg: function leg() {
      return function () {
        return {
          children: [{
            children: [{
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
              fieldName: 'fareUrl',
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
            fieldName: 'agency',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Agency'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'LegAgencyInfo_LegRelayQL',
          type: 'Leg'
        };
      }();
    }
  }
});