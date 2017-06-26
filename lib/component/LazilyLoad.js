import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';

// From https://webpack.js.org/guides/lazy-load-react/

var LazilyLoad = function (_React$Component) {
  _inherits(LazilyLoad, _React$Component);

  function LazilyLoad() {
    var _temp, _this, _ret;

    _classCallCheck(this, LazilyLoad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      isLoaded: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LazilyLoad.prototype.componentWillMount = function componentWillMount() {
    this.load(this.props);
  };

  LazilyLoad.prototype.componentDidMount = function componentDidMount() {
    this.componentMounted = true;
  };

  LazilyLoad.prototype.componentWillReceiveProps = function componentWillReceiveProps(next) {
    if (next.modules === this.props.modules) return;
    this.load(next);
  };

  LazilyLoad.prototype.componentWillUnmount = function componentWillUnmount() {
    this.componentMounted = false;
  };

  LazilyLoad.prototype.load = function load(_ref) {
    var _this2 = this;

    var modules = _ref.modules;

    this.setState({
      isLoaded: false
    });

    var keys = Object.keys(modules);

    Promise.all(keys.map(function (key) {
      return modules[key]();
    })).then(function (values) {
      return keys.reduce(function (agg, key, index) {
        agg[key] = values[index]; // eslint-disable-line no-param-reassign
        return agg;
      }, {});
    }).then(function (result) {
      if (!_this2.componentMounted) return;
      _this2.setState({ modules: result, isLoaded: true });
    });
  };

  LazilyLoad.prototype.render = function render() {
    if (!this.state.isLoaded) return null;
    return React.Children.only(this.props.children(this.state.modules));
  };

  return LazilyLoad;
}(React.Component);

LazilyLoad.propTypes = {
  modules: PropTypes.objectOf(PropTypes.func.isRequired).isRequired
};


LazilyLoad.propTypes = {
  children: PropTypes.func.isRequired
};

export var LazilyLoadFactory = function LazilyLoadFactory(Component, modules) {
  return function (props) {
    return React.createElement(
      LazilyLoad,
      { modules: modules },
      function (mods) {
        return React.createElement(Component, _extends({}, mods, props));
      }
    );
  };
};

export var importLazy = function importLazy(promise) {
  return promise.then(function (result) {
    return result.default;
  });
};

export default LazilyLoad;