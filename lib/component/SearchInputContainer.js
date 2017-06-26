import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import find from 'lodash/find';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { FormattedMessage, intlShape } from 'react-intl';
import ReactAutowhatever from 'react-autowhatever';
import NetworkError from './NetworkError';
import SuggestionItem from './SuggestionItem';
import CurrentPositionSuggestionItem from './CurrentPositionSuggestionItem';
import { executeSearch, executeSearchImmediate } from '../util/searchUtils';
import { getLabel, getGTFSId, isStop } from '../util/suggestionUtils';
import { saveSearch } from '../action/SearchActions';
import { isBrowser } from '../util/browser';
import Loading from './Loading';

var L = isBrowser ? require('leaflet') : null;

var SearchInputContainer = function (_Component) {
  _inherits(SearchInputContainer, _Component);

  function SearchInputContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, SearchInputContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      focusedItemIndex: 0,
      suggestions: [],
      type: 'endpoint'
    }, _this.onSearchChange = function (event) {
      var inProgress = event === null;
      var results = inProgress ? [] : event;
      if (inProgress && _this.state.searchInProgress) {
        return;
      }
      _this.setState({
        searchInProgress: inProgress,
        suggestions: results,
        focusedItemIndex: 0
      }, function () {
        return _this.focusItem(0);
      });
    }, _this.handleOnMouseEnter = function (event, eventProps) {
      if (eventProps.itemIndex != null) {
        if (eventProps.itemIndex !== _this.state.focusedItemIndex) {
          _this.setState({
            focusedItemIndex: eventProps.itemIndex
          });
        }
        event.preventDefault();
      }
    }, _this.focus = function () {
      if (_this.getInput() != null) {
        _this.getInput().focus();
      }
    }, _this.handleOnKeyDown = function (event, eventProps) {
      if (event.keyCode === 13 && get(_this.getItems(), 'results.length', 0) > 0) {
        // enter selects current
        _this.currentItemSelected();
        _this.blur();
        event.preventDefault();
      }

      if (event.keyCode === 27) {
        // esc clears
        if (_this.state.value === '' || _this.state.value === null) {
          // or closes if input is empty
          _this.props.close();
        } else {
          _this.handleUpdateInputNow({
            target: {
              value: ''
            }
          });
          return;
        }

        event.preventDefault();
      }

      if (eventProps.newFocusedItemIndex != null) {
        _this.setState({
          focusedItemIndex: eventProps.newFocusedItemIndex
        }, function () {
          return _this.focusItem(eventProps.newFocusedItemIndex);
        });

        event.preventDefault();
      }
    }, _this.handleOnMouseDown = function (event, eventProps) {
      if (eventProps.itemIndex != null) {
        _this.setState({
          focusedItemIndex: eventProps.itemIndex
        }, _this.currentItemSelected);

        _this.blur();
      }
    }, _this.handleOnTouchStart = function () {
      _this.blur();
    }, _this.handleUpdateInputNow = function (event) {
      var input = event.target.value;

      if (input === _this.state.value) {
        return;
      }

      _this.setState({
        value: input
      });

      _this.executeSearchWithParams(input);
    }, _this.executeSearchWithParams = function (newinput) {
      var terms = typeof newinput === 'string' ? newinput : _this.state.value;
      executeSearch(_this.context.getStore, {
        input: terms,
        type: _this.props.type,
        layers: _this.props.layers,
        config: _this.context.config
      }, _this.onSearchChange);
    }, _this.currentItemSelected = function () {
      if (_this.state.focusedItemIndex >= 0 && get(_this.getItems(), 'results.length', 0) > 0) {
        var item = _this.getItems().results[_this.state.focusedItemIndex];
        var name = void 0;

        if (item.type === 'CurrentLocation') {
          var state = _this.context.getStore('PositionStore').getLocationState();
          item.geometry = { coordinates: [state.lon, state.lat] };
          name = _this.context.intl.formatMessage({ id: 'own-position', defaultMessage: 'Your current location' });
        } else {
          // type is destination unless timetable of route was clicked
          var type = 'endpoint';
          switch (item.type) {
            case 'Stop':
              // stop can be timetable or
              if (item.timetableClicked === true) {
                type = 'search';
              }
              break;
            case 'Route':
              type = 'search';
              break;
            default:
          }

          _this.context.executeAction(saveSearch, { item: item, type: type });
        }

        name = item.properties.label || getLabel(item.properties, true).join(', ');
        var clone = cloneDeep(item);
        if (isStop(get(clone, 'properties')) && clone.timetableClicked === true) {
          clone.properties.link = '/pysakit/' + getGTFSId(clone.properties);
        }

        _this.props.onSuggestionSelected(name, clone);
      }
    }, _this.renderSimpleWrapper = function (_ref) {
      var children = _ref.children,
          rest = _objectWithoutProperties(_ref, ['children']);

      return React.createElement(
        'div',
        rest,
        _this.renderItemsOrEmpty(children)
      );
    }, _this.renderItem = function (item) {
      // eslint-disable-line class-methods-use-this
      if (item.properties.layer === 'currentPosition') {
        return React.createElement(CurrentPositionSuggestionItem, {
          ref: item.name,
          item: item
        });
      }
      return React.createElement(SuggestionItem, {
        doNotShowLinkToStop: _this.props.type !== 'all',
        ref: item.name,
        item: item,
        useTransportIconsconfig: _this.context.config.search.suggestions.useTransportIcons
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SearchInputContainer.prototype.componentDidMount = function componentDidMount() {
    executeSearchImmediate(this.context.getStore, {
      input: '',
      type: this.props.type,
      layers: this.props.layers,
      config: this.context.config
    }, this.onSearchChange);
  };

  /*
   * event: [{type: <type>, term:<term>, error: error}]
   */


  /**
   * Returns object containing results for specified type of undefined if no such results exist
   */
  SearchInputContainer.prototype.getItems = function getItems(typeParam) {
    var type = typeParam || this.props.type;

    var endpoints = find(this.state.suggestions, ['type', 'endpoint']);

    if (type === 'all') {
      var all = {};
      all.results = get(endpoints, 'results', []);
      var search = find(this.state.suggestions, ['type', 'search']);
      all.results = all.results.concat(get(search, 'results', []));
      all.error = all.results.length === 0 && (get(endpoints, 'error') || get(search, 'error'));
      return all;
    }

    return endpoints;
  };

  SearchInputContainer.prototype.getInput = function getInput() {
    return get(this, 'autowhatever.input', null);
  };

  SearchInputContainer.prototype.focusItem = function focusItem(i) {
    // eslint-disable-line class-methods-use-this
    if (L.Browser.touch) {
      return;
    }
    var domElement = document.getElementById('react-autowhatever-suggest--item-' + i);
    if (domElement != null) {
      domElement.scrollIntoView(false);
    }
  };

  SearchInputContainer.prototype.blur = function blur() {
    // hide safari keyboard
    if (this.getInput() != null) {
      this.getInput().blur();
    }
  };

  SearchInputContainer.prototype.renderItemsOrEmpty = function renderItemsOrEmpty(children) {
    var _this2 = this;

    var elem = void 0;

    var endpointResultCount = get(this.getItems('endpoint'), 'results.length', 0);
    var searchResultCount = get(this.getItems('search'), 'results.length', 0);

    if (get(this.getItems(), 'error', false)) {
      return React.createElement(NetworkError, { retry: function retry() {
          return _this2.executeSearchWithParams();
        } });
    } else if (children !== null) {
      // we have results
      return children;
    } else if (this.state.searchInProgress) {
      // Loading in progress
      elem = React.createElement(Loading, null);
    } else if (endpointResultCount === 0 && searchResultCount === 0) {
      // No results
      elem = React.createElement(FormattedMessage, { id: 'search-no-results', defaultMessage: 'No location' });
    } else if (children === null && endpointResultCount > 0) {
      // Complex search, Results in destination tab
      elem = React.createElement(FormattedMessage, { id: 'search-destination-results-but-no-search', defaultMessage: '\'View results in the adjacent \u201CDestination\u201D tab' });
    } else if (children === null && searchResultCount > 0) {
      // Complex search, Results in search tab
      elem = React.createElement(FormattedMessage, { id: 'search-search-results-but-no-destination', defaultMessage: 'View results in the adjacent \u201CAbout the route or stop\u201D tab' });
    } else {
      throw Error('Rendering results is not working correctly');
    }

    return React.createElement(
      'ul',
      { className: 'search-no-results' },
      React.createElement(
        'li',
        null,
        elem
      )
    );
  };

  SearchInputContainer.prototype.render = function render() {
    var _this3 = this;

    var inputValue = (this.state.value != null && typeof this.state.value === 'string' && this.state.value.length >= 0 ? this.state.value : null) || '';

    return React.createElement(
      'div',
      null,
      React.createElement(ReactAutowhatever, {
        ref: function ref(c) {
          _this3.autowhatever = c;
        },
        className: this.props.className,
        id: 'suggest',
        items: get(this.getItems(), 'results', []),
        renderItem: this.renderItem,
        renderItemsContainer: this.props.type === 'all' ? this.renderMultiWrapper : this.renderSimpleWrapper,
        onSuggestionSelected: this.currentItemSelected,
        focusedItemIndex: this.state.focusedItemIndex,
        inputProps: {
          id: this.props.id,
          value: inputValue,
          onChange: this.handleUpdateInputNow,
          onKeyDown: this.handleOnKeyDown,
          onTouchStart: this.handleOnTouchStart,
          placeholder: this.props.placeholder
        },
        itemProps: {
          onMouseEnter: this.handleOnMouseEnter,
          onClick: this.handleOnMouseDown,
          onTouchStart: this.handleOnTouchStart
        }
      })
    );
  };

  return SearchInputContainer;
}(Component);

SearchInputContainer.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  intl: intlShape,
  config: PropTypes.object.isRequired
};
SearchInputContainer.propTypes = {
  type: PropTypes.string.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  close: PropTypes.func.isRequired,
  sections: PropTypes.bool,
  layers: PropTypes.array
};
export default SearchInputContainer;