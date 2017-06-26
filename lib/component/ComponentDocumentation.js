import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import isFunction from 'lodash/isFunction';

/*
  Displays a card with the information of the given component as prop
  It renders the components propTypes and description

  usage:
  <ComponentDocumentation component=YourComponent>
  </ComponentDocumentation>
*/

var getName = function getName(component) {
  return component.displayName || component.name || 'Unknown';
};

var getDescription = function getDescription(component, onlyComponent) {
  if (isFunction(component.description)) return component.description(onlyComponent);else if (component.description) return component.description;
  return React.createElement(
    'div',
    null,
    'Component ',
    getName(component),
    ' has no description'
  );
};

var ComponentDocumentation = function (_React$Component) {
  _inherits(ComponentDocumentation, _React$Component);

  function ComponentDocumentation() {
    var _temp, _this, _ret;

    _classCallCheck(this, ComponentDocumentation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getChildContext = function getChildContext() {
      return {
        componentOnly: this.props.mode === 'examples-only'
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ComponentDocumentation.prototype.render = function render() {
    var _this2 = this;

    if (this.props.mode === 'examples-only') {
      return React.createElement(
        'div',
        { className: 'component-example-container' },
        getDescription(this.props.component)
      );
    }
    return React.createElement(
      'div',
      {
        className: 'card padding-normal',
        id: getName(this.props.component)
      },
      React.createElement(
        'h2',
        null,
        getName(this.props.component)
      ),
      React.createElement(
        'div',
        null,
        getDescription(this.props.component),
        ' '
      ),
      React.createElement(
        'p',
        null,
        'Required props:'
      ),
      React.createElement(
        'ul',
        null,
        Object.keys(this.props.component.propTypes || {}).filter(function (key) {
          return !_this2.props.component.propTypes[key].isRequired;
        }).map(function (key) {
          return React.createElement(
            'li',
            { key: key },
            key
          );
        })
      ),
      React.createElement(
        'p',
        null,
        'Optional props:'
      ),
      React.createElement(
        'ul',
        null,
        Object.keys(this.props.component.propTypes || {}).filter(function (key) {
          return _this2.props.component.propTypes[key].isRequired;
        }).map(function (key) {
          return React.createElement(
            'li',
            { key: key },
            key
          );
        })
      ),
      React.createElement(
        'p',
        null,
        'Default props:'
      ),
      React.createElement(
        'ul',
        null,
        Object.keys(this.props.component.defaultProps || {}).map(function (key) {
          return React.createElement(
            'li',
            { key: key },
            key,
            '=',
            JSON.stringify(_this2.props.component.defaultProps[key])
          );
        })
      ),
      this.props.children
    );
  };

  return ComponentDocumentation;
}(React.Component);

ComponentDocumentation.childContextTypes = {
  componentOnly: PropTypes.bool
};
export default ComponentDocumentation;

ComponentDocumentation.propTypes = {
  component: PropTypes.oneOfType([PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    propTypes: PropTypes.object
  }).isRequired, PropTypes.func.isRequired]),
  mode: PropTypes.string,
  children: PropTypes.node
};