import PropTypes from 'prop-types';
import React from 'react';
import sortBy from 'lodash/sortBy';

import { FakeSearchWithButton } from './FakeSearchWithButtonContainer';
import Icon from './Icon';
import IconWithTail from './IconWithTail';
import SelectedIconWithTail from './SelectedIconWithTail';
import IconWithCaution from './IconWithCaution';
import IconWithBigCaution from './IconWithBigCaution';
import IconWithIcon from './IconWithIcon';
import ComponentDocumentation from './ComponentDocumentation';
import Departure from './Departure';
import RouteNumber from './RouteNumber';
import RouteDestination from './RouteDestination';
import DepartureTime from './DepartureTime';
import Distance from './Distance';
import PlatformNumber from './PlatformNumber';
import CardHeader from './CardHeader';
import Card from './Card';
import CityBikeCard from './CityBikeCard';
import CityBikeContent from './CityBikeContent';
import CityBikeAvailability from './CityBikeAvailability';
import CityBikeUse from './CityBikeUse';
import CityBikePopup from './map/popups/CityBikePopup';
import FavouriteLocation from './FavouriteLocation';
import EmptyFavouriteLocationSlot from './EmptyFavouriteLocationSlot';
import TimeSelectors from './TimeSelectors';
import TimeNavigationButtons from './TimeNavigationButtons';
import RightOffcanvasToggle from './RightOffcanvasToggle';
import TripRouteStop from './TripRouteStop';
import MarkerSelectPopup from './map/tile-layer/MarkerSelectPopup';
import SelectCityBikeRow from './map/tile-layer/SelectCityBikeRow';
import SelectParkAndRideRow from './map/tile-layer/SelectParkAndRideRow';
import SelectStopRow from './map/tile-layer/SelectStopRow';
import SelectTerminalRow from './map/tile-layer/SelectTerminalRow';
import TicketInformation from './TicketInformation';
import DateSelect from './DateSelect';
import RouteScheduleHeader from './RouteScheduleHeader';
import RouteScheduleStopSelect from './RouteScheduleStopSelect';
import RouteScheduleTripRow from './RouteScheduleTripRow';
import RouteStop from './RouteStop';
import RouteAlertsRow from './RouteAlertsRow';
import ModeFilter from './ModeFilter';
import Availability from './Availability';
import ParkAndRideAvailability from './map/popups/ParkAndRideAvailability';
import AppBarSmall from './AppBarSmall';
import AppBarLarge from './AppBarLarge';
import FrontPagePanelSmall from './FrontPagePanelSmall';
import FrontPagePanelLarge from './FrontPagePanelLarge';
import { DepartureRow } from './DepartureRowContainer';
import { BicycleRentalStationRow } from './BicycleRentalStationRowContainer';
import StopPageHeader from './StopPageHeader';
import StopCardHeader from './StopCardHeader';
import SplitBars from './SplitBars';
import Labeled from './Labeled';
import Centered from './Centered';
import InfoIcon from './InfoIcon';
import Favourite from './Favourite';
import NoFavouriteLocations from './NoFavouriteLocations';
import DepartureListHeader from './DepartureListHeader';
import NextDeparturesListHeader from './NextDeparturesListHeader';
import CurrentPositionSuggestionItem from './CurrentPositionSuggestionItem';
import SuggestionItem from './SuggestionItem';
import SelectedStopPopupContent from './SelectedStopPopupContent';
import { Component as LangSelect } from './LangSelect';
import ExternalLink from './ExternalLink';
import { component as SummaryRow } from './SummaryRow';
import PageFooter from './PageFooter';
import FooterItem from './FooterItem';
import DateWarning from './DateWarning';
import ViaPointSelector from './ViaPointSelector';
import ViaPointBar from './ViaPointBar';
import WalkLeg from './WalkLeg';
import WaitLeg from './WaitLeg';
import BicycleLeg from './BicycleLeg';
import EndLeg from './EndLeg';
import AirportCheckInLeg from './AirportCheckInLeg';
import AirportCollectLuggageLeg from './AirportCollectLuggageLeg';
import BusLeg from './BusLeg';
import AirplaneLeg from './AirplaneLeg';
import SubwayLeg from './SubwayLeg';
import TramLeg from './TramLeg';
import RailLeg from './RailLeg';
import FerryLeg from './FerryLeg';
import CarLeg from './CarLeg';
import ViaLeg from './ViaLeg';
import CallAgencyLeg from './CallAgencyLeg';
import CallAgencyWarning from './CallAgencyWarning';
import Timetable from './Timetable';

