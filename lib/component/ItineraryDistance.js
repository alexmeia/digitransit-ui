var _this = this;

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

var Distance = function Distance(props) {
  var approxDistance = void 0;

  if (_this.props.distance > 0) {
    approxDistance = Math.round(props.distance / 50) * 50;

    if (approxDistance > 50) {
      return React.createElement(FormattedMessage, {
        id: 'approx-meters',
        values: { approxDistance: approxDistance },
        defaultMessage: '{approxDistance} m'
      });
    }
  }

  return null;
};

Distance.propTypes = {
  distance: PropTypes.number.isRequired
};

export default Distance;