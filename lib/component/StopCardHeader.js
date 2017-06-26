import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import CardHeader from './CardHeader';
import ComponentUsageExample from './ComponentUsageExample';
import InfoIcon from './InfoIcon';

var StopCardHeader = function (_React$Component) {
  _inherits(StopCardHeader, _React$Component);

  function StopCardHeader() {
    _classCallCheck(this, StopCardHeader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  StopCardHeader.prototype.getDescription = function getDescription() {
    var description = '';

    if (this.context.config.stopCard.header.showDescription && this.props.stop.desc) {
      description += this.props.stop.desc;
    }

    if (this.context.config.stopCard.header.showDistance && this.props.distance) {
      description += ' // ' + Math.round(this.props.distance) + ' m';
    }

    return description;
  };

  StopCardHeader.prototype.render = function render() {
    if (!this.props.stop) return false;

    return React.createElement(CardHeader, {
      className: this.props.className,
      headingStyle: this.props.headingStyle,
      name: this.props.stop.name,
      description: this.getDescription(),
      code: this.context.config.stopCard.header.showStopCode && this.props.stop.code ? this.props.stop.code : null,
      icons: this.props.icons
    });
  };

  return StopCardHeader;
}(React.Component);

StopCardHeader.propTypes = {
  stop: PropTypes.object,
  distance: PropTypes.number,
  className: PropTypes.string,
  headingStyle: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node)
};

StopCardHeader.contextTypes = {
  config: PropTypes.object.isRequired
};

var exampleStop = {
  code: '4611',
  gtfsId: 'HSL:1541157',
  name: 'Kaivonkatsojanpuisto',
  desc: 'Kaivonkatsojantie'
};

var exampleIcons = [React.createElement(InfoIcon, { stop: exampleStop, key: 'example' })];

StopCardHeader.displayName = 'StopCardHeader';

StopCardHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'basic' },
      React.createElement(StopCardHeader, { stop: exampleStop, distance: 345.6 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with icons' },
      React.createElement(StopCardHeader, { stop: exampleStop, distance: 345.6, icons: exampleIcons })
    )
  );
};

export default StopCardHeader;