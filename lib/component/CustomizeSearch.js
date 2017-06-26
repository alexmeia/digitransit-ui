import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';
import range from 'lodash/range';
import xor from 'lodash/xor';
import without from 'lodash/without';
import cx from 'classnames';

import Icon from './Icon';
import Slider from './Slider';
import ToggleButton from './ToggleButton';
import ModeFilter from './ModeFilter';
import Select from './Select';
import { route } from '../action/ItinerarySearchActions';
import ViaPointSelector from './ViaPointSelector';
import { getCustomizedSettings, resetCustomizedSettings } from '../store/localStorage';
import SaveCustomizedSettingsButton from './SaveCustomizedSettingsButton';
import ResetCustomizedSettingsButton from './ResetCustomizedSettingsButton';

// find the array slot closest to a value
function mapToSlider(value, arr) {
  var best = 0;
  var minDiff = Math.abs(value - arr[0]);

  for (var i = 1; i < arr.length; i++) {
    var diff = Math.abs(value - arr[i]);
    if (diff < minDiff) {
      minDiff = diff;
      best = i;
    }
  }
  return best;
}

var WALKBOARDCOST_MIN = 1;
var WALKBOARDCOST_DEFAULT = 600;
var WALKBOARDCOST_MAX = 3600;

// Get default settings
var defaultSettings = {
  accessibilityOption: 0,
  minTransferTime: 180,
  walkBoardCost: WALKBOARDCOST_DEFAULT,
  walkReluctance: 2,
  walkSpeed: 1.2
};

