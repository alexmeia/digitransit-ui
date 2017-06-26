import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape, locationShape } from 'react-router';
import getContext from 'recompose/getContext';
import { clearDestination } from '../action/EndpointActions';
import LazilyLoad, { importLazy } from './LazilyLoad';
import FrontPagePanelLarge from './FrontPagePanelLarge';
import FrontPagePanelSmall from './FrontPagePanelSmall';
import MapWithTracking from '../component/map/MapWithTracking';
import SearchMainContainer from './SearchMainContainer';
import PageFooter from './PageFooter';

var feedbackPanelMudules = { Panel: function Panel() {
    return importLazy(System.import('./FeedbackPanel'));
  } };

var feedbackPanel = React.createElement(
  LazilyLoad,
  { modules: feedbackPanelMudules },
  function (_ref) {
    var Panel = _ref.Panel;
    return React.createElement(Panel, null);
  }
);

var messageBarModules = { Bar: function Bar() {
    return importLazy(System.import('./MessageBar'));
  } };

var messageBar = React.createElement(
  LazilyLoad,
  { modules: messageBarModules },
  function (_ref2) {
    var Bar = _ref2.Bar;
    return React.createElement(Bar, null);
  }
);

var IndexPage = function (_React$Component) {
  _inherits(IndexPage, _React$Component);

  function IndexPage() {
    var _temp, _this, _ret;

    _classCallCheck(this, IndexPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  IndexPage.prototype.componentDidMount = function componentDidMount() {
    var search = this.context.location.search;

    if (search && search.indexOf('citybikes') >= -1) {
      this.context.config.transportModes.citybike.defaultValue = true;
    }

    // auto select nearby tab if none selected and bp=large
    if (this.props.breakpoint === 'large' && this.getSelectedTab() === undefined) {
      this.clickNearby();
    }
  };

  // used only in mobile with fullscreen tabs


  IndexPage.prototype.render = function render() {
    var selectedMainTab = this.getSelectedTab();
    var selectedSearchTab = this.context.location.state && this.context.location.state.selectedTab ? this.context.location.state.selectedTab : 'destination';
    var searchModalIsOpen = this.context.location.state ? Boolean(this.context.location.state.searchModalIsOpen) : false;
    return this.props.breakpoint === 'large' ? React.createElement(
      'div',
      { className: 'front-page flex-vertical fullscreen bp-' + this.props.breakpoint },
      messageBar,
      React.createElement(
        MapWithTracking,
        {
          breakpoint: this.props.breakpoint,
          showStops: true,
          showScaleBar: true,
          searchModalIsOpen: searchModalIsOpen,
          selectedTab: selectedSearchTab,
          tab: selectedMainTab
        },
        React.createElement(SearchMainContainer, {
          searchModalIsOpen: searchModalIsOpen,
          selectedTab: selectedSearchTab
        }),
        React.createElement(
          'div',
          { key: 'foo', className: 'fpccontainer' },
          React.createElement(
            FrontPagePanelLarge,
            {
              selectedPanel: selectedMainTab,
              nearbyClicked: this.clickNearby,
              favouritesClicked: this.clickFavourites
            },
            this.props.content
          )
        )
      ),
      React.createElement(
        'div',
        { id: 'page-footer-container' },
        React.createElement(PageFooter, {
          content: this.context.config.footer && this.context.config.footer.content || []
        })
      ),
      feedbackPanel
    ) : React.createElement(
      'div',
      { className: 'front-page flex-vertical fullscreen bp-' + this.props.breakpoint },
      React.createElement(
        'div',
        { className: 'flex-grow map-container' },
        React.createElement(
          MapWithTracking,
          {
            breakpoint: this.props.breakpoint,
            showStops: true,
            showScaleBar: true,
            searchModalIsOpen: searchModalIsOpen,
            selectedTab: selectedSearchTab
          },
          messageBar,
          React.createElement(SearchMainContainer, {
            searchModalIsOpen: searchModalIsOpen,
            selectedTab: selectedSearchTab
          })
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          FrontPagePanelSmall,
          {
            selectedPanel: selectedMainTab,
            nearbyClicked: this.clickNearby,
            favouritesClicked: this.clickFavourites,
            closePanel: this.closeTab
          },
          this.props.content
        ),
        feedbackPanel
      )
    );
  };

  return IndexPage;
}(React.Component);

IndexPage.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  location: locationShape.isRequired,
  router: routerShape.isRequired,
  piwik: PropTypes.object,
  config: PropTypes.object.isRequired
};
IndexPage.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  content: PropTypes.node,
  routes: PropTypes.array
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillMount = function () {
    _this2.resetToCleanState();
  };

  this.componentWillReceiveProps = function (nextProps) {
    var frombp = _this2.props.breakpoint;
    var tobp = nextProps.breakpoint;

    if (frombp === tobp) {
      return;
    }

    // auto close any tab on bp change from large
    if (_this2.getSelectedTab() !== undefined && frombp === 'large') {
      _this2.closeTab();
    } else if (_this2.getSelectedTab() === undefined && tobp === 'large') {
      // auto open nearby tab on bp change to large
      _this2.clickNearby();
    }
  };

  this.getSelectedTab = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;

    if (props.routes && props.routes.length > 0) {
      var routePath = props.routes[props.routes.length - 1].path;

      if (routePath === 'suosikit') {
        return 2;
      } else if (routePath === 'lahellasi') {
        return 1;
      }
    }

    return undefined;
  };

  this.resetToCleanState = function () {
    _this2.context.executeAction(clearDestination);
  };

  this.trackEvent = function () {
    if (_typeof(_this2.context.piwik) === 'object') {
      var _context$piwik;

      (_context$piwik = _this2.context.piwik).trackEvent.apply(_context$piwik, arguments);
    }
  };

  this.clickNearby = function () {
    // tab click logic is different in large vs the rest!
    if (_this2.props.breakpoint !== 'large') {
      var selected = _this2.getSelectedTab();
      if (selected === 1) {
        _this2.closeTab();
      } else {
        _this2.openNearby(selected === 2);
      }
      _this2.trackEvent('Front page tabs', 'Nearby', selected === 1 ? 'close' : 'open');
    } else {
      _this2.openNearby(true);
      _this2.trackEvent('Front page tabs', 'Nearby', 'open');
    }
  };

  this.clickFavourites = function () {
    // tab click logic is different in large vs the rest!
    if (_this2.props.breakpoint !== 'large') {
      var selected = _this2.getSelectedTab();
      if (selected === 2) {
        _this2.closeTab();
      } else {
        _this2.openFavourites(selected === 1);
      }
      _this2.trackEvent('Front page tabs', 'Favourites', selected === 2 ? 'close' : 'open');
    } else {
      _this2.openFavourites(true);
      _this2.trackEvent('Front page tabs', 'Favourites', 'open');
    }
  };

  this.openFavourites = function (replace) {
    if (replace) {
      _this2.context.router.replace('/suosikit');
    } else {
      _this2.context.router.push('/suosikit');
    }
  };

  this.openNearby = function (replace) {
    if (replace) {
      _this2.context.router.replace('/lahellasi');
    } else {
      _this2.context.router.push('/lahellasi');
    }
  };

  this.closeTab = function () {
    if (_this2.context.location && _this2.context.location.action === 'PUSH') {
      // entered the tab from the index page, not by a direct url
      _this2.context.router.goBack();
    } else {
      _this2.context.router.replace('/');
    }
  };
};

var IndexPageWithBreakpoint = getContext({ breakpoint: PropTypes.string.isRequired })(IndexPage);

export default IndexPageWithBreakpoint;