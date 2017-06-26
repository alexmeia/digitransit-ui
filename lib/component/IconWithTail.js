import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

var IconWithTail = function IconWithTail(_ref) {
  var className = _ref.className,
      id = _ref.id,
      img = _ref.img,
      rotate = _ref.rotate,
      children = _ref.children,
      _ref$desaturate = _ref.desaturate,
      desaturate = _ref$desaturate === undefined ? false : _ref$desaturate,
      _ref$scrollIntoView = _ref.scrollIntoView,
      scrollIntoView = _ref$scrollIntoView === undefined ? false : _ref$scrollIntoView;
  return React.createElement(
    'span',
    null,
    React.createElement(
      'svg',
      {
        id: id,
        viewBox: '0 0 80 80',
        className: cx('icon', 'tail-icon', className),
        ref: function ref(el) {
          return scrollIntoView && el && el.scrollIntoView();
        }
      },
      rotate !== undefined && React.createElement('use', {
        filter: desaturate && 'url(#desaturate)',
        xlinkHref: '#icon-icon_vehicle-live-shadow',
        transform: 'rotate(' + rotate + ' 40 40)'
      }),
      React.createElement('use', {
        filter: desaturate && 'url(#desaturate)', xlinkHref: '#' + img,
        transform: 'translate(26 26) scale(0.35)  '
      }),
      children
    )
  );
};

/** Leaflet needs html as string */
export var asString = function asString(props) {
  var element = window.document.createElement('div');
  ReactDOM.render(React.createElement(IconWithTail, props), element);
  var html = element.innerHTML;
  ReactDOM.unmountComponentAtNode(element);
  return html;
};

IconWithTail.displayName = 'IconWithTail';

IconWithTail.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Shows an icon from the SVG sprite and adds blue \u2018tail\u2019.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Rotate 0' },
      React.createElement(IconWithTail, { img: 'icon-icon_bus-live', rotate: 0 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Rotate 90' },
      React.createElement(IconWithTail, { img: 'icon-icon_bus-live', rotate: 90 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Rotate 90, desaturated' },
      React.createElement(IconWithTail, { desaturate: true, img: 'icon-icon_bus-live', rotate: 90 })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'no tail' },
      React.createElement(IconWithTail, { desaturate: true, img: 'icon-icon_bus-live' })
    )
  );
};

IconWithTail.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  children: PropTypes.element,
  desaturate: PropTypes.bool,
  scrollIntoView: PropTypes.bool
};

export default IconWithTail;