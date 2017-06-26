import PropTypes from 'prop-types';
import React from 'react';

export default function MobileView(_ref) {
  var header = _ref.header,
      map = _ref.map,
      content = _ref.content;

  return React.createElement(
    'div',
    { className: 'mobile' },
    header,
    map,
    content
  );
}

MobileView.propTypes = {
  header: PropTypes.node,
  map: PropTypes.node,
  content: PropTypes.node
};