var components = {
  Icon: Icon,
  IconWithTail: IconWithTail,
  SelectedIconWithTail: SelectedIconWithTail,
  IconWithBigCaution: IconWithBigCaution,
  IconWithCaution: IconWithCaution,
  IconWithIcon: IconWithIcon,
  ComponentDocumentation: ComponentDocumentation,
  Departure: Departure,
  RouteNumber: RouteNumber,
  RouteDestination: RouteDestination,
  DepartureTime: DepartureTime,
  Distance: Distance,
  PlatformNumber: PlatformNumber,
  CardHeader: CardHeader,
  Card: Card,
  CityBikeCard: CityBikeCard,
  CityBikeContent: CityBikeContent,
  CityBikeAvailability: CityBikeAvailability,
  CityBikeUse: CityBikeUse,
  CityBikePopup: CityBikePopup,
  Availability: Availability,
  ParkAndRideAvailability: ParkAndRideAvailability,
  FavouriteLocation: FavouriteLocation,
  NoFavouriteLocations: NoFavouriteLocations,
  EmptyFavouriteLocationSlot: EmptyFavouriteLocationSlot,
  TimeSelectors: TimeSelectors,
  TimeNavigationButtons: TimeNavigationButtons,
  RightOffcanvasToggle: RightOffcanvasToggle,
  TripRouteStop: TripRouteStop,
  MarkerSelectPopup: MarkerSelectPopup,
  SelectCityBikeRow: SelectCityBikeRow,
  SelectParkAndRideRow: SelectParkAndRideRow,
  SelectStopRow: SelectStopRow,
  SelectTerminalRow: SelectTerminalRow,
  TicketInformation: TicketInformation,
  DateSelect: DateSelect,
  RouteScheduleHeader: RouteScheduleHeader,
  RouteScheduleStopSelect: RouteScheduleStopSelect,
  RouteScheduleTripRow: RouteScheduleTripRow,
  RouteAlertsRow: RouteAlertsRow,
  ModeFilter: ModeFilter,
  RouteStop: RouteStop,
  DepartureRow: DepartureRow,
  BicycleRentalStationRow: BicycleRentalStationRow,
  FakeSearchWithButton: FakeSearchWithButton,
  AppBarSmall: AppBarSmall,
  AppBarLarge: AppBarLarge,
  FrontPagePanelLarge: FrontPagePanelLarge,
  FrontPagePanelSmall: FrontPagePanelSmall,
  StopPageHeader: StopPageHeader,
  StopCardHeader: StopCardHeader,
  SplitBars: SplitBars,
  Labeled: Labeled,
  Centered: Centered,
  InfoIcon: InfoIcon,
  Favourite: Favourite,
  DepartureListHeader: DepartureListHeader,
  NextDeparturesListHeader: NextDeparturesListHeader,
  CurrentPositionSuggestionItem: CurrentPositionSuggestionItem,
  SuggestionItem: SuggestionItem,
  SelectedStopPopupContent: SelectedStopPopupContent,
  SummaryRow: SummaryRow,
  ExternalLink: ExternalLink,
  LangSelect: LangSelect,
  PageFooter: PageFooter,
  FooterItem: FooterItem,
  DateWarning: DateWarning,
  ViaPointSelector: ViaPointSelector,
  ViaPointBar: ViaPointBar,
  WalkLeg: WalkLeg,
  WaitLeg: WaitLeg,
  BicycleLeg: BicycleLeg,
  EndLeg: EndLeg,
  AirportCheckInLeg: AirportCheckInLeg,
  AirportCollectLuggageLeg: AirportCollectLuggageLeg,
  BusLeg: BusLeg,
  AirplaneLeg: AirplaneLeg,
  SubwayLeg: SubwayLeg,
  TramLeg: TramLeg,
  RailLeg: RailLeg,
  FerryLeg: FerryLeg,
  CarLeg: CarLeg,
  ViaLeg: ViaLeg,
  CallAgencyLeg: CallAgencyLeg,
  CallAgencyWarning: CallAgencyWarning,
  Timetable: Timetable
};

