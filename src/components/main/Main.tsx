import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getEvents,
  getFilteredSearchedEvents,
  getPaginatedEvents,
} from '../../actions/events';
import { UseTypedSelector } from '../../hooks/useTypedSelector';
import { setCurrentPage } from '../../reducers/eventsReducer';
import { EventInterface } from '../../types/types';
import { createPages } from '../../utils/helpers';
import Checkbox from '../checkbox/Checkbox';
import Event from '../event/Event';
import DatePicker, {
  DayRange,
  utils,
} from '@hassanmojab/react-modern-calendar-datepicker';
import './Main.scss';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

const Main = () => {
  const dispatch = useDispatch();

  const events = UseTypedSelector((state) => state.events.events);
  const filteredSearchedEvents = UseTypedSelector(
    (state) => state.events.filteredSearchedEvents
  );
  const paginatedEvents: EventInterface[] = UseTypedSelector(
    (state) => state.events.paginatedEvents
  );
  const eventTypes = UseTypedSelector((state) => state.events.eventTypes);
  const isFetching = UseTypedSelector((state) => state.events.isFetching);
  const currentPage = UseTypedSelector((state) => state.events.currentPage);
  const perPage = UseTypedSelector((state) => state.events.perPage);
  const isFetchError = UseTypedSelector((state) => state.events.isFetchError);
  const totalCount = UseTypedSelector((state) => state.events.totalCount);
  const [searchValue, setSearchValue] = useState('');
  const [previousSearchValue, setPreviousSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages: number[] = [];
  createPages(pages, pagesCount, currentPage);
  const today = utils('en').getToday();
  const myCustomLocale = {
    months: [
      'Janvāris',
      'Februāris',
      'Marts',
      'Aprīlis',
      'Maijs',
      'Jūnijs',
      'Jūlijs',
      'Augusts',
      'Septembris',
      'Oktobris',
      'Novembris',
      'Decembris',
    ],

    weekDays: [
      {
        name: 'Pirmdiena',
        short: 'P',
      },
      {
        name: 'Otrdiena',
        short: 'O',
      },
      {
        name: 'Trešdiena',
        short: 'T',
      },
      {
        name: 'Ceturdiena',
        short: 'C',
      },
      {
        name: 'Piektdiena',
        short: 'P',
      },
      {
        name: 'Sestdiena',
        short: 'S',
        isWeekend: true,
      },
      {
        name: 'Svētdiena', 
        short: 'Sv', 
        isWeekend: true, 
      },
    ],

    weekStartingIndex: 6,

    getToday(gregorainTodayObject: any) {
      return gregorainTodayObject;
    },

    toNativeDate(date: {
      month: number;
      day: number | undefined;
      year: number;
    }) {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: { year: number; month: number }) {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: any) {
      return digit;
    },

    nextMonth: 'Nākamais Mēnesis',
    previousMonth: 'Iepriekšējais Mēnesis',
    openMonthSelector: 'Atvērt Mēnešu izvēlni',
    openYearSelector: 'Atvērt Gadu izvēlni',
    closeMonthSelector: 'Aizvērt Mēnešu izvēlni',
    closeYearSelector: 'Aizvērt Gadu izvēlni',
    defaultPlaceholder: 'Izvēlēties...',

    from: 'no',
    to: 'līdz',

    digitSeparator: ',',

    yearLetterSkip: 0,

    isRtl: false,
  };
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: today,
    to: today,
  });

  const [checkedIds, setCheckedIds] = useState(new Set(['Visas tēmas']));

  const handleCheck = ({ id, checked }: { id: string; checked: boolean }) => {
    if (checked) {
      if (id === 'Visas tēmas') {
        checkedIds.clear();
      } else {
        checkedIds.delete('Visas tēmas');
      }
      checkedIds.add(id);
    } else {
      checkedIds.delete(id);
    }
    setCheckedIds(new Set(checkedIds));
    dispatch(setCurrentPage(1));
    dispatch(
      getFilteredSearchedEvents(events, checkedIds, previousSearchValue)
    );
  };

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    dispatch(getFilteredSearchedEvents(events));
    setPreviousSearchValue('');
  }, [events]);

  useEffect(() => {
    dispatch(getPaginatedEvents(filteredSearchedEvents, currentPage, perPage));
  }, [filteredSearchedEvents, currentPage, perPage]);

  const searchHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getFilteredSearchedEvents(events, checkedIds, searchValue));
    setPreviousSearchValue(searchValue);
    setSearchValue('');
  };

  if (isFetchError) {
    return <Redirect to='/error' />;
  }

  return (
    <div className='wrapper'>
      <div className='events'>
        {!isFetching ? (
          paginatedEvents.map((event, index: number) => (
            <Event event={event} key={index} />
          ))
        ) : (
          <div className='fetching'></div>
        )}
      </div>

      <div className='filters'>
        <div className='search'>
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === 'Enter' && searchHandler();
            }}
            type='text'
            placeholder='Meklēt notikumu'
            className='search-input'
          />
          <button
            onClick={() => {
              searchHandler();
            }}
            className='search-btn'
          >
            Search
          </button>
        </div>

        <div className='checkboxes'>
          <input
            type='checkbox'
            id='Visas tēmas'
            name='Visas tēmas'
            checked={checkedIds.has('Visas tēmas')}
            onChange={(e) => handleCheck(e.target)}
          />
          <label htmlFor='Visas tēmas'>Visas tēmas</label>
          {eventTypes.map((eventType: string, id: number) => (
            <Checkbox
              eventType={eventType}
              key={id}
              checkedIds={checkedIds}
              handleCheck={handleCheck}
            />
          ))}
        </div>

        <DatePicker
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          inputPlaceholder='Atlasīt laika periodu'
          locale={myCustomLocale}
          shouldHighlightWeekends
        />
      </div>

      <div className='pages'>
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? 'current-page' : 'page'}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Main;
