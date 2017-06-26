import PropTypes from 'prop-types';
import React from 'react';

var heading = function heading(e) {
  if (e.type === 'heading') {
    return React.createElement(
      'h2',
      null,
      e.content
    );
  }
  return null;
};

var span = function span(e) {
  if (e.type === 'text') {
    return e.content;
  }
  return null;
};

var a = function a(e) {
  if (e.type === 'a') {
    return React.createElement(
      'a',
      { href: e.href },
      e.content
    );
  }
  return null;
};

var elements = [heading, span, a];

var renderContent = function renderContent(content) {
  return content.map(function (fragment) {
    return elements.map(function (t) {
      return t(fragment);
    });
  });
};

/*
 * Renders message
 */
var MessageBarMessage = function MessageBarMessage(_ref) {
  var key = _ref.key,
      content = _ref.content,
      onMaximize = _ref.onMaximize;
  return React.createElement(
    'div',
    { tabIndex: 0, role: 'banner', key: key, onClick: onMaximize },
    renderContent(content)
  );
};

MessageBarMessage.propTypes = {
  key: PropTypes.string.isRequired,
  content: PropTypes.array,
  onMaximize: PropTypes.func.isRequired
};

export default MessageBarMessage;