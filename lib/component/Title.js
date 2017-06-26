import PropTypes from 'prop-types';
import React from 'react';

var TitleComponent = function TitleComponent(props, _ref) {
  var title = _ref.config.title;
  return React.createElement(
    'span',
    null,
    title
  );
};

TitleComponent.contextTypes = { config: PropTypes.object.isRequired };

export default TitleComponent;