function getColors() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'div',
      { className: 'medium-6 column' },
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#007ac9' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$primary-color'
      ),
      '#007ac9',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#ffffff' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$primary-font-color'
      ),
      '#ffffff',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#0062a1' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$secondary-color'
      ),
      '#0062a1',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#ffffff' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$secondary-font-color'
      ),
      '#ffffff',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#ffffff' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$title-color'
      ),
      '#ffffff',
      React.createElement('br', null)
    ),
    React.createElement(
      'div',
      { className: 'medium-6 column' },
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#f092cd' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$favourite-color'
      ),
      '#f092cd',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#f092cd' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$hilight-color'
      ),
      '#f092cd',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#007ac9' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$action-color'
      ),
      '#007ac9',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#fed100' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$disruption-color'
      ),
      '#fed100',
      React.createElement('br', null),
      React.createElement(
        'svg',
        { className: 'color-palette', width: '50', height: '50' },
        React.createElement('rect', { width: '50', height: '50', style: { fill: '#4DA2D9' } })
      ),
      React.createElement(
        'span',
        { className: 'code color-code' },
        '$disruption-passive-color'
      ),
      '#4DA2D9'
    ),
    React.createElement(
      'p',
      null,
      'TODO: dynamically get these colors, now only for HSL'
    ),
    React.createElement('img', {
      src: '/img/hsl_reittiopas_map-strokes_02.png',
      alt: 'Reittiviivat kartalla'
    })
  );
}

function getFonts() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'p',
      null,
      'Theme typeface Gotham doesn\'t have all symbols in one file, so both A and B variants must be specified. Also the weight must be specified every time the family is, and vice versa, because the weights of one font can be unsuitable for the other and therefore shouldn\'t be cross inherited when the parent element\'s font-family is not the same.'
    ),
    React.createElement(
      'p',
      null,
      'Easiest way to get all the relevant CSS properties correctly is to include an SCSS helper mixin.'
    ),
    React.createElement(
      'span',
      { className: 'code' },
      '$font-family'
    ),
    React.createElement(
      'p',
      { style: { fontWeight: '400' } },
      'Primary font: "Gotham Rounded SSm A"," Gotham Rounded SSm B" Arial, Georgia, Serif',
      React.createElement(
        'span',
        { className: 'code' },
        '@include font-book'
      )
    ),
    React.createElement(
      'p',
      { style: { fontWeight: '500' } },
      'Primary font: "Gotham Rounded SSm A"," Gotham Rounded SSm B", Arial, Georgia, Serif',
      React.createElement(
        'span',
        { className: 'code' },
        '@include font-medium'
      )
    ),
    React.createElement(
      'p',
      { style: { fontWeight: '700' } },
      'Primary font: "Gotham Rounded SSm A"," Gotham Rounded SSm B", Arial, Georgia, Serif',
      React.createElement(
        'span',
        { className: 'code' },
        '@include font-bold'
      )
    ),
    React.createElement(
      'span',
      { className: 'code' },
      '$font-family-narrow'
    ),
    React.createElement(
      'p',
      {
        style: {
          fontFamily: '"Gotham XNarrow SSm A","Gotham XNarrow SSm B"',
          fontWeight: '400'
        }
      },
      'Secondary font: "Gotham XNarrow SSm A", "Gotham XNarrow SSm B", Arial, Georgia, Serif',
      React.createElement(
        'span',
        { className: 'code' },
        '@include font-narrow-book'
      )
    ),
    React.createElement(
      'p',
      {
        style: {
          fontFamily: '"Gotham XNarrow SSm A","Gotham XNarrow SSm B"',
          fontWeight: '500'
        }
      },
      'Secondary font: "Gotham XNarrow SSm A", "Gotham XNarrow SSm B", Arial, Georgia, Serif',
      React.createElement(
        'span',
        { className: 'code' },
        '@include font-narrow-medium'
      )
    )
  );
}

