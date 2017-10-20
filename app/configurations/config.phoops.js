/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'phoops';
const APP_TITLE = 'Muoversi in Toscana';
const APP_DESCRIPTION = 'Muoversi In Toscana - phoops';
const API_URL = 'http://localhost:8888';
const MAP_URL = 'https://maps.wikimedia.org/osm-intl/';

const walttiConfig = require('./waltti').default;

const minLat = 41.5;
const maxLat = 44.5;
const minLon = 9.4;
const maxLon = 12.6;

export default configMerger(walttiConfig, {
  CONFIG,

  URL: {
    API_URL,
    OTP: `${API_URL}/otp/routers/toscana/`,
    MAP: {
      default: `${MAP_URL}`
    },
    STOP_MAP: `${MAP_URL}/map/v1/finland-stop-map/`,
    CITYBIKE_MAP: `${MAP_URL}/map/v1/hsl-citybike-map/`,
    MQTT: 'wss://dev.hsl.fi/mqtt-proxy',
    ALERTS: `${API_URL}/realtime/service-alerts/v1`,
    FONT: 'https://fonts.googleapis.com/css?family=Lato:300,400,900%7CPT+Sans+Narrow:400,700',
    REALTIME: `${API_URL}/realtime/vehicle-positions/v1`,
    PELIAS: `https://search.mapzen.com/v1/autocomplete?api_key=search-nHajqWA`,
    PELIAS_REVERSE_GEOCODER: `https://search.mapzen.com/v1/reverse?api_key=search-nHajqWA`,
  },

  appBarLink: { name: 'phoops', href: 'http://www.phoops.it/' },

  colors: {
    primary: '#bb0303',
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },

  title: APP_TITLE,

  textLogo: true, // title text instead of logo img

  // gtfs feed id for search?
  feedIds: [],

  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon
  },

  areaPolygon: [[minLon, minLat], [minLon, maxLat], [maxLon, maxLat], [maxLon, minLat]],

   // Default origin endpoint to use when user is outside of area
  defaultEndpoint: {
    address: 'Regione Toscana, Viale della Toscana',
    lat: 43.7941,
    lon: 11.2219,
  },

  defaultOrigins: [
    { icon: 'icon-icon_bus', label: 'Stazione SMN, Firenze', lat: 43.776033, lon: 11.248458 },
  ],

  footer: {
    content: [
      { label: (function () { return `© Phoops ${(1900 + new Date().getYear())}`; }()) },
      {},
      { name: 'footer-feedback', nameEn: 'Send feedback', type: 'feedback', icon: 'icon-icon_speech-bubble' },
      { name: 'about-this-service', nameEn: 'About this service', route: '/tietoja-palvelusta', icon: 'icon-icon_info' },
    ],
  },

  contactName: {
    sv: 'Digitransit',
    fi: 'Digitransit',
    default: "Digitransit's",
  },

  // Default labels for manifest creation
  name: 'Digitransit beta',
  shortName: 'Digitransit',

/*
 * by default search endpoints from all but gtfs sources, correct gtfs source
 * figured based on feedIds config variable
 */
  searchSources: ['osm', 'oa'],

  search: {
    suggestions: {
      useTransportIcons: false,
    },
    usePeliasStops: false, // enable to use pelias to search for stops
    mapPeliasModality: false, // enable to map pelias stops to otp
    peliasMapping: { // mapping values
      onstreetBus: 'BUS',
      onstreetTram: 'TRAM',
      airport: 'AIRPORT',
      railStation: 'RAIL',
      metroStation: 'SUBWAY',
      busStation: 'BUS',
      tramStation: 'TRAM',
      harbourPort: 'FERRY',
      ferryPort: 'FERRY',
      ferryStop: 'FERRY',
      liftStation: 'FUNICULAR',
    },
    peliasLayer: null, // function to change layer
    peliasLocalization: (feature) => {
      // localization example; showing locality (county) in label and name
      const localized = { ...feature };
      localized.properties.label = `${feature.properties.name}, ${feature.properties.locality}`;
      localized.properties.name = `${feature.properties.name}, ${feature.properties.locality}`;
      return localized;
    },
  },

  nearbyRoutes: {
    radius: 10000,
    bucketSize: 1000,
  },

  maxWalkDistance: 10000,
  maxBikingDistance: 100000,
  availableLanguages: ['it', 'en', 'fr', 'nb', 'de'],
  defaultLanguage: 'it',
  // This timezone data will expire on 31.12.2020
  timezoneData: '"Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|'+
  '-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5",',

  mainMenu: {
    // Whether to show the left menu toggle button at all
    show: true,
    showDisruptions: true,
    showInquiry: false,
    showLoginCreateAccount: true,
    showOffCanvasList: true,
  },

  feedback: {
    // Whether to allow the feedback popup
    enable: false,
  },

  itinerary: {
    // How long vehicle should be late in order to mark it delayed. Measured in seconds.
    delayThreshold: 180,
    // Wait time to show "wait leg"? e.g. 180 means over 3 minutes are shown as wait time.
    // Measured in seconds.
    waitThreshold: 180,
    enableFeedback: false,

    timeNavigation: {
      enableButtonArrows: false,
    },
  },

  nearestStopDistance: {
    maxShownDistance: 5000,
  },

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    minZoom: 3,
    maxZoom: 20,
    useVectorTiles: true,
    controls: {
      zoom: {
        // available controls positions: 'topleft', 'topright', 'bottomleft, 'bottomright'
        position: 'bottomleft',
      },
      scale: {
        position: 'bottomright',
      },
    },
    genericMarker: {
      // Do not render name markers at zoom levels below this value
      nameMarkerMinZoom: 18,

      popup: {
        offset: [106, 16],
        maxWidth: 250,
        minWidth: 250,
      },
    },

    line: {
      halo: {
        weight: 7,
        thinWeight: 4,
      },

      leg: {
        weight: 5,
        thinWeight: 2,
      },
    },

    useModeIconsInNonTileLayer: false,
  },

  stopCard: {
    header: {
      showDescription: true,
      showStopCode: true,
      showDistance: true,
    },
  },

  autoSuggest: {
    // Let Pelias suggest based on current user location
    locationAware: true,
  },

  modeToOTP: {
    bus: 'BUS',
    tram: 'TRAM',
    rail: 'RAIL',
    citybike: 'BICYCLE_RENT',
    airplane: 'AIRPLANE',
    ferry: 'FERRY',
    walk: 'WALK',
    bicycle: 'BICYCLE',
    car: 'CAR',
    car_park: 'CAR_PARK',
  },

  transportModes: {
    bus: {
      availableForSelection: true,
      defaultValue: true,
    },

    tram: {
      availableForSelection: true,
      defaultValue: true,
    },

    rail: {
      availableForSelection: true,
      defaultValue: true,
    },

    subway: {
      availableForSelection: false,
      defaultValue: false,
    },

    citybike: {
      availableForSelection: true,
      defaultValue: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: true,
      defaultValue: true,
    },
  },

  streetModes: {
    walk: {
      availableForSelection: true,
      defaultValue: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: false,
      defaultValue: false,
      icon: 'car_park-withoutBox',
    },
  },

  ticketOptions: [{
    displayName: 'Nessuna zona a pagamento',
    value: '0',
  }],

  accessibilityOptions: [{
    displayName: 'Nessuna restrizione',
    value: '0',
  }, {
    displayName: 'Sedia a rotelle',
    value: '1',
  }],

  aboutThisService: {
    fi: [
      {
        header: 'Tietoja palvelusta',
        paragraphs: ['Tämän palvelun tarjoaa Phoops reittisuunnittelua varten Phoops alueella. Palvelu kattaa joukkoliikenteen, kävelyn, pyöräilyn ja yksityisautoilun rajatuilta osin. Palvelu perustuu Digitransit palvelualustaan.'],
      },
    ],

    sv: [
      {
        header: 'Om tjänsten',
        paragraphs: ['Den här tjänsten erbjuds av Phoops för reseplanering inom Phoops region. Reseplaneraren täcker med vissa begränsningar kollektivtrafik, promenad, cykling samt privatbilism. Tjänsten baserar sig på Digitransit-plattformen.'],
      },
    ],

    en: [
      {
        header: 'About this service',
        paragraphs: ['This service is provided by Phoops for route planning in Phoops region. The service covers public transport, walking, cycling, and some private car use. Service is built on Digitransit platform.'],
      },
    ],

    it: [
      {
        header: 'Informazioni sul servizio',
        paragraphs: ['Questo servizio è offerto dalla Regione Toscana per la pianificazione di viaggi in Toscana. Il servizio propone itinerari a chi intende spostarsi con il trasporto pubblico, a piedi, in bicicletta, e in alcuni casi con l\'auto. Il software è sviluppato sulla piattaforma Digitransit.'],
      }
    ]
  }

});
