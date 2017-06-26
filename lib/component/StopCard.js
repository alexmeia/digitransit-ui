import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import StopCardHeaderContainer from './StopCardHeaderContainer';
import Card from './Card';

var StopCard = function (_React$Component) {
  _inherits(StopCard, _React$Component);

  function StopCard() {
    _classCallCheck(this, StopCard);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  StopCard.prototype.render = function render() {
    if (!this.props.stop || !this.props.children || this.props.children.length === 0) {
      return false;
    }
    var prefix = this.props.isTerminal ? 'terminaalit' : 'pysakit';

    return React.createElement(
      Link,
      { to: '/' + prefix + '/' + this.props.stop.gtfsId, className: 'no-decoration' },
      React.createElement(
        Card,
        { className: this.props.className },
        React.createElement(StopCardHeaderContainer, {
          stop: this.props.stop,
          icons: this.props.icons,
          distance: this.props.distance,
          headingStyle: 'header-primary'
        }),
        this.props.children
      )
    );
  };

  return StopCard;
}(React.Component);

StopCard.propTypes = {
  stop: PropTypes.shape({
    gtfsId: PropTypes.string.isRequired
  }),
  icons: PropTypes.arrayOf(PropTypes.node),
  distance: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  isTerminal: PropTypes.bool
};

export default StopCard;