function getHeadings() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'h1',
      null,
      'Heading 1',
      React.createElement(
        'span',
        { className: 'code' },
        '<h1 />'
      )
    ),
    React.createElement(
      'h2',
      null,
      'Heading 2',
      React.createElement(
        'span',
        { className: 'code' },
        '<h2 />'
      )
    ),
    React.createElement(
      'h3',
      null,
      'Heading 3',
      React.createElement(
        'span',
        { className: 'code' },
        '<h3 />'
      )
    ),
    React.createElement(
      'h4',
      null,
      'Heading 4',
      React.createElement(
        'span',
        { className: 'code' },
        '<h4 />'
      )
    ),
    React.createElement(
      'h5',
      null,
      'Heading 5',
      React.createElement(
        'span',
        { className: 'code' },
        '<h5 />'
      )
    ),
    React.createElement(
      'h6',
      null,
      'Heading 6',
      React.createElement(
        'span',
        { className: 'code' },
        '<h6 />'
      )
    )
  );
}

function getSubHeaders() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'p',
      { className: 'sub-header-h4' },
      'This is a sub header',
      React.createElement(
        'span',
        { className: 'code' },
        '.sub-header-h4'
      )
    )
  );
}

function getTextStyles() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'p',
      null,
      React.createElement(
        'a',
        null,
        'This is a link'
      ),
      React.createElement(
        'span',
        { className: 'code' },
        '<a />'
      )
    ),
    React.createElement(
      'p',
      null,
      React.createElement(
        'span',
        { className: 'dotted-link cursor-pointer' },
        'This is a clickable span'
      ),
      React.createElement(
        'span',
        { className: 'code' },
        '<span className="dotted-link pointer-cursor" />'
      )
    ),
    React.createElement(
      'p',
      null,
      'Paragraph: normal text looks like this',
      React.createElement(
        'span',
        { className: 'code' },
        '<p />'
      )
    ),
    React.createElement(
      'span',
      null,
      'span style'
    ),
    React.createElement(
      'span',
      { className: 'code' },
      React.createElement('span', null)
    ),
    React.createElement(
      'p',
      { className: 'bold' },
      'this text is bold (should be avoided, set the complete font with mixins instead)',
      React.createElement(
        'span',
        { className: 'code' },
        '.bold or ',
        React.createElement('b', null)
      )
    )
  );
}

function getIcon(id) {
  return React.createElement(
    'div',
    { key: id },
    React.createElement(Icon, { img: id }),
    React.createElement(
      'span',
      { className: 'code' },
      id
    ),
    React.createElement('br', null)
  );
}

function getIcons() {
  if (typeof document === 'undefined') {
    return null;
  }
  return React.createElement(
    'section',
    null,
    'Import:',
    React.createElement(
      'p',
      { className: 'code' },
      'Icon = require \u2018../icon/Icon\u2019'
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      {
        style: {
          columnWidth: '20em',
          columnGap: '2em',
          columnCount: 4
        }
      },
      sortBy([].slice.call(document.getElementsByTagName('symbol')), function (symbol) {
        return symbol.id;
      }).map(function (symbol) {
        return getIcon(symbol.id);
      })
    ),
    React.createElement(
      'div',
      null,
      React.createElement(Icon, { className: 'large-icon', img: 'icon-icon_subway-live' }),
      React.createElement(
        'span',
        { className: 'code' },
        '.large-icon'
      ),
      React.createElement('br', null),
      React.createElement(Icon, { className: 'large-icon', img: 'icon-icon_user' }),
      React.createElement(
        'span',
        { className: 'code' },
        '.large-icon'
      ),
      React.createElement('br', null)
    )
  );
}

