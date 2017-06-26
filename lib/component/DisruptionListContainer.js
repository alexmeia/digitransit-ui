import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import { FormattedMessage, intlShape } from 'react-intl';
import find from 'lodash/find';
import DisruptionRow from './DisruptionRow';

function DisruptionListContainer(_ref, _ref2) {
  var root = _ref.root;
  var intl = _ref2.intl;

  if (!root || !root.alerts || root.alerts.length === 0) {
    return React.createElement(FormattedMessage, {
      id: 'disruption-info-no-alerts',
      defaultMessage: 'No known disruptions or diversions.'
    });
  }

  var alertElements = root.alerts.map(function (alert) {
    var id = alert.id;

    var startTime = moment(alert.effectiveStartDate * 1000);
    var endTime = moment(alert.effectiveEndDate * 1000);
    var cause = 'because';
    var routes = [alert.route];
    var translation = find(alert.alertDescriptionTextTranslations, ['language', intl.locale]);

    var description = translation ? translation.text : alert.alertDescriptionText;

    return React.createElement(DisruptionRow, {
      key: id,
      description: description,
      startTime: startTime,
      endTime: endTime,
      cause: cause,
      routes: routes
    });
  });

  return React.createElement(
    'div',
    null,
    alertElements
  );
}

DisruptionListContainer.contextTypes = {
  intl: intlShape
};

DisruptionListContainer.propTypes = {
  root: PropTypes.shape({
    alerts: PropTypes.array
  }).isRequired
};

var relayFragment = {
  root: function root() {
    return function () {
      return {
        children: [{
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'feeds',
            value: {
              kind: 'CallVariable',
              callVariableName: 'feedIds'
            }
          }],
          children: [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isRequisite: true
            },
            type: 'ID'
          }, {
            fieldName: 'feed',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'alertHeaderText',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            children: [{
              fieldName: 'text',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'language',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }],
            fieldName: 'alertHeaderTextTranslations',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'TranslatedString'
          }, {
            fieldName: 'alertDescriptionText',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            children: [{
              fieldName: 'text',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'language',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }],
            fieldName: 'alertDescriptionTextTranslations',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'TranslatedString'
          }, {
            fieldName: 'effectiveStartDate',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            fieldName: 'effectiveEndDate',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            children: [{
              fieldName: 'shortName',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'mode',
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
            fieldName: 'route',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Route'
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
        }],
        id: Relay.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'DisruptionListContainer_RootRelayQL',
        type: 'QueryType'
      };
    }();
  }
};

export default Relay.createContainer(DisruptionListContainer, {
  fragments: relayFragment,
  initialVariables: { feedIds: null }
});