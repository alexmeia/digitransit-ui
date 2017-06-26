import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';

var TextAreaWithCounter = function TextAreaWithCounter(props) {
  var counter = void 0;

  if (props.showCounter) {
    counter = React.createElement(
      'p',
      { className: props.counterClassName },
      React.createElement(
        'b',
        null,
        props.charLeft + ' '
      ),
      React.createElement(FormattedMessage, { id: 'char-left', defaultMessage: 'characters' })
    );
  }

  return React.createElement(
    'span',
    null,
    counter,
    React.createElement('textarea', {
      maxLength: props.showCounter ? props.maxLength : false,
      className: props.areaClassName,
      rows: props.rows,
      onChange: props.handleChange
    })
  );
};

TextAreaWithCounter.propTypes = {
  showCounter: PropTypes.bool,
  counterClassName: PropTypes.string,
  maxLength: PropTypes.number,
  areaClassName: PropTypes.string,
  rows: PropTypes.number,
  charLeft: PropTypes.number,
  handleChange: PropTypes.func.isRequired
};

TextAreaWithCounter.defaultProps = {
  areaClassName: '',
  counterClassName: '',
  rows: 4
};

TextAreaWithCounter.displayName = 'TextAreaWithCounter';

TextAreaWithCounter.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a text area. Counter is optional'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(TextAreaWithCounter, { showCounter: true, maxLength: 200, handleChange: function handleChange() {}, charLeft: 200 })
    )
  );
};

TextAreaWithCounter.PropTypes = {
  showCounter: PropTypes.bool,
  maxLength: PropTypes.number,
  charLeft: PropTypes.number,
  handleChange: PropTypes.func,
  counterClassName: PropTypes.string,
  areaClassName: PropTypes.string
};

export default TextAreaWithCounter;