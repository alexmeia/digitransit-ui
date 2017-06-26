import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

var ExternalLinkDecoration = function ExternalLinkDecoration(_ref) {
  var className = _ref.className;
  return React.createElement(
    'svg',
    { viewBox: '0 0 40 40', className: cx('icon', 'external-link-decoration', className) },
    React.createElement('use', {
      className: 'external-link-icon-outer',
      xlinkHref: '#icon-icon_external_link_arrow'
    }),
    React.createElement('use', {
      className: 'external-link-icon',
      xlinkHref: '#icon-icon_external_link_arrow',
      transform: 'scale(0.9,0.9)',
      y: '0',
      x: '4'
    })
  );
};

ExternalLinkDecoration.description = function () {
  return React.createElement(
    ComponentUsageExample,
    { description: 'Bus with caution' },
    React.createElement(
      'div',
      { className: 'external-top-bar', style: { textAlign: 'center', width: 50, height: 20, backgroundColor: '#ccc' } },
      React.createElement(ExternalLinkDecoration, null)
    )
  );
};

ExternalLinkDecoration.displayName = 'IconWithCaution';

ExternalLinkDecoration.propTypes = {
  className: PropTypes.string
};

export default ExternalLinkDecoration;