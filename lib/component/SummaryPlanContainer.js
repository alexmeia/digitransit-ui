import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import ItinerarySummaryListContainer from './ItinerarySummaryListContainer';
import TimeNavigationButtons from './TimeNavigationButtons';
import { getRoutePath } from '../util/path';
import Loading from './Loading';

var SummaryPlanContainer = function (_React$Component) {
  _inherits(SummaryPlanContainer, _React$Component);

  function SummaryPlanContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, SummaryPlanContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onSelectActive = function (index) {
      if (_this.getActiveIndex() === index) {
        _this.onSelectImmediately(index);
      } else {
        _this.context.router.replace(_extends({}, _this.context.location, {
          state: { summaryPageSelected: index },
          pathname: getRoutePath(_this.props.params.from, _this.props.params.to)
        }));
      }
    }, _this.onSelectImmediately = function (index) {
      if (Number(_this.props.params.hash) === index) {
        if (_this.context.breakpoint === 'large') {
          _this.context.router.replace(_extends({}, _this.context.location, {
            pathname: getRoutePath(_this.props.params.from, _this.props.params.to)
          }));
        } else {
          _this.context.router.goBack();
        }
      } else {
        var newState = _extends({}, _this.context.location, {
          state: { summaryPageSelected: index }
        });
        var basePath = getRoutePath(_this.props.params.from, _this.props.params.to);
        var indexPath = getRoutePath(_this.props.params.from, _this.props.params.to) + '/' + index;

        if (_this.context.breakpoint === 'large') {
          newState.pathname = indexPath;
          _this.context.router.replace(newState);
        } else {
          newState.pathname = basePath;
          _this.context.router.replace(newState);
          newState.pathname = indexPath;
          _this.context.router.push(newState);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SummaryPlanContainer.prototype.getActiveIndex = function getActiveIndex() {
    if (this.context.location.state) {
      return this.context.location.state.summaryPageSelected || 0;
    }
    /*
     * If state does not exist, for example when accessing the summary
     * page by an external link, we check if an itinerary selection is
     * supplied in URL and make that the active selection.
     */
    var lastURLSegment = this.context.location.pathname.split('/').pop();
    return isNaN(lastURLSegment) ? 0 : Number(lastURLSegment);
  };

  SummaryPlanContainer.prototype.render = function render() {
    var currentTime = this.context.getStore('TimeStore').getCurrentTime().valueOf();
    var activeIndex = this.getActiveIndex();
    if (!this.props.itineraries && this.props.error === null) {
      return React.createElement(Loading, null);
    }
    return React.createElement(
      'div',
      { className: 'summary' },
      React.createElement(
        ItinerarySummaryListContainer,
        {
          searchTime: this.props.plan.date,
          itineraries: this.props.itineraries,
          currentTime: currentTime,
          onSelect: this.onSelectActive,
          onSelectImmediately: this.onSelectImmediately,
          activeIndex: activeIndex,
          open: Number(this.props.params.hash)
        },
        this.props.children
      ),
      React.createElement(TimeNavigationButtons, { itineraries: this.props.itineraries })
    );
  };

  return SummaryPlanContainer;
}(React.Component);

SummaryPlanContainer.propTypes = {
  plan: PropTypes.object.isRequired,
  itineraries: PropTypes.array.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
  params: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    hash: PropTypes.string
  }).isRequired
};
SummaryPlanContainer.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakpoint: PropTypes.string.isRequired
};


export default Relay.createContainer(SummaryPlanContainer, {
  fragments: {
    plan: function plan() {
      return function () {
        return {
          children: [{
            fieldName: 'date',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'SummaryPlanContainer_PlanRelayQL',
          type: 'Plan'
        };
      }();
    },
    itineraries: function itineraries() {
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
            fieldName: 'endTime',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            fieldName: 'startTime',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'SummaryPlanContainer_ItinerariesRelayQL',
          type: 'Itinerary'
        };
      }(ItinerarySummaryListContainer.getFragment('itineraries'));
    }
  }
});