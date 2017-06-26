import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';

import Modal from './Modal';
import Loading from './Loading';
import DisruptionListContainer from './DisruptionListContainer';
import ComponentUsageExample from './ComponentUsageExample';
import { isBrowser } from '../util/browser';

function DisruptionInfo(props, context) {
  var isOpen = function isOpen() {
    return context.location.state ? context.location.state.disruptionInfoOpen : false;
  };

  var toggleVisibility = function toggleVisibility() {
    if (isOpen()) {
      context.router.goBack();
    } else {
      context.router.push(_extends({}, location, {
        state: _extends({}, location.state, {
          disruptionInfoOpen: true
        })
      }));
    }
  };

  if (isBrowser && isOpen()) {
    return React.createElement(
      Modal,
      {
        open: true,
        title: React.createElement(FormattedMessage, { id: 'disruption-info', defaultMessage: 'Disruption info' }),
        toggleVisibility: toggleVisibility
      },
      React.createElement(Relay.RootContainer, {
        Component: DisruptionListContainer,
        forceFetch: true,
        route: {
          name: 'ViewerRoute',
          queries: {
            root: function root(Component, _ref) {
              var feedIds = _ref.feedIds;
              return function (RQL_0) {
                return {
                  children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
                  fieldName: 'viewer',
                  kind: 'Query',
                  metadata: {},
                  name: 'DisruptionInfo',
                  type: 'QueryType'
                };
              }(Component.getFragment('root', { feedIds: feedIds }));
            }
          },
          params: { feedIds: context.config.feedIds }
        },
        renderLoading: function renderLoading() {
          return React.createElement(Loading, null);
        }
      })
    );
  }
  return React.createElement('div', null);
}

DisruptionInfo.contextTypes = {
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  config: PropTypes.shape({
    feedIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired
};

DisruptionInfo.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Modal that shows all available disruption info. Opened by DisruptionInfoButton.',
      React.createElement(
        'strong',
        null,
        'Deprecated:'
      ),
      ' Will be removed in short future in favor of announcements page.'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(DisruptionInfo, null)
    )
  );
};

export default DisruptionInfo;