// @ts-nocheck

import { EventInterface } from '../types/types';

const SET_EVENTS = 'SET_EVENTS';
const SET_FILTERED_SEARCHED_EVENTS = 'SET_FILTERED_SEARCHED_EVENTS';
const SET_PAGINATED_EVENTS = 'SET_PAGINATED_EVENTS';
const SET_EVENT_TYPES = 'SET_EVENT_TYPES';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_FETCH_ERROR = 'SET_FETCH_ERROR';

const defaultState = {
  events: [],
  filteredSearchedEvents: [],
  paginatedEvents: [],
  eventTypes: [],
  isFetching: true,
  currentPage: 1,
  perPage: 6,
  totalCount: 0,
  isFetchError: false,
};

export default function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case SET_FILTERED_SEARCHED_EVENTS:
      return {
        ...state,
        filteredSearchedEvents: action.payload,
        totalCount: action.payload.length,
      };
    case SET_PAGINATED_EVENTS:
      return {
        ...state,
        paginatedEvents: action.payload,
        isFetching: false,
      };
    case SET_EVENT_TYPES:
      return {
        ...state,
        eventTypes: action.payload,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    default:
      return state;
  }
}

export const setEvents = (events: EventInterface[]) => ({
  type: SET_EVENTS,
  payload: events,
});
export const setFilteredSearchedEvents = (
  filteredSearchedEvents: EventInterface[]
) => ({ type: SET_FILTERED_SEARCHED_EVENTS, payload: filteredSearchedEvents });
export const setPaginatedEvents = (paginatedEvents: EventInterface[]) => ({
  type: SET_PAGINATED_EVENTS,
  payload: paginatedEvents,
});
export const setEventTypes = (eventTypes: string[]) => ({
  type: SET_EVENT_TYPES,
  payload: eventTypes,
});
export const setIsFetching = (bool: boolean) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
export const setCurrentPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
export const setFetchError = (bool: boolean) => ({
  type: SET_FETCH_ERROR,
  payload: bool,
});
