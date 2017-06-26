import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { routerShape, locationShape } from 'react-router';
import DisruptionInfoButton from './DisruptionInfoButton';
import { isBrowser } from '../util/browser';

function DisruptionInfoButtonContainer(outerProps, _ref) {
  var router = _ref.router,
      location = _ref.location,
      feedIds = _ref.config.feedIds;

  if (isBrowser) {
    var openDisruptionInfo = function openDisruptionInfo() {
      router.push(_extends({}, location, {
        state: _extends({}, location.state, {
          disruptionInfoOpen: true
        })
      }));
    };

    return React.createElement(Relay.Renderer, {
      Container: DisruptionInfoButton,
      forceFetch: true,
      queryConfig: {
        name: 'ViewerRoute',
        queries: {
          root: function root(Component, variables) {
            return function (RQL_0) {
              return {
                children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
                fieldName: 'viewer',
                kind: 'Query',
                metadata: {},
                name: 'DisruptionInfoButtonContainer',
                type: 'QueryType'
              };
            }(Component.getFragment('root', variables));
          }
        },
        params: { feedIds: feedIds }
      },
      environment: Relay.Store,
      render: function render(_ref2) {
        var renderProps = _ref2.renderProps,
            props = _ref2.props;
        return React.createElement(DisruptionInfoButton, _extends({}, renderProps, props, {
          toggleDisruptionInfo: openDisruptionInfo
        }));
      }
    });
  }
  return React.createElement('div', null);
}

DisruptionInfoButtonContainer.contextTypes = {
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  config: PropTypes.shape({
    feedIds: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired
};

export default DisruptionInfoButtonContainer;