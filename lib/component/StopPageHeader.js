import PropTypes from 'prop-types';
import React from 'react';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
// import { FormattedMessage } from 'react-intl';

import StopCardHeaderContainer from './StopCardHeaderContainer';
// import { addFavouriteStop } from '../action/FavouriteActions';
import ComponentUsageExample from './ComponentUsageExample';
// import Labeled from './Labeled';
// import InfoIcon from './InfoIcon';
// import Favourite from './Favourite';

var StopPageHeader = compose(getContext({ executeAction: PropTypes.func.isRequired,
  breakpoint: PropTypes.string.isRequired }), mapProps(function (props) {
  return {
    stop: props.stop,
    className: 'stop-page header',
    headingStyle: 'h3',
    icons: [
      // TODO: Re-add when done
      /* <Labeled
        label={<FormattedMessage id="extra-info" defaultMessage="Further information" />}
        showLabel={props.breakpoint === 'large'}
      >
        <InfoIcon stop={props.stop} />
      </Labeled>,
      <Favourite
        favourite={props.favourite}
        addFavourite={(e) => {
          e.stopPropagation();
          props.executeAction(addFavouriteStop, props.params.stopId);
        }}
      />, */
    ]
  };
}))(StopCardHeaderContainer);

var exampleStop = {
  code: '4611',
  gtfsId: 'HSL:1541157',
  name: 'Kaivonkatsojanpuisto',
  desc: 'Kaivonkatsojantie'
};

StopPageHeader.displayName = 'StopPageHeader';

StopPageHeader.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'basic' },
      React.createElement(StopPageHeader, { stop: exampleStop, params: { stopId: 123 } })
    )
  );
};

export default StopPageHeader;