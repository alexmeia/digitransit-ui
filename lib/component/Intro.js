import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { FormattedMessage, intlShape } from 'react-intl';
import cx from 'classnames';

var BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

var slides = {};

if (typeof window !== 'undefined') {
  slides = {
    hsl: require('./IntroHsl').default, // eslint-disable-line global-require
    matka: require('./IntroMatka').default // eslint-disable-line global-require
  };
}

var Intro = function (_React$Component) {
  _inherits(Intro, _React$Component);

  function Intro() {
    var _temp, _this, _ret;

    _classCallCheck(this, Intro);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { slideIndex: 0 }, _this.onNextClick = function () {
      return _this.handleChange(_this.state.slideIndex + 1);
    }, _this.onTransitionFinished = function () {
      var themeSlides = slides[_this.context.config.CONFIG] || [];
      return _this.state.slideIndex === themeSlides.length && _this.props.onIntroFinished();
    }, _this.handleChange = function (value) {
      return _this.setState({ slideIndex: value });
    }, _this.renderSlide = function (content, i) {
      return React.createElement(
        'button',
        {
          className: 'intro-slide noborder',
          key: i,
          tabIndex: 0,
          onClick: _this.onNextClick
        },
        React.createElement('img', { alt: '', 'aria-hidden': 'true', src: content.image, role: 'presentation' }),
        React.createElement(
          'h3',
          null,
          content.header[_this.context.intl.locale]
        ),
        React.createElement(
          'span',
          null,
          content.text[_this.context.intl.locale]
        )
      );
    }, _this.renderDot = function (text, i) {
      return React.createElement(
        'span',
        { key: i, className: cx('dot', { active: i === _this.state.slideIndex }) },
        '\u2022'
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Intro.prototype.render = function render() {
    var _this2 = this;

    var themeSlides = slides[this.context.config.CONFIG] || [];
    return React.createElement(
      'div',
      { className: 'flex-vertical intro-slides' },
      React.createElement(
        BindKeyboardSwipeableViews,
        {
          index: this.state.slideIndex,
          onChangeIndex: this.handleChange,
          onTransitionEnd: this.onTransitionFinished,
          className: 'intro-swipeable',
          onScroll: function onScroll(e) {
            // If we notice that we tab to the next slide, switch slide and reset scroll position
            if (e.target.scrollLeft !== 0) {
              _this2.onNextClick();
            }
            // eslint-disable-next-line no-param-reassign
            e.target.scrollLeft = 0;
          }
        },
        [].concat(themeSlides.map(this.renderSlide), [this.props.finalSlide])
      ),
      React.createElement(
        'div',
        { className: cx('bottom', { hidden: this.state.slideIndex === themeSlides.length }) },
        [].concat(themeSlides, [this.props.finalSlide]).map(this.renderDot),
        React.createElement(
          'button',
          { tabIndex: this.state.slideIndex, className: 'next noborder', onClick: this.onNextClick },
          React.createElement(FormattedMessage, { id: 'next', defaultMessage: 'next' })
        )
      )
    );
  };

  return Intro;
}(React.Component);

Intro.propTypes = {
  onIntroFinished: PropTypes.func.isRequired,
  finalSlide: PropTypes.node.isRequired
};
Intro.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired
};
export default Intro;