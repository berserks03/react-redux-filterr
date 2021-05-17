// @ts-nocheck

import axios from 'axios';
import { Dispatch } from 'redux';
import {
  setEvents,
  setIsFetching,
  setEventTypes,
  setFilteredSearchedEvents,
  setPaginatedEvents,
  setFetchError,
} from '../reducers/eventsReducer';
import { capitalizeFirstLetter } from '../utils/helpers';
import { EventInterface } from '../types/types';

const baseUrl = 'http://localhost:3001/items';

const uniqueType = (data: { type: string }[]) => {
  const flag: { [name: string]: boolean } = {};
  const unique: string[] = [];
  data.forEach((element) => {
    if (!flag[element.type]) {
      flag[element.type] = true;
      unique.push(capitalizeFirstLetter(element.type));
    }
  });
  return unique;
};

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(baseUrl);
      const eventTypes = uniqueType(response.data).sort((a, b) =>
        a > b ? -1 : 1
      );
      dispatch(setEventTypes(eventTypes));
      const options = {  month: 'long', day: 'numeric' };
      let data = response.data
      .map((item) => {
        let initial = item.date.split('/');
        item.date = new Date([initial[2], initial[0], initial[1]].join('/'));
        return item;
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));
      const formatedData = data
      .map((item) =>{
        item.date = item.date.toLocaleDateString('lv-LV', options)
        return item;
      })
      console.log(formatedData);
      dispatch(setEvents(formatedData));
    } catch (error) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
    }
  };
};

export const getFilteredSearchedEvents = (
  events: EventInterface[],
  checkedIds?: Set<string>,
  searchQuery = ''
) => {
  if (checkedIds === undefined) {
    checkedIds = new Set(['Visas tēmas']);
  }
  return (dispatch: Dispatch) => {
    let searchResults;
    if (searchQuery.length > 2) {
      searchResults = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      searchResults = events;
    }
    console.log({ events });
    console.log({ searchResults });
    // console.log({ checkedIds });
    // let filteredSearchResults;

    // if (checkedIds === undefined) {
    //   filteredSearchResults = searchResults;
    // } else {
    //   filteredSearchResults = searchResults.filter((event) =>(
    //     Array.from(checkedIds).indexOf(event.event.type.toLowerCase()) !== -1)
    //   );
    // }
    // console.log({filteredSearchResults})
    // dispatch(setFilteredSearchedEvents(filteredSearchResults));
    dispatch(setFilteredSearchedEvents(searchResults));
  };
};

export const getPaginatedEvents = (
  filteredSearchedevents: EventInterface[],
  currentPage: number,
  perPage: number
) => {
  return (dispatch: Dispatch) => {
    const paginationResults = filteredSearchedevents.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    console.log({paginationResults})
    dispatch(setPaginatedEvents(paginationResults));
  };
};

export const getCurrentEvent = async (id: string, setEvent) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  let initial = response.data.date.split('/');
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  response.data.date = new Date([initial[2], initial[0], initial[1]].join('/')).toLocaleDateString('lv-LV', options)
  setEvent(response.data);
};
