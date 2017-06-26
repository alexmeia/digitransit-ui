import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import RouteNumberContainer from './RouteNumberContainer';

var RouteTitle = function RouteTitle(_ref, _ref2) {
  var route = _ref.route;
  var breakpoint = _ref2.breakpoint;
  return breakpoint === 'large' || !route || !route.mode ? React.createElement(FormattedMessage, {
    id: 'route-page.title-short',
    defaultMessage: 'Route'
  }) : React.createElement(
    Link,
    { to: '/linjat/' + route.gtfsId },
    React.createElement(RouteNumberContainer, {
      className: 'route-number-title',
      route: route,
      vertical: false,
      text: route.shortName
    })
  );
};

RouteTitle.propTypes = {
  route: PropTypes.shape({
    gtfsId: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    shortName: PropTypes.string
  })
};

RouteTitle.contextTypes = {
  breakpoint: PropTypes.string
};

export default Relay.createContainer(RouteTitle, {
  fragments: {
    route: function route() {
      return function () {
        return {
          children: [{
            fieldName: 'gtfsId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
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
            fieldName: 'type',
            kind: 'Field',
            metadata: {},
            type: 'Int'
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
          name: 'RouteTitle_RouteRelayQL',
          type: 'Route'
        };
      }();
    }
  }
});