import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import Icon from './Icon';

var DisruptionInfoButton = function (_React$Component) {
  _inherits(DisruptionInfoButton, _React$Component);

  function DisruptionInfoButton() {
    _classCallCheck(this, DisruptionInfoButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DisruptionInfoButton.prototype.render = function render() {
    if (!this.context.config.disruption || this.context.config.disruption.showInfoButton) {
      return React.createElement(
        'div',
        {
          className: 'cursor-pointer disruption-info',
          onClick: this.props.toggleDisruptionInfo
        },
        React.createElement(FormattedMessage, { id: 'disruptions', defaultMessage: 'Disruptions' }),
        this.props.root && this.props.root.alerts && this.props.root.alerts.length > 0 && React.createElement(Icon, { img: 'icon-icon_caution', className: 'disruption-info' })
      );
    }
    return null;
  };

  return DisruptionInfoButton;
}(React.Component);

DisruptionInfoButton.propTypes = {
  toggleDisruptionInfo: PropTypes.func,
  root: PropTypes.shape({
    alerts: PropTypes.array
  }).isRequired
};
DisruptionInfoButton.contextTypes = {
  config: PropTypes.object.isRequired
};


export default Relay.createContainer(DisruptionInfoButton, {
  fragments: {
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
          name: 'DisruptionInfoButton_RootRelayQL',
          type: 'QueryType'
        };
      }();
    }
  },
  initialVariables: { feedIds: null }
});