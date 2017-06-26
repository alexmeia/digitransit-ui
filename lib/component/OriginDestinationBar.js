import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import cx from 'classnames';
import without from 'lodash/without';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { storeEndpointIfNotCurrent, swapEndpoints } from '../action/EndpointActions';
import Icon from './Icon';
import OneTabSearchModal from './OneTabSearchModal';
import { getAllEndpointLayers } from '../util/searchUtils';

var OriginDestinationBar = function (_React$Component) {
  _inherits(OriginDestinationBar, _React$Component);

  function OriginDestinationBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, OriginDestinationBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getSearchModalState = function () {
      if (_this.context.location.state != null && _this.context.location.state.oneTabSearchModalOpen != null) {
        return _this.context.location.state.oneTabSearchModalOpen;
      }
      return false;
    }, _this.swapEndpoints = function () {
      _this.context.executeAction(swapEndpoints, {
        router: _this.context.router,
        location: _this.context.location
      });
    }, _this.openSearchModal = function (tab) {
      _this.context.router.push(_extends({}, _this.context.location, {
        state: _extends({}, _this.context.location.state, {
          oneTabSearchModalOpen: tab
        })
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  OriginDestinationBar.prototype.componentWillMount = function componentWillMount() {
    this.context.executeAction(storeEndpointIfNotCurrent, { target: 'origin', endpoint: this.props.origin });
    this.context.executeAction(storeEndpointIfNotCurrent, { target: 'destination', endpoint: this.props.destination });
  };

  OriginDestinationBar.prototype.render = function render() {
    var _this2 = this;

    var ownPosition = this.context.intl.formatMessage({
      id: 'own-position',
      defaultMessage: 'Your current location'
    });
    var tab = this.getSearchModalState();

    var searchLayers = getAllEndpointLayers();
    // don't offer current pos if it is already used as a route end point
    if (this.props.originIsCurrent || this.props.destinationIsCurrent) {
      searchLayers = without(searchLayers, 'CurrentPosition');
    }

    var originLabel = this.context.intl.formatMessage({ id: 'origin-label-change', defaultMessage: 'Change origin' });
    var destinationLabel = this.context.intl.formatMessage({ id: 'destination-label-change', defaultMessage: 'Change destination' });

    return React.createElement(
      'div',
      { className: cx('origin-destination-bar', this.props.className, 'flex-horizontal') },
      React.createElement(
        'button',
        {
          id: 'open-origin',
          'aria-label': originLabel,
          className: 'flex-grow noborder field-link',
          onClick: function onClick() {
            return _this2.openSearchModal('origin');
          }
        },
        React.createElement(
          'div',
          { className: 'from-link' },
          React.createElement(Icon, { img: 'icon-icon_mapMarker-point', className: 'itinerary-icon from' }),
          React.createElement(
            'span',
            { className: 'link-name' },
            this.props.originIsCurrent ? ownPosition : this.props.origin.address
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'switch', onClick: function onClick() {
            return _this2.swapEndpoints();
          } },
        React.createElement(
          'span',
          null,
          React.createElement(Icon, { img: 'icon-icon_direction-b' })
        )
      ),
      React.createElement(
        'button',
        {
          id: 'open-destination',
          'aria-label': destinationLabel,
          className: 'flex-grow noborder field-link',
          onClick: function onClick() {
            return _this2.openSearchModal('destination');
          }
        },
        React.createElement(
          'div',
          { className: 'to-link' },
          React.createElement(Icon, { img: 'icon-icon_mapMarker-point', className: 'itinerary-icon to' }),
          React.createElement(
            'span',
            { className: 'link-name' },
            this.props.destinationIsCurrent ? ownPosition : this.props.destination.address
          )
        )
      ),
      React.createElement(OneTabSearchModal, {
        layers: searchLayers,
        target: tab,
        responsive: true
      })
    );
  };

  return OriginDestinationBar;
}(React.Component);

OriginDestinationBar.propTypes = {
  className: PropTypes.string,
  origin: PropTypes.object,
  destination: PropTypes.object,
  originIsCurrent: PropTypes.bool,
  destinationIsCurrent: PropTypes.bool
};
OriginDestinationBar.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};


export default connectToStores(OriginDestinationBar, ['EndpointStore'], function (context) {
  return {
    originIsCurrent: context.getStore('EndpointStore').getOrigin().useCurrentPosition,
    destinationIsCurrent: context.getStore('EndpointStore').getDestination().useCurrentPosition
  };
});