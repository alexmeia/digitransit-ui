import PropTypes from 'prop-types';
import React from 'react';

var Application = function Application(_ref) {
  var fonts = _ref.fonts,
      svgSprite = _ref.svgSprite,
      css = _ref.css,
      content = _ref.content,
      polyfill = _ref.polyfill,
      state = _ref.state,
      locale = _ref.locale,
      scripts = _ref.scripts,
      relayData = _ref.relayData,
      head = _ref.head;
  return React.createElement(
    'html',
    { lang: locale },
    React.createElement(
      'head',
      null,
      head !== null ? head.title.toComponent() : false,
      head !== null ? head.meta.toComponent() : false,
      head !== null ? head.link.toComponent() : false,
      React.createElement('link', { rel: 'stylesheet', type: 'text/css', href: fonts }),
      css
    ),
    React.createElement(
      'body',
      null,
      React.createElement('script', { dangerouslySetInnerHTML: { __html: polyfill } }),
      svgSprite,
      React.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: content } }),
      React.createElement('script', { dangerouslySetInnerHTML: { __html: state } }),
      React.createElement('script', {
        dangerouslySetInnerHTML: { __html: JSON.stringify(relayData) },
        type: 'application/json',
        id: 'relayData'
      }),
      scripts
    )
  );
};

Application.propTypes = {
  fonts: PropTypes.string,
  svgSprite: PropTypes.node,
  css: PropTypes.node,
  content: PropTypes.string,
  polyfill: PropTypes.string,
  state: PropTypes.string,
  locale: PropTypes.string,
  scripts: PropTypes.node,
  relayData: PropTypes.any,
  head: PropTypes.object.isRequired
};

export default Application;