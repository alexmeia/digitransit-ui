import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import MarkerPopupBottom from '../MarkerPopupBottom';
import CityBikeContent from '../../CityBikeContent';
import CityBikeCardContainer from '../../CityBikeCardContainer';
import { station as exampleStation } from '../../ExampleData';
import ComponentUsageExample from '../../ComponentUsageExample';

var CityBikePopup = function (_React$Component) {
  _inherits(CityBikePopup, _React$Component);

  function CityBikePopup() {
    _classCallCheck(this, CityBikePopup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CityBikePopup.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'card' },
      React.createElement(
        CityBikeCardContainer,
        { className: 'padding-small', station: this.props.station },
        React.createElement(CityBikeContent, {
          lang: this.context.getStore('PreferencesStore').getLanguage(),
          station: this.props.station
        })
      ),
      React.createElement(MarkerPopupBottom, {
        location: {
          address: this.props.station.name,
          lat: this.props.station.lat,
          lon: this.props.station.lon
        }
      })
    );
  };

  return CityBikePopup;
}(React.Component);

CityBikePopup.contextTypes = {
  getStore: PropTypes.func.isRequired
};
CityBikePopup.description = React.createElement(
  'div',
  null,
  React.createElement(
    'p',
    null,
    'Renders a citybike popup.'
  ),
  React.createElement(
    ComponentUsageExample,
    { description: '' },
    React.createElement(
      CityBikePopup,
      { context: 'context object here', station: exampleStation },
      'Im content of a citybike card'
    )
  )
);
CityBikePopup.displayName = 'CityBikePopup';
CityBikePopup.propTypes = {
  station: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
};


export default Relay.createContainer(CityBikePopup, {
  fragments: {
    station: function station() {
      return function () {
        return {
          children: [{
            fieldName: 'stationId',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'lat',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'lon',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'bikesAvailable',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'spacesAvailable',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'CityBikePopup_StationRelayQL',
          type: 'BikeRentalStation'
        };
      }();
    }
  }
});