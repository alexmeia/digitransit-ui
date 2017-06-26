import PropTypes from 'prop-types';
import React from 'react';
import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import ExternalLinkDecoration from './ExternalLinkDecoration';

var ExternalLink = function ExternalLink(_ref) {
  var name = _ref.name,
      children = _ref.children,
      href = _ref.href,
      className = _ref.className;
  return (name || children !== undefined) && React.createElement(
    'span',
    { className: className },
    React.createElement(
      'span',
      { className: 'external-link-container' },
      React.createElement(
        'a',
        { onClick: function onClick(e) {
            return e.stopPropagation();
          }, className: 'external-link', href: href },
        name || children
      ),
      React.createElement(ExternalLinkDecoration, null)
    )
  );
};

ExternalLink.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string
};

ExternalLink.defaultProps = {
  className: ''
};

ExternalLink.displayName = 'ExternalLink';

ExternalLink.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Link to external url'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with text only' },
      React.createElement(
        'span',
        { style: { background: '#007ac9', padding: '10px 10px 10px 10px' } },
        React.createElement(ExternalLink, { className: 'external-top-bar', name: 'HSL.fi', href: 'http://www.hsl.fi' })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with more complex content' },
      React.createElement(
        'span',
        { style: { background: '#ccc', padding: '10px 10px 10px 10px' } },
        React.createElement(
          ExternalLink,
          { className: 'action-bar', href: 'http://print.me.invalid' },
          React.createElement(Icon, { img: 'icon-icon_print' }),
          ' Print'
        )
      )
    )
  );
};

export default ExternalLink;