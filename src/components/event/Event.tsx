import { NavLink } from 'react-router-dom';
import { EventInterface } from '../../types/types';
import { capitalizeFirstLetter, defaultImageUrl } from '../../utils/helpers';
import './Event.scss';

const Event = ({ event }:{event:EventInterface}) => {
  return (
    <div className='event'>
      <br />
      <h4 className='event-date'> {event.date.toString()}</h4>
      <img
        src={event.lead_image ? event.lead_image : defaultImageUrl}
        alt={`event_${event.id}`}
      />
      <div className='event-type' >
        {capitalizeFirstLetter(event.type)}
      </div> 
      <NavLink to={`/card/${event.id}`}>
        <h3 className='event-title'>{capitalizeFirstLetter(event.title)}</h3>
      </NavLink>
    </div>
  );
};

export default Event;
