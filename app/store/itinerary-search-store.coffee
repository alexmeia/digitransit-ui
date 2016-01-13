Store = require 'fluxible/addons/BaseStore'

STORAGE_KEY = "currentItinerary"

class ItinerarySearchStore extends Store
  @storeName: 'ItinerarySearchStore'

  constructor: (dispatcher) ->
    super(dispatcher)
    localData = window?.sessionStorage?.getItem STORAGE_KEY
    @data = if localData then JSON.parse(localData) else {}
    @fromPlace = ""
    @toPlace   = ""
    @ticketOptions = [
      {
        "displayName": "Ei lippuvyöhykerajoitusta",
        "value": "0"
      }
    ]
    @accessibilityOptions = [
      {
        "displayName": "Ei rajoitusta",
        "value": "0"
      },
      {
        "displayName": "Liikun pyörätuolilla",
        "value": "1"
      }
    ]
    @selectedTicketOption = "0"
    @selectedAccessibilityOption = "0"
    @busState = true
    @tramState = true
    @railState = true
    @subwayState = true
    @ferryState = true
    @citybikeState = false
    # These three are mutually exclusive
    @walkState = true
    @bicycleState = false
    @carState = false

    @walkReluctance = 2
    @walkBoardCost = 600          # Vaihdot / transfers
    @minTransferTime = 180        # Vaihtomarginaali / transfer margin
    @walkSpeed = 1.2

  getData: ->
    @data

  getOptions: ->
    params: {
      "to": @toPlace,
      "from": @fromPlace
    }

  getMode: ->
    mode = []
    if @getBusState() then mode.push "BUS"
    if @getTramState() then mode.push "TRAM"
    if @getRailState() then mode.push "RAIL"
    if @getSubwayState() then mode.push "SUBWAY"
    if @getFerryState() then mode.push "FERRY"
    if @getCitybikeState() then mode.push "BICYCLE_RENT"
    if mode.length then mode.push "AIRPLANE"
    if @getWalkState() then mode.push "WALK"
    if @getBicycleState() then mode.push "BICYCLE"
    if @getCarState() then mode.push "CAR"
    return mode.join(",")


  getTicketOptions: ->
    @ticketOptions
  getAccessibilityOptions: ->
    @accessibilityOptions
  getSelectedTicketOption: ->
    @selectedTicketOption
  getSelectedAccessibilityOption: ->
    @selectedAccessibilityOption


  getBusState: ->
    @busState
  getTramState: ->
    @tramState
  getRailState: ->
    @railState
  getSubwayState: ->
    @subwayState
  getFerryState: ->
    @ferryState
  getCitybikeState: ->
    @citybikeState
  getWalkState: ->
    @walkState
  getBicycleState: ->
    @bicycleState
  getCarState: ->
    @carState

  getWalkReluctance: ->
    @walkReluctance
  getWalkBoardCost: ->
    @walkBoardCost
  getMinTransferTime: ->
    @minTransferTime
  getWalkSpeed: ->
    @walkSpeed
  isWheelchair: ->
    @selectedAccessibilityOption == "1"


  toggleBusState: ->
    @busState = !@busState
    @emitChange()
  toggleTramState: ->
    @tramState = !@tramState
    @emitChange()
  toggleRailState: ->
    @railState = !@railState
    @emitChange()
  toggleSubwayState: ->
    @subwayState = !@subwayState
    @emitChange()
  toggleFerryState: ->
    @ferryState = !@ferryState
    @emitChange()
  toggleCitybikeState: ->
    @citybikeState = !@citybikeState
    @emitChange()
  toggleWalkState: ->
    @clearRadioButtons()
    @walkState = !@walkState
    @emitChange()
  toggleBicycleState: ->
    @clearRadioButtons()
    @bicycleState = !@bicycleState
    @emitChange()
  toggleCarState: ->
    @clearRadioButtons()
    @carState = !@carState
    @emitChange()

  clearRadioButtons: ->
    @walkState = @bicycleState = @carState = false
    return

  updateFromToPlaces: (params)  ->
    @toPlace = params.to
    @fromPlace = params.from
    @emitChange()

  setWalkReluctance: (value) ->
    @walkReluctance = value
    @emitChange()

  setWalkBoardCost: (value) ->
    @walkBoardCost = value
    @emitChange()

  setMinTransferTime: (value) ->
    @minTransferTime = value
    @emitChange()

  setWalkSpeed: (value) ->
    @walkSpeed = value
    @emitChange()

  setTicketOption: (value) ->
    @selectedTicketOption = value
    @emitChange()

  setAccessibilityOption: (value) ->
    @selectedAccessibilityOption = value
    @emitChange()

  storeItinerarySearch: (data) ->
    @data = data
    try
      window?.sessionStorage?.setItem STORAGE_KEY, JSON.stringify @data
    catch error
      if error.name == 'QuotaExceededError'
        console.error('[sessionStorage] Unable to save state; sessionStorage is not available in Safari private mode')
      else
        throw error

    @emitChange()

  clearItinerary: ->
    @data = {}
    window?.sessionStorage?.removeItem STORAGE_KEY
    @emitChange()

  dehydrate: ->
    @data

  rehydrate: (data) ->
    @data = data

  @handlers:
    "ItineraryFound": 'storeItinerarySearch'
    "ItinerarySearchStarted": 'clearItinerary'
    "ToggleBusState": 'toggleBusState'
    "ToggleTramState": 'toggleTramState'
    "ToggleRailState": 'toggleRailState'
    "ToggleSubwayState": 'toggleSubwayState'
    "ToggleFerryState": 'toggleFerryState'
    "ToggleCitybikeState": 'toggleCitybikeState'
    "ToggleWalkState": 'toggleWalkState'
    "ToggleBicycleState": 'toggleBicycleState'
    "ToggleCarState": 'toggleCarState'
    "UpdateFromToPlaces": 'updateFromToPlaces'
    "SetWalkReluctance": "setWalkReluctance"
    "SetWalkBoardCost": "setWalkBoardCost"
    "SetMinTransferTime": "setMinTransferTime"
    "SetWalkSpeed": "setWalkSpeed"
    "SetTicketOption": "setTicketOption"
    "SetAccessibilityOption": "setAccessibilityOption"

module.exports = ItinerarySearchStore
