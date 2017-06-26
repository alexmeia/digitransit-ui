import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage, intlShape } from 'react-intl';
import moment from 'moment';
import find from 'lodash/find';
import upperFirst from 'lodash/upperFirst';
import connectToStores from 'fluxible-addons-react/connectToStores';

import RouteAlertsRow from './RouteAlertsRow';

var getAlerts = function getAlerts(route, currentTime, intl) {
  var routeMode = route.mode.toLowerCase();
  var routeLine = route.shortName;

  return route.alerts.map(function (alert) {
    // Try to find the alert in user's language, or failing in English, or failing in any language
    // TODO: This should be a util function that we use everywhere
    // TODO: We should match to all languages user's browser lists as acceptable
    var header = find(alert.alertHeaderTextTranslations, ['language', intl.locale]);
    if (!header) {
      header = find(alert.alertHeaderTextTranslations, ['language', 'en']);
    }
    if (!header) {
      header = alert.alertHeaderTextTranslations[0];
    }
    if (header) {
      header = header.text;
    }

    // Unfortunately nothing in GTFS-RT specifies that if there's one string in a language then
    // all other strings would also be available in the same language...
    var description = find(alert.alertDescriptionTextTranslations, ['language', intl.locale]);
    if (!description) {
      description = find(alert.alertDescriptionTextTranslations, ['language', 'en']);
    }
    if (!description) {
      description = alert.alertDescriptionTextTranslations[0];
    }
    if (description) {
      description = description.text;
    }

    var startTime = moment(alert.effectiveStartDate * 1000);
    var endTime = moment(alert.effectiveEndDate * 1000);
    var sameDay = startTime.isSame(endTime, 'day');

    return React.createElement(RouteAlertsRow, {
      key: alert.id,
      routeMode: routeMode,
      routeLine: routeLine,
      header: header,
      description: description,
      endTime: sameDay ? intl.formatTime(endTime) : upperFirst(endTime.calendar(currentTime)),
      startTime: upperFirst(startTime.calendar(currentTime)),
      expired: startTime > currentTime || currentTime > endTime
    });
  });
};

function RouteAlertsContainer(_ref, _ref2) {
  var route = _ref.route,
      currentTime = _ref.currentTime;
  var intl = _ref2.intl;

  if (route.alerts.length === 0) {
    return React.createElement(
      'div',
      { className: 'no-alerts-message' },
      React.createElement(FormattedMessage, {
        id: 'disruption-info-route-no-alerts',
        defaultMessage: 'No known disruptions or diversions for route.'
      })
    );
  }

  return React.createElement(
    'div',
    { className: 'route-alerts-list momentum-scroll' },
    getAlerts(route, currentTime, intl)
  );
}

RouteAlertsContainer.propTypes = {
  route: PropTypes.object.isRequired,
  currentTime: PropTypes.object
};

RouteAlertsContainer.contextTypes = {
  intl: intlShape
};

var RouteAlertsContainerWithTime = connectToStores(RouteAlertsContainer, ['TimeStore'], function (context) {
  return {
    currentTime: context.getStore('TimeStore').getCurrentTime()
  };
});

export default Relay.createContainer(RouteAlertsContainerWithTime, {
  fragments: {
    route: function route() {
      return function () {
        return {
          children: [{
            fieldName: 'mode',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'shortName',
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
          metadata: {},
          name: 'RouteAlertsContainer_RouteRelayQL',
          type: 'Route'
        };
      }();
    }
  }
});