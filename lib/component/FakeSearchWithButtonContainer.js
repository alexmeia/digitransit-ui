import PropTypes from 'prop-types';
import React from 'react';
import getContext from 'recompose/getContext';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import FakeSearchBar from './FakeSearchBar';

export var FakeSearchWithButton = function FakeSearchWithButton(_ref) {
  var fakeSearchBar = _ref.fakeSearchBar,
      onClick = _ref.onClick,
      breakpoint = _ref.breakpoint;
  return React.createElement(
    'div',
    { className: 'row search-form bp-' + breakpoint },
    React.createElement(
      'div',
      { className: 'small-12 columns search-form-map-overlay' },
      React.createElement(
        'button',
        { title: 'haku', tabIndex: '0', onClick: onClick, className: 'noborder search-button flex-horisontal' },
        React.createElement(
          'div',
          { className: 'flex-grow row collapse postfix-radius' },
          React.createElement(
            'div',
            { className: 'small-11 columns' },
            fakeSearchBar
          ),
          React.createElement(
            'div',
            { className: 'small-1 columns' },
            React.createElement(
              'span',
              { className: 'postfix search cursor-pointer button-icon' },
              React.createElement(Icon, { img: 'icon-icon_search' })
            )
          )
        )
      )
    )
  );
};

FakeSearchWithButton.propTypes = {
  fakeSearchBar: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  breakpoint: PropTypes.string
};

FakeSearchWithButton.defaultProps = {
  breakpoint: 'medium'
};

FakeSearchWithButton.displayName = 'FakeSearchWithButton';

FakeSearchWithButton.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Visual search component that acts as a link to search dialog.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Centered fake search field with search icon button' },
      React.createElement(FakeSearchWithButton, { fakeSearchBar: React.createElement(FakeSearchBar, { placeholder: 'Enter address' }) })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Centered fake search field with search icon button' },
      React.createElement(FakeSearchWithButton, {
        breakpoint: 'large', fakeSearchBar: React.createElement(FakeSearchBar, { placeholder: 'Enter address' })
      })
    )
  );
};

export default getContext({ breakpoint: PropTypes.string.isRequired })(FakeSearchWithButton);