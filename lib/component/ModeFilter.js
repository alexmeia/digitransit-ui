import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import pure from 'recompose/pure';

import ToggleButton from './ToggleButton';
import ComponentUsageExample from './ComponentUsageExample';

var ModeFilter = function (_React$Component) {
  _inherits(ModeFilter, _React$Component);

  function ModeFilter() {
    var _temp, _this, _ret;

    _classCallCheck(this, ModeFilter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.availableModes = function () {
      return Object.keys(_this.context.config.transportModes).filter(function (mode) {
        return _this.context.config.transportModes[mode].availableForSelection;
      });
    }, _this.render = function () {
      var widthPercentage = 100 / _this.availableModes().length;
      var ModeToggleButton = function ModeToggleButton(_ref) {
        var type = _ref.type,
            stateName = _ref.stateName;

        if (_this.context.config.transportModes[type].availableForSelection) {
          var action = _this.props.action['toggle' + (type.charAt(0).toUpperCase() + type.slice(1)) + 'State'];
          var selectedModes = _this.props.selectedModes;
          var isEnabled = selectedModes.includes(stateName) || selectedModes.includes(type.toUpperCase());
          return React.createElement(ToggleButton, {
            icon: type + '-withoutBox',
            onBtnClick: function onBtnClick() {
              _this.context.executeAction(action);
            },
            state: isEnabled,
            checkedClass: type,
            style: {
              width: widthPercentage + '%'
            },
            className: _this.props.buttonClass
          });
        }
        return null;
      };

      // TODO we could build the filter strictly based on config
      return React.createElement(
        'div',
        { className: 'btn-bar mode-filter no-select' },
        React.createElement(ModeToggleButton, { type: 'bus' }),
        React.createElement(ModeToggleButton, { type: 'tram' }),
        React.createElement(ModeToggleButton, { type: 'rail' }),
        React.createElement(ModeToggleButton, { type: 'subway' }),
        React.createElement(ModeToggleButton, { type: 'ferry' }),
        React.createElement(ModeToggleButton, { type: 'airplane' }),
        React.createElement(ModeToggleButton, { type: 'citybike', stateName: 'BICYCLE_RENT' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ModeFilter;
}(React.Component);

ModeFilter.propTypes = {
  selectedModes: PropTypes.array.isRequired,
  action: PropTypes.object.isRequired,
  buttonClass: PropTypes.string
};
ModeFilter.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};


var pureModeFilter = pure(ModeFilter);

pureModeFilter.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'ModeFilter displays row of transport mode icons that can be used to select transport modes'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(ModeFilter, {
        selectedModes: ['BUS', 'TRAM'],
        action: {
          toggleBusState: function toggleBusState() {},
          toggleTramState: function toggleTramState() {}
        },
        buttonClass: ''
      })
    ),
    React.createElement(
      'p',
      null,
      'For \u2018nearby white buttons\u2019'
    ),
    React.createElement(
      'div',
      { className: 'nearby-routes' },
      React.createElement(
        ComponentUsageExample,
        null,
        React.createElement(ModeFilter, {
          selectedModes: ['BUS', 'TRAM'],
          action: {
            toggleBusState: function toggleBusState() {},
            toggleTramState: function toggleTramState() {}
          },
          buttonClass: 'btn mode-nearby'
        })
      )
    )
  );
};

pureModeFilter.displayName = 'ModeFilter';

export default pureModeFilter;