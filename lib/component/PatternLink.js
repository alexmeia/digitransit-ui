import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import IconWithTail from './IconWithTail';
import SelectedIconWithTail from './SelectedIconWithTail';

function PatternLink(_ref) {
  var mode = _ref.mode,
      pattern = _ref.pattern,
      route = _ref.route,
      fullscreenMap = _ref.fullscreenMap,
      _ref$selected = _ref.selected,
      selected = _ref$selected === undefined ? false : _ref$selected;

  var imgName = 'icon-icon_' + mode + '-live';
  var icon = selected && React.createElement(SelectedIconWithTail, { img: imgName, fullscreenMap: fullscreenMap }) || React.createElement(IconWithTail, { desaturate: true, img: imgName, rotate: 180 });

  return React.createElement(
    Link,
    {
      to: '/linjat/' + route + '/pysakit/' + pattern,
      className: 'route-now-content'
    },
    icon
  );
}

PatternLink.propTypes = {
  mode: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  fullscreenMap: PropTypes.bool,
  selected: PropTypes.bool
};

export default PatternLink;