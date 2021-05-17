// @ts-nocheck

export interface EventInterface {
  id: number;
  date;
  time: string;
  title: string;
  full_text: string;
  type: string;
  lead_image: string;
}

export interface CheckboxInterface {
  eventType: string;
  checkedIds: Set<string>;
  handleCheck;
}

export enum EventActionTypes {
  SET_EVENTS = 'SET_EVENTS',
  SET_FILTERED_SEARCHED_EVENTS = 'SET_FILTERED_SEARCHED_EVENTS',
  SET_PAGINATED_EVENTS = 'SET_PAGINATED_EVENTS',
  SET_EVENT_TYPES = 'SET_EVENT_TYPES',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_FETCH_ERROR = 'SET_FETCH_ERROR',
}

interface setEvents {
  type: EventActionTypes.SET_EVENTS;
  payload: EventInterface[];
}

interface setFilteredSearchedEvents {
  type: EventActionTypes.SET_FILTERED_SEARCHED_EVENTS;
  payload: EventInterface[];
}

interface setPaginatedEvents {
  type: EventActionTypes.SET_PAGINATED_EVENTS;
  payload: EventInterface[];
}

interface setEventTypes {
  type: EventActionTypes.SET_EVENT_TYPES;
  payload: string[];
}

interface setIsFetching {
  type: EventActionTypes.SET_IS_FETCHING;
  payload: boolean;
}

interface setCurrentPage {
  type: EventActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

interface setFetchError {
  type: EventActionTypes.SET_FETCH_ERROR;
  payload: boolean;
}

export type EventAction =
  | setEvents
  | setFilteredSearchedEvents
  | setPaginatedEvents
  | setEventTypes
  | setIsFetching
  | setCurrentPage
  | setFetchError;
