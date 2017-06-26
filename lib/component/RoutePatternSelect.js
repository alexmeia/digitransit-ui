import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import { routePatterns as exampleRoutePatterns } from './ExampleData';

function RoutePatternSelect(props) {
  var options = props.route && props.route.patterns.map(function (pattern) {
    return React.createElement(
      'option',
      { key: pattern.code, value: pattern.code },
      pattern.stops[0].name,
      ' \u2794 ',
      pattern.headsign
    );
  });

  return React.createElement(
    'div',
    { className: cx('route-pattern-select', props.className) },
    React.createElement(Icon, { img: 'icon-icon_arrow-dropdown' }),
    React.createElement(
      'select',
      { onChange: props.onSelectChange, value: props.params && props.params.patternId },
      options
    )
  );
}

RoutePatternSelect.propTypes = {
  params: PropTypes.object,
  route: PropTypes.object,
  className: PropTypes.string,
  onSelectChange: PropTypes.func.isRequired
};

RoutePatternSelect.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display a dropdown to select the pattern for a route'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RoutePatternSelect, {
        pattern: exampleRoutePatterns,
        onSelectChange: function onSelectChange() {}
      })
    )
  );
};

export default Relay.createContainer(RoutePatternSelect, {
  fragments: {
    route: function route() {
      return function () {
        return {
          children: [{
            children: [{
              fieldName: 'code',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'headsign',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              children: [{
                fieldName: 'name',
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
              fieldName: 'stops',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isPlural: true
              },
              type: 'Stop'
            }, {
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
            }],
            fieldName: 'patterns',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
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
          name: 'RoutePatternSelect_RouteRelayQL',
          type: 'Route'
        };
      }();
    }
  }
});