var CustomizeSearch = function (_React$Component) {
  _inherits(CustomizeSearch, _React$Component);

  /*
      This function is used to map our desired min, max, and default values to a standard
      amount of steps on the UI sliders. This allows us to always keep the default values
      in the slider midpoint.
       The ranges below and above the default value are divided into even steps, after which
      the two ranges are combined into a single array of desired values.
  */
  CustomizeSearch.getSliderStepsArray = function getSliderStepsArray(min, max, defaultValue) {
    var stepCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

    var denom = stepCount / 2;
    var lowStep = (defaultValue - min) / denom;
    var lowRange = range(min, defaultValue, lowStep);
    var highStep = (max - defaultValue) / denom;
    var highRange = range(defaultValue, max, highStep);
    var sliderSteps = lowRange.concat(highRange.concat(max));
    return sliderSteps;
  };

  function CustomizeSearch(props) {
    _classCallCheck(this, CustomizeSearch);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getDefaultModes = function () {
      return [].concat(Object.keys(_this.context.config.transportModes).filter(function (mode) {
        return _this.context.config.transportModes[mode].defaultValue;
      }).map(function (mode) {
        return mode.toUpperCase();
      }), Object.keys(_this.context.config.streetModes).filter(function (mode) {
        return _this.context.config.streetModes[mode].defaultValue;
      }).map(function (mode) {
        return mode.toUpperCase();
      }));
    };

    _this.getStreetModesToggleButtons = function () {
      var availableStreetModes = Object.keys(_this.context.config.streetModes).filter(function (streetMode) {
        return _this.context.config.streetModes[streetMode].availableForSelection;
      });

      if (!availableStreetModes.length) return null;

      return availableStreetModes.map(function (streetMode, index) {
        return React.createElement(ToggleButton, {
          key: 'toggle-button-' + streetMode,
          icon: _this.context.config.streetModes[streetMode].icon,
          onBtnClick: function onBtnClick() {
            return _this.toggleStreetMode(streetMode);
          },
          state: _this.getMode(streetMode),
          checkedClass: streetMode,
          className: cx('small-4', { 'first-btn': index === 0, 'last-btn': index === availableStreetModes.length - 1 })
        });
      });
    };

    _this.getWalkReluctanceSlider = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Slider, {
          headerText: _this.context.intl.formatMessage({
            id: 'walking',
            defaultMessage: 'Walking'
          }),
          onSliderChange: function onSliderChange(e) {
            return _this.updateSettings('walkReluctance', _this.walkReluctanceSliderValues[e.target.value], _this.walkReluctanceSliderValues);
          },
          min: 0,
          max: 20,
          value: _this.state.walkReluctance,
          step: 1,
          minText: _this.context.intl.formatMessage({
            id: 'avoid-walking',
            defaultMessage: 'Avoid walking'
          }),
          maxText: _this.context.intl.formatMessage({
            id: 'prefer-walking',
            defaultMessage: 'Prefer walking'
          })
        })
      );
    };

    _this.getWalkBoardCostSlider = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Slider, {
          headerText: _this.context.intl.formatMessage({
            id: 'transfers',
            defaultMessage: 'Transfers'
          }),
          onSliderChange: function onSliderChange(e) {
            return _this.updateSettings('walkBoardCost', _this.walkBoardCostSliderValues[e.target.value], _this.walkBoardCostSliderValues);
          },
          min: 0,
          max: 20,
          value: _this.state.walkBoardCost,
          step: 1,
          minText: _this.context.intl.formatMessage({
            id: 'avoid-transfers',
            defaultMessage: 'Avoid transfers'
          }),
          maxText: _this.context.intl.formatMessage({
            id: 'transfers-allowed',
            defaultMessage: 'Transfers allowed'
          })
        })
      );
    };

    _this.getTransferMarginSlider = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Slider, {
          headerText: _this.context.intl.formatMessage({
            id: 'transfers-margin',
            defaultMessage: 'Transfer margin at least'
          }),
          onSliderChange: function onSliderChange(e) {
            return _this.updateSettings('minTransferTime', _this.transferMarginSliderValues[e.target.value], _this.transferMarginSliderValues);
          },
          min: 0,
          max: 20,
          writtenValue: isNaN(_this.context.location.query.minTransferTime) === false ? Math.round(_this.context.location.query.minTransferTime / 60) + ' min' : 3 + ' min',
          value: _this.state.minTransferTime,
          step: 1,
          minText: _this.context.intl.formatMessage({
            id: 'no-transfers-margin',
            defaultMessage: '1 min'
          }),
          maxText: _this.context.intl.formatMessage({
            id: 'long-transfers-margin',
            defaultMessage: '12 min'
          })
        })
      );
    };

    _this.getWalkSpeedSlider = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Slider, {
          headerText: _this.context.intl.formatMessage({
            id: 'walking-speed',
            defaultMessage: 'Walking speed'
          }),
          onSliderChange: function onSliderChange(e) {
            return _this.updateSettings('walkSpeed', _this.walkingSpeedSliderValues[e.target.value], _this.walkingSpeedSliderValues);
          },
          min: 0,
          max: 20,
          value: _this.state.walkSpeed,
          step: 1,
          writtenValue: isNaN(_this.context.location.query.walkSpeed) === false ? Math.floor(_this.context.location.query.walkSpeed * 60) + ' m/min' : 72 + ' m/min',
          minText: _this.context.intl.formatMessage({
            id: 'slow',
            defaultMessage: 'Slow'
          }),
          maxText: _this.context.intl.formatMessage({
            id: 'run',
            defaultMessage: 'Run'
          })
        })
      );
    };

    _this.getTicketSelector = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Select, {
          headerText: _this.context.intl.formatMessage({
            id: 'zones',
            defaultMessage: 'Fare zones'
          }),
          name: 'ticket',
          selected: _this.context.location.query.ticketOption || '0',
          options: _this.context.config.ticketOptions,
          onSelectChange: function onSelectChange(e) {
            return _this.updateSettings('ticketOption', e.target.value);
          }
        })
      );
    };

    _this.getAccessibilityOption = function () {
      var accessibilityOption = void 0;
      if (!(typeof _this.context.location.query.accessibilityOption === 'undefined')) {
        accessibilityOption = _this.context.location.query.accessibilityOption;
      } else if (!(typeof getCustomizedSettings().accessibilityOption === 'undefined')) {
        accessibilityOption = getCustomizedSettings().accessibilityOption;
      } else {
        accessibilityOption = 0;
      }
      return accessibilityOption;
    };

    _this.getAccessibilitySelector = function () {
      return React.createElement(
        'section',
        { className: 'offcanvas-section' },
        React.createElement(Select, {
          headerText: _this.context.intl.formatMessage({
            id: 'accessibility',
            defaultMessage: 'Accessibility'
          }),
          name: 'accessible',
          selected: _this.getAccessibilityOption(),
          options: _this.context.config.accessibilityOptions,
          onSelectChange: function onSelectChange(e) {
            return _this.updateSettings('accessibilityOption', e.target.value);
          }
        })
      );
    };

    _this.removeViaPoint = function () {
      _this.context.router.replace(_extends({}, _this.context.location, {
        query: without(_this.context.location.query, 'intermediatePlaces')
      }));
    };

    _this.openSearchModal = function () {
      return _this.context.router.push(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          viaPointSearchModalOpen: 2
        })
      }));
    };

    _this.resetParameters = function () {
      resetCustomizedSettings();
      _this.setState({
        walkSpeed: mapToSlider(defaultSettings.walkSpeed, _this.walkingSpeedSliderValues),
        walkReluctance: mapToSlider(defaultSettings.walkReluctance, _this.walkReluctanceSliderValues),
        walkBoardCost: mapToSlider(defaultSettings.walkBoardCost, _this.walkBoardCostSliderValues),
        accessibilityOption: defaultSettings.accessibilityOption,
        minTransferTime: mapToSlider(defaultSettings.minTransferTime, _this.transferMarginSliderValues)
      });
      _this.context.executeAction(route, {
        location: _extends({}, _this.context.location, {
          query: {
            time: _this.context.location.query.time,
            walkSpeed: defaultSettings.walkSpeed,
            walkReluctance: defaultSettings.walkReluctance,
            walkBoardCost: defaultSettings.walkBoardCost,
            minTransferTime: defaultSettings.minTransferTime,
            accessibilityOption: defaultSettings.accessibilityOption,
            modes: _this.getDefaultModes().toString()
          }
        }),
        router: _this.context.router
      });
    };

    _this.actions = {
      toggleBusState: function toggleBusState() {
        return _this.toggleTransportMode('bus');
      },
      toggleTramState: function toggleTramState() {
        return _this.toggleTransportMode('tram');
      },
      toggleRailState: function toggleRailState() {
        return _this.toggleTransportMode('rail');
      },
      toggleSubwayState: function toggleSubwayState() {
        return _this.toggleTransportMode('subway');
      },
      toggleFerryState: function toggleFerryState() {
        return _this.toggleTransportMode('ferry');
      },
      toggleCitybikeState: function toggleCitybikeState() {
        return _this.toggleTransportMode('citybike');
      },
      toggleAirplaneState: function toggleAirplaneState() {
        return _this.toggleTransportMode('airplane');
      }
    };

    _this.state = {
      accessibilityOption: 0,
      minTransferTime: 0,
      walkBoardCost: 0,
      walkReluctance: 0,
      walkSpeed: 0
    };
    return _this;
  }

  CustomizeSearch.prototype.componentWillMount = function componentWillMount() {
    // Check if there are customized settings set
    var custSettings = getCustomizedSettings();

    /* Map sliders, if there are customized settings, prioritize them first,
    if there are query parameters, they come in second, if not, fall back to default values */
    this.walkReluctanceSliderValues = CustomizeSearch.getSliderStepsArray(0.8, 10, 2).reverse();
    if (custSettings.walkReluctance) {
      this.walkReluctanceInitVal = custSettings.walkReluctance && mapToSlider(custSettings.walkReluctance, this.walkReluctanceSliderValues);
    } else if (this.context.location.query.walkReluctance) {
      this.walkReluctanceInitVal = this.context.location.query.walkReluctance && mapToSlider(this.context.location.query.walkReluctance, this.walkReluctanceSliderValues);
    } else {
      this.walkReluctanceInitVal = defaultSettings.walkReluctance && mapToSlider(defaultSettings.walkReluctance, this.walkReluctanceSliderValues);
    }

    this.walkBoardCostSliderValues = CustomizeSearch.getSliderStepsArray(WALKBOARDCOST_MIN, WALKBOARDCOST_MAX, WALKBOARDCOST_DEFAULT).reverse().map(function (num) {
      return Math.round(num);
    });
    if (custSettings.walkBoardCost) {
      this.walkBoardCostInitVal = custSettings.walkBoardCost && mapToSlider(custSettings.walkBoardCost, this.walkBoardCostSliderValues);
    } else if (this.context.location.query.walkBoardCost) {
      this.walkBoardCostInitVal = this.context.location.query.walkBoardCost && mapToSlider(this.context.location.query.walkBoardCost, this.walkBoardCostSliderValues);
    } else {
      this.walkBoardCostInitVal = defaultSettings.walkBoardCost && mapToSlider(defaultSettings.walkBoardCost, this.walkBoardCostSliderValues);
    }

    this.transferMarginSliderValues = CustomizeSearch.getSliderStepsArray(60, 720, 180).map(function (num) {
      return Math.round(num);
    });
    if (custSettings.minTransferTime) {
      this.transferMarginInitVal = custSettings.minTransferTime && mapToSlider(custSettings.minTransferTime, this.transferMarginSliderValues);
    } else if (this.context.location.query.minTransferTime) {
      this.transferMarginInitVal = this.context.location.query.minTransferTime && mapToSlider(this.context.location.query.minTransferTime, this.transferMarginSliderValues);
    } else {
      this.transferMarginInitVal = defaultSettings.minTransferTime && mapToSlider(defaultSettings.minTransferTime, this.transferMarginSliderValues);
    }

    this.walkingSpeedSliderValues = CustomizeSearch.getSliderStepsArray(0.5, 3, 1.2);
    if (custSettings.walkSpeed) {
      this.walkingSpeedInitVal = custSettings.walkSpeed && mapToSlider(custSettings.walkSpeed, this.walkingSpeedSliderValues);
    } else if (this.context.location.query.walkSpeed) {
      this.walkingSpeedInitVal = this.context.location.query.walkSpeed && mapToSlider(this.context.location.query.walkSpeed, this.walkingSpeedSliderValues);
    } else {
      this.walkingSpeedInitVal = defaultSettings.walkSpeed && mapToSlider(defaultSettings.walkSpeed, this.walkingSpeedSliderValues);
    }

    // Set the states accordingly to send as Slider values
    this.setState({
      minTransferTime: this.transferMarginInitVal,
      walkBoardCost: this.walkBoardCostInitVal,
      walkReluctance: this.walkReluctanceInitVal,
      walkSpeed: this.walkingSpeedInitVal
    });
  };

  CustomizeSearch.prototype.getModes = function getModes() {
    if (this.context.location.query.modes) {
      return decodeURI(this.context.location.query.modes).split('?')[0].split(',');
    } else if (getCustomizedSettings().modes) {
      return getCustomizedSettings().modes;
    }
    return this.getDefaultModes();
  };

  CustomizeSearch.prototype.getMode = function getMode(mode) {
    return this.getModes().includes(mode.toUpperCase());
  };

  CustomizeSearch.prototype.updateSettings = function updateSettings(name, value, sliderValues) {
    var _extends2;

    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, (_extends2 = {}, _extends2[name] = value, _extends2))
      }),
      router: this.context.router
    });
    if (!(typeof sliderValues === 'undefined')) {
      var _setState;

      this.setState((_setState = {}, _setState[name] = value && mapToSlider(value, sliderValues), _setState));
    } else {
      var _setState2;

      this.setState((_setState2 = {}, _setState2[name] = value, _setState2));
    }
  };

  CustomizeSearch.prototype.toggleTransportMode = function toggleTransportMode(mode, otpMode) {
    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, {
          modes: xor(this.getModes(), [(otpMode || mode).toUpperCase()]).join(',')
        })
      }),
      router: this.context.router
    });
  };

  CustomizeSearch.prototype.toggleStreetMode = function toggleStreetMode(mode) {
    this.context.executeAction(route, {
      location: _extends({}, this.context.location, {
        query: _extends({}, this.context.location.query, {
          modes: without.apply(undefined, [this.getModes()].concat(Object.keys(this.context.config.streetModes).map(function (m) {
            return m.toUpperCase();
          }))).concat(mode.toUpperCase()).join(',')
        })
      }),
      router: this.context.router
    });
  };

  CustomizeSearch.prototype.render = function render() {
    var _this2 = this;

    var config = this.context.config;
    return React.createElement(
      'div',
      {
        'aria-hidden': !this.props.isOpen,
        className: 'customize-search-wrapper'
        // Clicks to the transparent area and close arrow should close the offcanvas
        , onClick: this.props.onToggleClick
      },
      React.createElement(
        'div',
        { className: 'offcanvas-close' },
        React.createElement(
          'div',
          { className: 'action-arrow', key: 'arrow' },
          React.createElement(Icon, { img: 'icon-icon_arrow-collapse--right' })
        )
      ),
      React.createElement(
        'div',
        {
          className: 'customize-search'
          // Clicks musn't bubble to prevent wrapper from closing the offcanvas
          , onClick: function onClick(e) {
            return e.stopPropagation();
          }
        },
        React.createElement(
          'section',
          { className: 'offcanvas-section' },
          React.createElement(
            'h4',
            null,
            React.createElement(FormattedMessage, { id: 'main-mode', defaultMessage: 'I\'m travelling by' })
          ),
          React.createElement(
            'div',
            { className: 'row btn-bar' },
            this.getStreetModesToggleButtons()
          )
        ),
        config.customizeSearch.walkReluctance.available ? this.getWalkReluctanceSlider() : null,
        config.customizeSearch.walkingSpeed.available ? this.getWalkSpeedSlider() : null,
        React.createElement(
          'section',
          { className: 'offcanvas-section' },
          React.createElement('hr', null)
        ),
        React.createElement(
          'section',
          { className: 'offcanvas-section' },
          React.createElement(
            'h4',
            null,
            React.createElement(FormattedMessage, { id: 'using-modes', defaultMessage: 'I want to travel by' })
          ),
          React.createElement(ModeFilter, {
            action: this.actions,
            buttonClass: 'mode-icon',
            selectedModes: Object.keys(config.transportModes).filter(function (mode) {
              return config.transportModes[mode].availableForSelection;
            }).filter(function (mode) {
              return _this2.getMode(mode);
            }).map(function (mode) {
              return mode.toUpperCase();
            })
          })
        ),
        config.customizeSearch.walkBoardCost.available ? this.getWalkBoardCostSlider() : null,
        config.customizeSearch.transferMargin.available ? this.getTransferMarginSlider() : null,
        config.customizeSearch.ticketOptions.available ? this.getTicketSelector() : null,
        config.customizeSearch.accessibility.available ? this.getAccessibilitySelector() : null,
        React.createElement(ViaPointSelector, {
          intermediatePlaces: this.context.location.query && this.context.location.query.intermediatePlaces,
          openSearchModal: this.openSearchModal,
          removeViaPoint: this.removeViaPoint
        }),
        React.createElement(SaveCustomizedSettingsButton, null),
        React.createElement(ResetCustomizedSettingsButton, { onReset: this.resetParameters })
      )
    );
  };

  return CustomizeSearch;
}(React.Component);

CustomizeSearch.contextTypes = {
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired
};
CustomizeSearch.propTypes = {
  isOpen: PropTypes.bool,
  onToggleClick: PropTypes.func.isRequired
};
CustomizeSearch.defaultProps = {
  isOpen: false };


export default CustomizeSearch;