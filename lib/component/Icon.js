import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

function Icon(props) {
  return React.createElement(
    'span',
    { 'aria-hidden': true },
    React.createElement(
      'svg',
      { id: props.id, viewBox: props.viewBox, className: cx('icon', props.className) },
      React.createElement('use', { xlinkHref: '#' + props.img })
    )
  );
}

Icon.propTypes = {
  id: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired
};

Icon.defaultProps = {
  viewBox: '0 0 40 40'
};

Icon.asString = function (img, className, id) {
  return '\n  <span>\n    <svg' + (id ? ' id=' + id : '') + ' viewBox="0 0 40 40" class="' + cx('icon', className) + '">\n      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + img + '"/>\n    </svg>\n  </span>\n';
};

Icon.displayName = 'Icon';
Icon.description = 'Shows an icon from the SVG sprite';
export default Icon;