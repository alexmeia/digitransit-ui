import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import IconWithBigCaution from './IconWithBigCaution';
import IconWithIcon from './IconWithIcon';
import ComponentUsageExample from './ComponentUsageExample';
import { realtimeDeparture as exampleRealtimeDeparture } from './ExampleData';

var LONG_ROUTE_NUMBER_LENGTH = 6;

function RouteNumber(props) {
  var mode = props.mode.toLowerCase();

  if (mode === 'bicycle' || mode === 'car') {
    mode += '-withoutBox';
  }

  var longText = props.text && props.text.length >= LONG_ROUTE_NUMBER_LENGTH;

  var icon = function icon(isCallAgency, hasDisruption) {
    if (isCallAgency) {
      return React.createElement(IconWithIcon, { className: mode + ' call', img: 'icon-icon_' + mode, subIcon: 'icon-icon_call' });
    }

    if (hasDisruption) {
      return React.createElement(IconWithBigCaution, {
        className: mode,
        img: 'icon-icon_' + mode
      });
    }

    return React.createElement(IconWithIcon, {
      className: mode,
      img: 'icon-icon_' + mode,
      subIcon: ''
    });
  };

  // props.vertical is FALSE in Near you view
  // props.vertical is TRUE in itinerary view
  return React.createElement(
    'span',
    { className: cx('route-number', { vertical: props.vertical }) },
    React.createElement(
      'span',
      { className: cx('vcenter-children', props.className) },
      props.vertical === true ? React.createElement(
        'div',
        { className: 'special-icon ' + mode },
        icon(props.isCallAgency, props.hasDisruption)
      ) : icon(props.isCallAgency, props.hasDisruption),
      props.withBar && React.createElement(
        'div',
        { className: 'bar-container' },
        React.createElement(
          'div',
          { className: cx('bar', mode) },
          React.createElement('div', { className: 'bar-inner' })
        )
      )
    ),
    props.vertical === false ? React.createElement(
      'span',
      { className: cx('vehicle-number', mode, { 'overflow-fade': longText && props.fadeLong, long: longText }) },
      props.text
    ) : React.createElement(
      'div',
      { className: 'vehicle-number-container-v' },
      React.createElement(
        'span',
        { className: cx('vehicle-number', mode, { 'overflow-fade': longText && props.fadeLong, long: longText }) },
        props.text
      )
    )
  );
}

RouteNumber.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display mode icon and route number with mode color'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(RouteNumber, {
        mode: exampleRealtimeDeparture.pattern.route.mode,
        text: exampleRealtimeDeparture.pattern.route.shortName
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with disruption' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(RouteNumber, {
          mode: exampleRealtimeDeparture.pattern.route.mode,
          text: exampleRealtimeDeparture.pattern.route.shortName,
          hasDisruption: true
        })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with callAgency' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(RouteNumber, {
          mode: exampleRealtimeDeparture.pattern.route.mode,
          text: exampleRealtimeDeparture.pattern.route.shortName,
          isCallAgency: true
        })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'in vertical configuration' },
      React.createElement(RouteNumber, {
        mode: exampleRealtimeDeparture.pattern.route.mode,
        text: exampleRealtimeDeparture.pattern.route.shortName,
        vertical: true
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'in vertical configuration with disruption' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(RouteNumber, {
          mode: exampleRealtimeDeparture.pattern.route.mode,
          text: exampleRealtimeDeparture.pattern.route.shortName,
          hasDisruption: true,
          vertical: true
        })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'in vertical configuration with callAgency' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(RouteNumber, {
          mode: exampleRealtimeDeparture.pattern.route.mode,
          text: exampleRealtimeDeparture.pattern.route.shortName,
          isCallAgency: true,
          vertical: true
        })
      )
    )
  );
};

RouteNumber.propTypes = {
  mode: PropTypes.string.isRequired,
  text: PropTypes.node,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  hasDisruption: PropTypes.bool,
  fadeLong: PropTypes.bool,
  withBar: PropTypes.bool.isRequired,
  isCallAgency: PropTypes.bool.isRequired
};

RouteNumber.defaultProps = {
  withBar: false,
  className: '',
  vertical: false,
  hasDisruption: false,
  fadeLong: false,
  text: '',
  isCallAgency: false
};

RouteNumber.displayName = 'RouteNumber';
export default RouteNumber;