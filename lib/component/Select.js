import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Select.getOptionTags = function getOptionTags(options) {
    return options.map(function (option) {
      return React.createElement(
        'option',
        { key: option.displayName + option.value, value: option.value },
        option.displayName
      );
    });
  };

  Select.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h4',
        null,
        this.props.headerText
      ),
      React.createElement(
        'select',
        {
          onChange: this.props.onSelectChange,
          value: this.props.selected
        },
        Select.getOptionTags(this.props.options)
      )
    );
  };

  return Select;
}(React.Component);

Select.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  selected: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired
};


export default Select;