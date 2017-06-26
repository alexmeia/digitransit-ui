import PropTypes from 'prop-types';
import React from 'react';

import ExternalLink from './ExternalLink';

function AgencyInfo(_ref) {
  var agencyName = _ref.agencyName,
      url = _ref.url;

  if (agencyName && url) {
    var link = url.indexOf('://') === -1 ? '//' + url : url;

    return React.createElement(
      'div',
      { className: 'agency-link-container' },
      React.createElement(
        ExternalLink,
        {
          className: 'agency-link',
          href: link
        },
        React.createElement(
          'div',
          { className: agencyName.length > 30 ? 'overflow-fade' : '' },
          agencyName
        )
      )
    );
  }
  return null;
}

AgencyInfo.propTypes = {
  agencyName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default AgencyInfo;