function getHelpers() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'div',
      { className: 'bus' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.bus'
      )
    ),
    React.createElement(
      'div',
      { className: 'tram' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.tram'
      )
    ),
    React.createElement(
      'div',
      { className: 'rail' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.rail'
      )
    ),
    React.createElement(
      'div',
      { className: 'subway' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.subway'
      )
    ),
    React.createElement(
      'div',
      { className: 'ferry' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.ferry'
      )
    ),
    React.createElement(
      'div',
      { className: 'citybike' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.citybike'
      )
    ),
    React.createElement(
      'div',
      { className: 'walk' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.walk'
      )
    ),
    React.createElement(
      'div',
      { className: 'bicycle' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.bicycle'
      )
    ),
    React.createElement(
      'div',
      { className: 'wait' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.wait'
      )
    ),
    React.createElement(
      'div',
      { className: 'from' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.from'
      )
    ),
    React.createElement(
      'div',
      { className: 'to' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.to'
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      { className: 'cursor-pointer' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.cursor-pointer'
      )
    ),
    React.createElement(
      'div',
      { className: 'bold' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.bold'
      )
    ),
    React.createElement(
      'div',
      { className: 'uppercase' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.uppercase'
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      { className: 'padding-small border-dashed' },
      'the border is not part of the style',
      React.createElement(
        'span',
        { className: 'code' },
        '.padding-small'
      )
    ),
    React.createElement(
      'div',
      { className: 'padding-normal border-dashed' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.padding-normal'
      )
    ),
    React.createElement(
      'div',
      { className: 'padding-vertical-small border-dashed' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.padding-vertical-small'
      )
    ),
    React.createElement(
      'div',
      { className: 'padding-vertical-normal border-dashed' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.padding-vertical-normal'
      )
    ),
    React.createElement(
      'div',
      { className: 'padding-horizontal border-dashed' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.padding-horizontal'
      )
    ),
    React.createElement(
      'div',
      { className: 'no-padding' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.no-padding'
      )
    ),
    React.createElement(
      'div',
      { className: 'no-margin' },
      'some div',
      React.createElement(
        'span',
        { className: 'code' },
        '.no-margin'
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      { className: 'left' },
      'float left',
      React.createElement(
        'span',
        { className: 'code' },
        '.left'
      )
    ),
    React.createElement(
      'div',
      { className: 'right' },
      'float right',
      React.createElement(
        'span',
        { className: 'code' },
        '.right'
      )
    ),
    React.createElement(
      'div',
      { className: 'clear' },
      'flot is cleared',
      React.createElement(
        'span',
        { className: 'code' },
        '.clear'
      )
    ),
    React.createElement(
      'div',
      { className: 'text-left' },
      'text aligned to left',
      React.createElement(
        'span',
        { className: 'code' },
        '.text-left'
      )
    ),
    React.createElement(
      'div',
      { className: 'text-right' },
      'text aligned to right',
      React.createElement(
        'span',
        { className: 'code' },
        '.text-right'
      )
    ),
    React.createElement(
      'div',
      { className: 'text-center' },
      'text centered aligned',
      React.createElement(
        'span',
        { className: 'code' },
        '.text-center'
      )
    ),
    React.createElement(
      'div',
      { className: 'inline-block' },
      'this div is inlied',
      React.createElement(
        'span',
        { className: 'code' },
        '.inline-block'
      )
    ),
    React.createElement(
      'div',
      { className: 'inline-block' },
      'this also',
      React.createElement(
        'span',
        { className: 'code' },
        '.inline-block'
      )
    )
  );
}

function getComponents() {
  return Object.keys(components).map(function (component) {
    return React.createElement(
      'div',
      { key: component },
      React.createElement(ComponentDocumentation, { component: components[component] })
    );
  });
}

function StyleGuidePage(props) {
  if (props.params.componentName) {
    return React.createElement(ComponentDocumentation, {
      mode: 'examples-only',
      component: components[props.params.componentName]
    });
  }

  return React.createElement(
    'div',
    { className: 'container column' },
    React.createElement(
      'h1',
      null,
      'UI Elements'
    ),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Colors'
    ),
    getColors(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Fonts'
    ),
    getFonts(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Text Styles'
    ),
    getTextStyles(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Headings'
    ),
    getHeadings(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Sub Headings'
    ),
    getSubHeaders(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Icons'
    ),
    getIcons(),
    React.createElement('hr', null),
    React.createElement(
      'div',
      { className: 'sub-header' },
      'Helper Classes'
    ),
    getHelpers(),
    React.createElement('hr', null),
    React.createElement(
      'h1',
      null,
      'Components'
    ),
    React.createElement('hr', null),
    getComponents()
  );
}

StyleGuidePage.propTypes = {
  params: PropTypes.shape({
    componentName: PropTypes.string
  }).isRequired
};

export default StyleGuidePage;